<template>
<div>
    <div class="scroll-item">
        <div class="con-uuu">
            <div class="index-banner">
                <banner :autoTime="autoTime" :swiperSlides="swiperSlides" :showInd="showInd"></banner>
            </div>
            <!-- 导航 -->
            <!-- nav -->
            <div class="index-nav">
                <ul>
                    <li v-for="(nav,index) in navs" @click="resetajax(nav.cat_id,index)">

                        <a>
                            <img class="icon-nav"  :src="nav.cat_home_thumb" alt="">

                        </a>
                       <span class="cat-name">{{nav.cat_name}}</span>
                    </li>
                </ul>
            </div>
            <!-- navend -->
            <div class="active-block"><img src="../../images/huodongsub.png" height="31" width="244" alt=""></div>
          

            <div class="qrbanner" @click="toinstructions">
              <img src="../../images/activebanber.png" height="240" width="640" alt="">
            </div>
            
            <div class="index-reclist">
              <div>
                <div class="mr">
                  <div class="list-left">
                     <p class="tm-text">品牌特卖</p>
                     <p class="dp-text">大牌直降</p>
                     <div class="more-coupon"></div>
                  </div>
                  <div class="list-right">
                     <img src="../../images/indexpro.png" height="41" width="41" alt="">
                  </div>
                </div>
              </div>
              <div>
                <div class="ml">
                   <div class="list-left">
                     <p class="tm-text">品牌特卖</p>
                     <p class="dp-text">大牌直降</p>
                     <div class="more-coupon"></div>
                  </div>
                  <div class="list-right">
                     <img src="../../images/indexpro.png" height="41" width="41" alt="">
                  </div>
                </div>
              </div>
              <div>
                <div class="mr">
                   <div class="list-left">
                     <p class="tm-text">品牌特卖</p>
                     <p class="dp-text">大牌直降</p>
                     <div class="more-coupon"></div>
                  </div>
                  <div class="list-right">
                     <img src="../../images/indexpro.png" height="41" width="41" alt="">
                  </div>
                </div>
              </div>
              <div>
                <div class="ml">
                   <div class="list-left">
                     <p class="tm-text">品牌特卖</p>
                     <p class="dp-text">大牌直降</p>
                     <div class="more-coupon"></div>
                  </div>
                  <div class="list-right">
                     <img src="../../images/indexpro.png" height="41" width="41" alt="">
                  </div>
                </div>
              </div>
            </div>
            <!-- 精品推荐 -->
             <div class="recommendationGoods">
              <img src="../../images/recgoods.png" height="31" width="244" alt="">
            </div>
            <div class="index-content" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="100" infinite-scroll-immediate-check='true'>
            <ul>
                <li class="list-con"  v-for="item in items">

                    <div class="li-div" @click.stop="goprodetail(item)">
                        <img  class="list-img" v-lazy="item.thumb" alt="">
                         <div class="bot-con">
                            <p class="proname" >{{item.name}}</p>
                            <p class="last-introster">{{item.desc}}</p>
                            <div class="bottom-pro">
                                <div class="prob-left">
                                    <p class="pro-price">￥{{item.price}}</p>
                                    <p class="r-sliver1"> 返还银票￥{{item.return_silver_ticket }}</p>
                                </div>
                              
                                    
                                
                            </div>
                            <img @click.stop="addcar(item)" class="addcar" src="../../images/addcar.png" alt="">
                       </div>
                    </div>
                </li>
                </ul>
                <div v-if="noparames" class="noda-c">
                    <img class="nodataimg" src="../../images/souNo.png">
                </div>
                <div class="text-center1" v-if="showNodata">已经没有数据了...</div>
            </div>
        </div>
    </div>
    <img @click.stop="gotop" v-show="showGoTop" class="gotop" src="../../images/gotop.png" height="50" width="50" alt="">
</div>

</template>

<script>
 import Banner from './Banner.vue';
 import {mapGetters, mapActions} from 'vuex';
 import { Indicator,InfiniteScrol,Toast,Lazyload } from 'mint-ui';
 export default {
    data() {
      return {
        gridData: [],
        apiUrl: 'Shop/index/banner',
        getnavUrl: 'index/catThree?isHome=1',
        prodUrl:'index/productListHome',
        addcarUrl: 'index/setCart',
        headers: {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        },
        items:'',
        navs:'',
        isActive:true,
        noparames:'',
        navlenth:'',
        goods_attr_id:'',
        showFlex:false,
        page:1,
        catid:'',
        hasdata:false,
        showNodata:false,
        haspage:true,
        autoTime:0,
        showInd:false,
        swiperSlides:[],
        showGoTop:false
      }
    },
    beforeCreate(){
     
    },
    created: function() {
     // 加载banner
    this.$http.get(this.apiUrl)
            .then((res) => {
               if(res.body.error===0){
                    this.swiperSlides = res.data.data;
                }

            })
            .catch(function(err) {
                console.log(err)
            })

     //加载导航分类
        Indicator.open({
       text: '加载中...',
       spinnerType: 'fading-circle'
      });

        this.$http.get(this.getnavUrl)
            .then((res) => {
              if(res.data.error==0){
                this.navs = res.data.data;
             }else if (res.data.error==99) {
             this.noparames=true;

           }

            })
            .catch(function(err) {
                console.log(err)
            })



    let data = {
           params: {
           page:this.page
      }
    }
      //加载默认分类商品

        this.$http.get(this.prodUrl,data)
            .then((res) => {
              this.items = res.data.data;
              Indicator.close();
            })
            .catch(function(err) {
                console.log(err)
            })
    },
  components: {
    Banner
},
mounted(){
 
  this.$el.querySelector('.scroll-item').addEventListener('scroll',()=>{
     var scrollItem1 =  this.$el.querySelector('.scroll-item').scrollTop;
     
      if (scrollItem1>100) {
         this.showGoTop = true;
       }else {
         this.showGoTop = false;
       }
  },false)

},
methods:{
      ...mapActions([
      'addcar'
      ]),
      loadMore() {
        if (this.haspage ==true) {
          this.loadingMoregood();
        }
        this.loading = true;
      },
      toinstructions(){
           this.$router.push('/instructions')
      },
      // 加载更多商品，重新请求ajax

      loadingMoregood(){

          this.page++;

          var data;

          data = {params:{catId:this.catid,page:this.page}}


            this.$http.get(this.prodUrl,data)
            .then((res) => {
         
              if (res.body.error||!res.body.data) {
                    this.showNodata =true;

                    this.haspage =false;
                     return;
              }else{

                 this.items = this.items.concat(res.body.data) ;
              }

                if(!this.items){
                    this.noparames= true;

                }else {
                  this.noparames= false;
                }


            })
            .catch(function(err) {
                console.log(err)
            })
      },

        // 到详情页
          goprodetail(item){
            this.$router.push({name: 'prodetail', params: { prodetailId:item.id,goodsAttrId:item.goods_attr_id}})
          },
         //根据分类获取产品列表
          resetajax:function (id,index) {
            this.$router.push({name:'classify',params:{catId:id,active:index}})
         },
         gotop(){
            
            var scrollItem =  this.$el.querySelector('.scroll-item').scrollTop;
             var sintval;

            if (scrollItem >0) {
               sintval =  setInterval(()=>{
               scrollItem =  this.$el.querySelector('.scroll-item').scrollTop;
               this.$el.querySelector('.scroll-item').scrollTop = this.$el.querySelector('.scroll-item').scrollTop-100;
               if(scrollItem == 0){
                   clearInterval(sintval)
               }
              },13)
            }
          }
      }
  }
</script>

<style lang="scss" rel="stylesheet/scss" >
// 活动版块
.active-block,.recommendationGoods{
  text-align: center;
  padding:13px 0 8px;
 img{
  display: inline-block;
  width: 3.8125rem;
  height: 0.484375rem;
 }
}
.index-reclist{
  width: 10rem;
  overflow: hidden;
  clear: both;

  >div{
    width:50%;
    height: 2.8125rem;
    float: left;
    margin-top: 2px;
  }
  .mr,.ml{
    width: 100%;
    height: 100%;
    background-color: #fff;
    overflow: hidden;
  }
  .mr{
    position: relative;
     right: 1px;
  }
  .ml{
     margin-left: 1px;
  }
  .list-left{
    float: left;
    margin-left: 0.375rem;
  }
  .list-right{
    height: 100%;
    position: relative;
    img{
      width: 1.765625rem;
      height:auto;
      margin-left: 0.625rem;
      position: absolute;
      top:50%; 
      transform:translate(0,-50%);
    }
  }
  .tm-text{
    margin-top: 0.46875rem;
    font-size: 0.426667rem;
  }
  .dp-text{
    margin-top: 0.1875rem;
    font-size: 0.346667rem;
  }
}
.more-coupon{
  margin-top: 0.234375rem;
   width: 1.59375rem;
  height:0.359375rem;

  background-image: url("../../images/morecoupon.png");
  background-size: 100% 100%;
}
.qrbanner{
  width: 10rem;
 
  img{
    display: block;
    max-width:100%;
    height: auto;
  }
}
.gotop{
  position: absolute;
  bottom: 2rem;
  width:1.03125rem;
  height: 1.03125rem;
  right: 0.40625rem;
  z-index: 2;
}
.mint-swipe-indicator.is-active{
  background-color: #77bc1f!important;
  opacity: 1.0;
 }
.index-banner{
  width: 10rem;
  height: 5rem;
  margin-top: 0.8rem;
  img{
    width: 100%;
    height: 100%;
  }
}
.text-center1{
  margin-top: 0.375rem;
  text-align: center;
  font-size: 0.375rem;
  color: #999;

}
.noda-c{
  width: 100%;
  text-align: center;
}


.addcar{
   position: absolute;
  bottom:42px;
  right:  0.46875rem;
  width: 0.5625rem;
  height: 0.609375rem;
 

}


.indexbaner1{
  width:100%;

  img{
    width: 10.0rem;
    height: auto;
    display: block;
  }
}
.proname{

  margin-top: 0.3125rem;
  color: #000;
  height: 33px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
    color: #232326;
    margin-top: 5px;
    line-height: 17px;
  
  
}
.pro-price{
  margin-top: 0.3125rem;
  color: #646464;
  font-size:0.40625rem;
  color: #ff2b01;

}
.r-sliver1{
  margin-top: 0.1875rem;
  color:#888;
  font-size:0.28125rem;
  padding-bottom: 18px

}
.box{
  padding-bottom:2.3rem
}

.text-center{
  text-align: center;
  margin-top:1rem;
  color: #999
}
.scroll-item{

  position: absolute;
 padding-top:1.859375rem;
  height: 100%;

   bottom: 1.390625rem;
  -webkit-overflow-scrolling:touch;
  overflow-y: scroll;
  overflow-x: hidden;
}
.navlist{
  display: flex;
  li{
    flex:1;
  }
}
.all-goods{
  line-height:1.09375rem;;
}
    .index-content{

        height: 100%;
        width: 100%;
        margin-bottom: 10px;
        ul{
          overflow-x: hidden;
        }

  }
   .list-con{
    list-style: none;
    float: left;
    width: 50%;
    box-sizing: border-box;
    padding-bottom: 4px;
    position: relative;
    background-color: #f3f3f3;

   
  &:nth-child(2n+1) {
    padding-right: 2px;
}
&:nth-child(2n) {
    padding-left: 2px;
}
.li-div{

    background-color: white;
    padding-bottom: 6px;
    font-size: 0;
}
    .list-img{
      display:block;
       width: 100%;
       height: 4.5625rem;
    }
   }
.bot-con{
  margin-left: 0.375rem;
}
 
.last-introster{
  margin-top: 0.1875rem;
    height: 33px;
    font-size: 13px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: break-word;
    color: #666;
    margin-top: 5px;
    line-height: 17px;
}
  .index-content div {
    img{

     &.nodataimg{
           max-width: 100%;
           height: auto
    }
    }


  }
   .index-nav{
    padding: 0.64rem 0;
     width: 10rem;
     
      background-color: #fff;

    ul{
      margin-top: -0.5333333333333333;
        list-style: none;
        padding: 0;
        margin: 0;

        overflow: hidden;

    li{
         float: left;
          margin-top: 0.5333333333333333;
         width:2.5rem;
         height: 2.5rem;

          font-size: 0.296875rem;
        text-align: center;

        box-sizing:border-box;
      a{


          display: block;
          width:100%;
         
          text-align:  center;
          color: #fff;
          text-decoration: none;
          font-size: 0.25rem;
        }
        .icon-nav{
          width: 1.2533333333333334rem;
          height: 1.2533333333333334rem;
        }
        .cat-name{
          display: inline-block;
          margin-top: 0.234375rem;
          font-size: 0.375rem;
        }
        img{
          display: inline-block;
         

          &.Recommend{
            width: 2.1875rem;
            height: 1.09375rem;
            margin-top:(1.09375rem-1.09375rem)/2 ;
          }
        }
    }
   

    }
}

</style>
