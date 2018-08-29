<template>
<div>
<div class="search-header"> 
    <input type="text" name="" class="search-input" @keyup.enter="seekFn(InputVal)" placeholder="请输入您要查询的商品" v-model="InputVal">
    <img class="searchLogo" src="../../images/gray-search.png">
    <span class="quxiao" @click="go_on()">取消</span>
</div>
  <div class="RMcity" v-if="isTrue">
     <p class="RMcity-p">热门搜索</p>
     <ul>
       <li @click="getText(city)" v-for="city in RMcity" >{{city}}</li>
     </ul>
  </div>
  <div class="search-li" v-if="searchlishi">
    <p>历史搜索</p>
    <ul>
      <li v-for="(key,val) in serchKey" @click.stop="getText(key)">
        <span>{{key}}</span>
        <img src="../../images/search_close.png" @click.stop="deleteLishi(val)">
      </li>
    </ul>
    <p class="clear" @click="clear()">清空历史搜索</p>
  </div>
  <div class="search-goods" v-if="ListIsTrue">
    <div @click="navChcked(1)">
      <span :class="textcolor1">推荐</span>
      <div class="triangle_border_down" :class="bordercolor1">
        <span></span>
      </div>
    </div>
    <div @click="navChcked(2)">
      <span :class="textcolor2">热销</span>
      <div class="triangle_border_down" :class="bordercolor2">
        <span></span>
      </div>
    </div>
    <div @click="peicepaixu()">
      <span :class="textcolor3">价格</span>
      <div class="triangle_border_down" :class="bordercolor3">
        <span></span>
      </div>
      <div class="triangle_border_up" :class="bordercolor4">
        <span></span>
      </div>
    </div>
  </div>
  <div class="listContent" v-if="ListIsTrue" >
    <ul v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10" class="scrolled">
      <li v-for="img in list">
        <img :src="img.thumb" alt="" @click = 'go_content(img)'>
        <p class="nametile" @click = 'go_content(img)'>{{img.name}}</p>
        <div class="list-pric">
           <span class="left">￥{{img.price}}</span><br>
            <p class="r-sliver"><span class="bgn" ><img src="../../images/rfan.png" alt=""></span>{{img.return_silver_ticket}}<span>银票</span>

              <span class="right" @click='addcar(img)'>
          <img src="../../images/gouwuLogo.png" alt="">
        </span>
            </p>
        </div>
        
      </li>
    </ul>
    
  </div>
  <div class="no" v-if="meiyou">
     <img  src="../../images/souNo.png" alt="">
    </div>
</div>
</template>

<script type="text/ecmascript-6">
import { MessageBox } from 'mint-ui';
import { Loadmore } from 'mint-ui';
export default {
  data(){
    return{
     InputVal:'',
     apiUrl: 'index/productList',
     rmURl:'index/popularSearches',
     headers: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
     isTrue:true,
     ListIsTrue:false,
     meiyou:false,
     searchlishi:false,
     serchKey:'',
     RMcity:'',
     priceCX:false,
     num:1,
     textcolor1:'',
     textcolor2:'',
     textcolor3:'',
     bordercolor1:"",
     bordercolor2:"",
     bordercolor3:"",
     bordercolor4:""
    }
  },
  created(){
    this.HistorySearch();
   this.$http.get(this.rmURl)
          .then((data) => {
              console.log(data)
            this.RMcity = data.body.data
          })
          .catch(function(err) {
      })
  },
  methods:{
    seekFn(a){
     if (a == '') {
      console.log(213)
      MessageBox('提示', '请您输入搜索内容');
     }else{
        this.getListData(a);
        this.AddHistorySearch(a);
      }
    },
    getListData(a){
      this.$http.get(this.apiUrl,{params:{
          keyword: a
        }})
          .then((data) => {
              console.log(data)
             if(data.data.error == 99){
              this.isTrue = false
              this.ListIsTrue = false
              this.meiyou = true
              this.searchlishi = false
              console.log("没有")
            }else {
               this.ListIsTrue = false
              this.isTrue = false
              this.ListIsTrue = true
              this.meiyou = false
              this.searchlishi = false
              this.list = data.body.data;
            }
          })
          .catch(function(err) {
      })
    },
    //点击搜索事件
    getText(a){
        this.InputVal = a;
        this.getListData(a);
    },
    //查询本地存储
    HistorySearch(){
      var a =localStorage.getItem("serchKey");
      if(a == null){
        var arr = [];
        localStorage.setItem("serchKey",JSON.stringify(arr));
        this.searchlishi = false
      }else{
        this.searchlishi = true
        this.serchKey = JSON.parse(a);
        if(this.serchKey.length == 0){
           this.searchlishi = false
        }
      };
    },
    //添加搜索记录
    AddHistorySearch(b){
      var addren = localStorage.getItem("serchKey");
     
      addren =  JSON.parse(addren);
      
      addren.push(b);
      console.log(addren)
      // arr.push(b)
      // addren = addren.concat(arr)
      // console.log(addren)
      localStorage.setItem("serchKey",JSON.stringify(addren));
    },
    //删除记录
    deleteLishi(a){
     
      this.serchKey.splice(a, 1);
      localStorage.setItem("serchKey",JSON.stringify(this.serchKey));
      this.HistorySearch();
    },
    // 清除本地存储
    clear(){
      localStorage.clear();
      this.HistorySearch();
    },
    // 原路返回
    go_on(){
      this.$router.go(-1)
    },
    //无限下拉
    loadMore(){
      this.num++;
      this.dropdown(this.num)
    },
    //这个是推荐和热销逻辑
    navChcked(a){
      this.num = 1;
      this.$el.querySelector('.listContent').scrollTop=0;
      console.log(this)
     if (a == 1){
        //推荐
        this.textcolor1 = "colorText"
        this.textcolor2 = ""
        this.textcolor3 = ""
        this.bordercolor1 = "borderText"
        this.bordercolor2 = ""
        this.bordercolor3 = ""
        this.bordercolor4 = ""
        this.$http.get(this.apiUrl,{params:{
          keyword: this.InputVal,
          type:'4'
        }})
          .then((data) => {
              console.log(data)
             if(data.data.error == 99){
              this.isTrue = false
              this.ListIsTrue = false
              this.meiyou = true
              this.searchlishi = false
              console.log("没有")
            }else {
              this.ListIsTrue = false
              this.isTrue = false
              this.ListIsTrue = true
              this.meiyou = false
              this.searchlishi = false
              this.list = data.body.data;
            }
          })
          .catch(function(err) {
      })
      }else if(a == 2){
        // 热销
        this.textcolor1 = ""
        this.textcolor2 = "colorText"
        this.textcolor3 = ""
        this.bordercolor1 = ""
        this.bordercolor2 = "borderText"
        this.bordercolor3 = ""
        this.bordercolor4 = ""
        this.$http.get(this.apiUrl,{params:{
          keyword: this.InputVal,
          type:'2'
        }})
          .then((data) => {
              console.log(data)
             if(data.data.error == 99){
              this.isTrue = false
              this.ListIsTrue = false
              this.meiyou = true
              this.searchlishi = false
              console.log("没有")
            }else {
              this.ListIsTrue = false
              this.isTrue = false
              this.ListIsTrue = true
              this.meiyou = false
              this.searchlishi = false
              this.list = data.body.data;
            }
          })
          .catch(function(err) {
      })
      }
    },
    peicepaixu(){
      this.num = 1;
       this.$el.querySelector('.listContent').scrollTop=0;
      this.priceCX = !this.priceCX;
       this.textcolor1 = ""
        this.textcolor2 = ""
        this.textcolor3 = "colorText"
      if(this.priceCX){
        console.log('从大到小')
        this.bordercolor1 = ""
        this.bordercolor2 = ""
        this.bordercolor3 = "borderText"
        this.bordercolor4 = ""
        this.$http.get(this.apiUrl,{params:{
          keyword: this.InputVal,
          type:'5'
        }})
          .then((data) => {
              console.log(data)
             if(data.data.error == 99){
              this.isTrue = false
              this.ListIsTrue = false
              this.meiyou = true
              this.searchlishi = false
              console.log("没有")
            }else {
              this.ListIsTrue = false
              this.isTrue = false
              this.ListIsTrue = true
              this.meiyou = false
              this.searchlishi = false
              this.list =data.body.data;
            }
          })
          .catch(function(err) {
      })
      }else{
        console.log('从小到大')
        this.bordercolor1 = ""
        this.bordercolor2 = ""
        this.bordercolor3 = ""
        this.bordercolor4 = "borderText2"
        this.$http.get(this.apiUrl,{params:{
          keyword: this.InputVal,
          type:'6'
        }})
          .then((data) => {
              console.log(data)
             if(data.data.error == 99){
              this.isTrue = false
              this.ListIsTrue = false
              this.meiyou = true
              this.searchlishi = false
            }else {
              this.ListIsTrue = false
              this.isTrue = false
              this.ListIsTrue = true
              this.meiyou = false
              this.searchlishi = false
              this.list = data.body.data;
            }
          })  
          .catch(function(err) {
      })
      }
    },
    dropdown(a){
      console.log(a)
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.colorText{
  color:#ff7300;
}
.borderText{
  border-color:#ff7300 transparent transparent !important;
}
.borderText2{
  border-color: transparent transparent #ff7300!important;
}
.search-header{
  height: 1.426667rem;
  width: 100%;
  
  background-color: #FFF;
  padding-left:0.266667rem;
  line-height: 1.333333rem;
  .search-input{
    height: 0.746667rem;
    width: 8.4rem;
    background-color:#e6e6e6;
    border-radius: 0.4rem;
    border:none;
    outline: none;
    padding-left:0.933333rem;
    font-size: 0.373333rem;
  }
  .searchLogo{
    position: absolute;
    top: 0.43rem;
    left: 0.533333rem;
    width: 0.48rem;
    height: 0.48rem;
  }
  .quxiao{
    font-size: 0.373333rem;
    margin-left: 0.2rem;
    color: #868686;
  }
}
.city{
  height: 1.173333rem;
  width: 100%;
  background-color: #FFF;
  line-height: 1.173333rem;
  .city-span{
    margin-left: 0.266667rem;
    font-size: 0.373333rem;
  }
}
.DWcity{
  height: 2.533333rem;
  width: 100%;
  background-color: #f3f3f3;
  padding-top:0.4rem;
  .DWcity-p{
    font-size: 0.373333rem;
    color:#666666;
    padding-left:0.266667rem;
    
  }
  .DWcity-span{
    display: block;
    height: 1.066667rem;
    width: 2.8rem;
    background-color: #FFF;
    text-align: center;
    line-height: 1.066667rem;
    font-size: 0.373333rem;
    color: #666;
    border-radius:0.4rem;
    border:1px solid #f4f4f4;
    margin-left: 0.4rem;
  }
  
}
.RMcity{
  width: 100%;
  background-color: #fff;
  padding-top:0.4rem;
  overflow: hidden;
  padding-bottom:0.4rem;
  .RMcity-p{
    font-size: 0.373333rem;
    color:#000;
    padding-left:0.266667rem;
  }
  ul{
    list-style: none;
    margin:0;
    padding:0;
    li{
    height: 1.066667rem;
    width: 2.8rem;
    background-color: #e9e9e9;
    text-align: center;
    line-height: 1.066667rem;
    font-size: 0.373333rem;
    color: #666;
    border-radius:0.4rem;
    border:1px solid #f4f4f4;
    margin-left: 0.4rem;
    margin-top: 0.4rem;
    float: left;
    }
  }
}
.cityList{
  list-style: none;
  margin:0;
  padding:0;
  ul{
    list-style: none;
    margin:0;
    padding:0;
  }
  p{
    font-size: 0.373333rem;
    color: #666;
    padding-left:0.266667rem;
    height: 0.6rem;
    line-height: 0.6rem;
    background-color: #f3f3f3;
  }
  li{
    height: 1.186667rem;
    line-height: 1.186667rem;
    padding-left:0.266667rem;
    border-bottom:1px solid #d7d7d7;
    background-color: #FFF;
  }
}
.search-li{
  p{
    height:1.133333rem;
    line-height: 1.133333rem;
    padding-left:0.266667rem;
    font-size: 0.373333rem;
    background-color: #FFF;
  }
  ul{
    list-style: none;
    padding:0;
    margin:0;
    background-color: #FFF;
    li{
      height: 1.186667rem;
      line-height: 1.186667rem;
      background-color: #FFF;
      padding-left: 0.666667rem;
      font-size: 0.373333rem;
      color: #666;
      border-top:1px solid #e7e7e7;
      span{
        display: inline-block;
        width: 7rem;
        font-size: 0.4rem;
        text-overflow:ellipsis;
        white-space:nowrap; 
        overflow:hidden;
      }
      img{
        width: 0.48rem;
        height: 0.48rem;
        float: right;
        margin-right: 0.4rem;
        margin-top: 0.333333rem;
      }
    }
  }
  .clear{
    height: 1.2rem;
    text-align: center;
    line-height: 1.2rem;
    background-color: #FFF;
    font-size: 0.426667rem;
    color: #888;
    border-top:1px solid #e7e7e7;
  }
}
.search-goods{
  height: 1.066667rem;
  background-color: #FFF;
  line-height: 1.066667rem;
  display: flex;
  div{
    flex: 1;
    text-align: center;
    position: relative;
    span{
      font-size: 0.373333rem;
    }
    .triangle_border_down{
    display: inline-block;
    width:0;
    height:0;
    border-width:0.153333rem 0.113333rem 0;
    border-style:solid;
    border-color:#999 transparent transparent;/*灰 透明 透明 */
    position:absolute;
    top: 0.553333rem;
    left: 2.2rem;
    }
    .triangle_border_up{
    width:0;
    height:0;
    border-width:0 0.113333rem 0.153333rem;
    border-style:solid;
    border-color:transparent transparent #999;/*透明 透明  灰*/
    position:absolute;
    top: 0.353333rem;
    left: 2.2rem;
    }
  }
}
.listContent{
  width: 10rem;
  background-color: #efefef;
  position: absolute;
  top: 2.666667rem;
  height:calc(100% - 2.666667rem);
  overflow-y: scroll;
   -webkit-overflow-scrolling:touch;
   padding-left:0.266667rem;
  ul{
    list-style: none;
    margin: 0;
    padding:0;
    overflow: hidden;
    padding-top:0.3125rem;
     -webkit-overflow-scrolling:touch;
     padding-bottom:0.266667rem;
    li{
   
      width: 4.6875rem;
      display: inline-block;
      padding-bottom: 0.28125rem;
      background-color:#fff;
      margin-top: 0.15625rem;
      border:1px solid #aaabab;
      img{

        width:100%;
        height:4.6875rem;
      }
      .nametile{
        font-size: 0.375rem;
        padding: 0.46875rem 0.234375rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      .left{
        font-size: 0.4rem;
        padding-left:0.234375rem;
        color: #ff7300;
      }
      .right{
        display: block;
        float: right;
        width: 1.25rem;
        margin-right: 0.234375rem;
        text-align: right;
        img{
          height: 0.48rem;
          width: 0.48rem;
        }
      }
      .bgn{
        margin-left: 0.266667rem;
        img{
          height: 0.373333rem;
          width: 0.373333rem;
          position: relative;
          top: 0.073333rem;
        }
      }
    }
    li:nth-child(even){
      margin-left: 0.15625rem;
    }
  }
}
.no{
   width: 10rem;
  background-color: #efefef;
  position: absolute;
  top: 2.666667rem;
  height:calc(100% - 2.666667rem);
  overflow-y: scroll;
   -webkit-overflow-scrolling:touch;
  img{
    display: inline-block;
    width: 100%;
    height: auto;
  }
}
.mint-msgbox-confirm {
    color: #ff7300 !important;
    width: 50% !important;
    font-size: 0.4rem!important;
}
.margin-30{
    margin-top: 0.4rem;
  }
</style>
