<template>
  <div class="content-left">
    <div class="left-list">
      <ul>
        <li :style="stylebrand" @click="classfiyNav('brand')">品牌</li>
        <li v-for="(key,val) in content" @click="classfiyNav(val,key)" :class="{styles:active == val}">{{key.cat_name}}</li>
      </ul>
    </div>
    <brand v-if="brandIsTrue" :brand="brand" v-on:brandClick = "brandData" ></brand>
    <goodlist  :list="list" :listIsTrue="listIsTrue" :catId="catId" v-on:scorllBottom="scorllData" :scorll="scorll"></goodlist>
  </div>
</template>

<script >
import { Indicator } from 'mint-ui';
import brand from './classfiy-new-contentRight-brand.vue'
import goodlist from './classfiy-new-contentRight-list.vue'
export default {
  components: {
    "brand":brand,
    "goodlist":goodlist
  },
    data: function () {
      return{
        apiUrl: 'index/catThree',
        brandUrl: 'index/brandList',
        listUrl: 'index/productList',
        headers: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
        content:'',
        brandIsTrue:true,
        listIsTrue:false,
        brand:[],
        list:[],
        stylebrand:'background:#f3f3f3;color:#ff7400;',
        active:null,
        catId:'',
        types:1,
        scorll:false
      }
    },
  created: function () {
    this.catId = this.$route.params.catId;
    
    //状态初始化。如果 this.$route.params.catId 的值为brand  品牌组件保留 请求品牌组件信息
    // 其余的请求商品列表信息。保留商品列表组件
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
        //请求 分类列表
      this.$http.get(this.apiUrl)
      .then((data) => {
       this.content = data.data.data;
       
      })
      .catch(function(err) {
       
      })
    if ( !this.catId) {
      // 如果路由存在分类的id
    
      this.brandIsTrue = true;
      this.listIsTrue = false;
    //请求 品牌信息
       this.$http.get(this.brandUrl)
        .then((data) => {
        this.brand = data.data.data;
       
        Indicator.close();
      })
      .catch(function(err) {
        
      })
    }else {
         Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
        this.brandIsTrue = false;
        this.listIsTrue = true;
        this.scorll = true;
        this.catId = this.$route.params.catId;
        this.types = 1;
        this.$http.get(this.listUrl,{params:{
          type: 1,
          catId:this.catId
        }})
          .then((data) => {
             if(data.data.error == 99){
               Indicator.close();
             return
            }else {
              Indicator.close();
              this.list = data.body.data;
              this.stylebrand = '';
              this.active = this.$route.params.active;
          }
        })
    }
  },
  methods: {
    brandData(data){
      this.brandIsTrue = false;
      this.listIsTrue = true;
      this.list = data;
    },
    classfiyNav(index,list){
      //如果等于 brand 请求品牌接口 通过props 给品牌组件数据并且隐藏商品列表组件
      //else 则反之
      
      if(index === "brand"){
         this.listIsTrue = false;
         this.scorll = false;
         Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
        this.stylebrand = 'background:#f3f3f3;color:#ff7400;';
        this.active = null;
        this.brandIsTrue = true;
        this.$http.get(this.brandUrl)
        .then((data) => {
        this.brand = data.data.data;
       Indicator.close();

      })
      .catch(function(err) {
       
      })
      }else{
         Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
        this.brandIsTrue = false;
        this.listIsTrue = true;
        this.scorll = true;
        this.catId = list.cat_id;
        this.types = 1;
        this.$http.get(this.listUrl,{params:{
          type: 1,
          catId:list.cat_id
        }})
          .then((data) => {
             if(data.data.error == 99){
               Indicator.close();
             return
            }else {
              Indicator.close();
              this.list = data.body.data;
              this.stylebrand = '';
              this.active = index;
              this.catId = list.cat_id;
          }
        })
      }
    },
    scorllData(){
         Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      this.types++;
      console.log(this.types)
      console.log(this.catId)
      this.$http.get(this.listUrl,{params:{
          type: 1,
          catId:this.catId,
          page:this.types
        }})
          .then((data) => {
             if(data.data.error == 99){
               Indicator.close();
             return
            }else {
              Indicator.close();
              this.list = this.list.concat(data.body.data);
          }
      })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.content-left{
  position: fixed;
  left: 0;
  height: calc(100% - 1.390625rem);
  width: 2.253333rem;
  top:1.44rem;
  overflow-y:scroll;
  .left-list{
    ul{
      padding-bottom: 1.390625rem;
      li{
        height: 1.48rem;
        width: 100%;
        text-align: center;
        line-height: 1.48rem;
        font-size: 0.4rem;
        color: #1c1c1c;
        border-bottom: 1px solid #ddd;        
      }
      .styles{
        background:#f3f3f3;
        color:#ff7400;
      }
    }
  }
}
</style>
