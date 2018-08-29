<template>
<div>
  <header class="mint-header __web-inspector-hide-shortcut__" data-v-382c3e06="" style="height: 1.17188rem; background: rgb(255, 255, 255);text-align: center; border-bootm:#aaabab;z-index:999; ">
 
  <span class="navSpan">
    <span class="left" @click="fen" :style="fcolor">分类</span>
    <span class="right" @click="pin" :style="pcolor">品牌</span>
    <span id="kuai" :style="switchF"></span>
  </span>
  </header>
    <v-one></v-one>
  </div>
</template>
  
<script type="text/ecmascript-6">
import ClassifyContent from './classify-content.vue';
console.log(ClassifyContent);
import { Header } from 'mint-ui';
export default {
  components: {
      'v-one':ClassifyContent
    },
    data: function () {
      return{
        gridColumns: ['customerId', 'companyName', 'contactName', 'phone'],
        gridData: {},
        apiUrl: 'index/catThree',
        headers: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
        content:'',
        switchF:'right:0',
        fcolor:'color:#aaabab;',
        pcolor:' color:#fff;'
      }
    },
    methods:{
      fen:function () {
          this.$router.push('/classify')
      },
      pin:function () {
          this.$router.push('/brand')
      }
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.mint-header{
  position: fixed;
  width: 10rem;
  margin: 0 auto;
  top: 0;
  border-bottom: 1px solid #aaabab;
}
.navSpan{
  color: #aaabab;
  display: inline-block;
  width: 4.96875rem;
  height: 0.65625rem;
  border:1px solid #8d8d8d;
  line-height: 0.65625rem;
  border-radius: 0.15625rem;
  background-color: #fff;
  position: relative;
  z-index: 1;
  margin: 0 auto;
}
.left{
  position: absolute;
  left: 0;
  z-index: 3;
  display: inline-block;
  width: 2.5rem;
}
.right{
  position: absolute;
  color: #fff;
  right: 0;
  z-index: 3;
  display: inline-block;
  width: 2.5rem;
}
#kuai{
  display: inline-block;
  width: 2.5rem;
  height: 0.64rem;
  margin-top:-1px;
  background-color: #77bc1f;
  border-radius: 0.15625rem;
  position: absolute;
  z-index: 2;
}
</style>
