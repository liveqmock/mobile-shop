<template>
  <div>
  <header class="commodity-header">
    <input class="inputs" type="text" placeholder="搜索"  v-on:focus="ju" v-on:blur="shi" v-model ='InputVal' @keyup.enter="seekFn(InputVal)">
    <img class="logo" src="../../images/sousuoLogo.png" alt=""  v-if="imgIstrue">
    <span class="btn" @click="go">  <i class="mintui mintui-back" style="color:#909090"></i></span>
  </header>
  <goodsList :InputValS="InputValS"></goodsList>
  </div>
</template>

<script type="text/ecmascript-6">
import goodsList from './commodity-list.vue'
  export default {
    created  () {
   
    },
    data: function () {
      return {
        gridColumns: ['customerId', 'companyName', 'contactName', 'phone'],
        gridData: {},
        keyword:'',
        apiUrl: 'index/productList',
        headers: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
        isTrue:true,
        imgIstrue:true,
        InputValS:'',
        InputVal:''
      }
    },
    methods:{
      ju:function(){
        this.imgIstrue = false
      },
      shi:function(){
        if (this.InputVal == '') {
          this.imgIstrue = true
        }else {
          console.log('2')
        }
      },
      seekFn:function(a){
        this.InputValS = a;
      },
      go:function(){
         this.$router.go(-1);
      }
  },
  components:{
      goodsList
    } 
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.commodity-header{
  height: 1.171875rem;
  width: 10rem;
  position: fixed;
  margin:0 auto;
  top: 0;
  text-align: center;
  line-height: 1.171875rem;
  border-bottom:1px solid #aaabab;
  background-color: #efefef;
  z-index: 999;
  .inputs{
    width: 6.25rem;
    height: 0.703125rem;
    text-align: center;
    border:1px solid #aaabab;
    border-radius: 0.125rem;
  }
  .logo{
    position: absolute;
    left: 50%;
    top: 50%;
    width: 0.359375rem;
    height: 0.359375rem;
    margin-left: -0.71875rem;
    margin-top: -0.171885rem;
  }
  .btn{
    position: absolute;
    left:0.3125rem;
    
    text-align: center;
    img{
      width: 0.21875rem;
      height: 0.203125rem;
    }
  }
}
</style>
