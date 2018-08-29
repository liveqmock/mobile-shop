<template>
  <header class="classfiy-new-header">
      <input class="header-input" type="search" name=""  placeholder="搜索商品" v-on:focus="goSearch">
      <img src="../../images/gray-search.png" class="searchLogo">
  </header>
</template>

<script type="text/ecmascript-6">
import ClassifyContent from './classify-content.vue';

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
        switchF:'left:0',
        fcolor:'color:#fff;',
        pcolor:' color:#aaabab;'
      }
    },
    methods:{
      goSearch:function () {
          console.log('123')
          this.$router.push('/SearchGoods')
      }
    }
}

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.classfiy-new-header{
  position:flex;
  top:0;
  height: 1.44rem;
  width: 100%;
  background-color: #FFF;
  border-bottom:1px solid #d7d7d7;
  .header-input{
    height: 0.773333rem;
    width: 9.36rem;
    background-color: #e6e6e6;
    border: none;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    outline: none;
    border-radius:0.4rem;
    padding-left: 0.266667rem;
    padding-right:0.266667rem;
    font-size: 0.373333rem;
    text-align: center;
  }
  .searchLogo{
    height: 0.48rem;
    width: 0.48rem;
    position: absolute;
    left: 3.44rem;
    top:0.466667rem;
  }
}
</style>
