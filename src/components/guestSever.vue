<template>
<div>
   <toptitle msg='联系客服'></toptitle> 
  <p class="text-cont"><span class="icon"></span><span class="text">官人你可以通过以下方式找到我们</span></p>
  <div class="cons-x">
    <p class="bt-border">电话：020-66618800-8207（客服时间 9:00-18:00)</p>
    <p class="bt-border">反馈：我的>帮助与反馈>意见反馈</p>
  </div>
  <div>
    <span class="save-btn" @click="go_index">返回首页</span>
  </div>
</div>
</template>

<script>
 import Toptitle from './Toptitle.vue';
  export default {
    methods:{
      go_index:function () {
        this.$router.push('/')
      }
    },
    components: {
      Toptitle
  },
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
 .text-cont{
    clear: both;
    box-sizing:content-box;
    color: #77bc1f;
    font-size: 0.4375rem;
    padding: 0 0.625rem;
    height: 1.09375rem;

    border-bottom: 0.3125rem solid #efeff0;
  }
  .icon{
    float: left;
    margin-right: 0.625rem;
    display: inline-block;
    margin-top: 0.09375rem;
    width: 1.15625rem;
    height: 0.875rem;
    background-image: url("../images/contacticon.png");
    background-size: 100% 100%;
  }
  .text{
    float: left;
    display: inline-block;
     line-height: 1.09375rem;
  }
  .bt-border{
    font-size: 0.34375rem;
    border-bottom: 1px solid #d3d3d4;

  }
  .cons-x{
    margin-left: 0.5rem;
    p{
      height: 1.28125rem;
      line-height: 1.28125rem;
      text-indent: 0.40625rem;
    }
  }
 .save-btn {
    position: absolute;
    bottom: 1.40625rem;
    height: 0.78125rem;
    width: 3.90625rem;
    line-height: 0.78125rem;
    color: #fff;
    margin: 0 auto;
    left: 50%;
    margin-left: -1.96875rem;
    text-align: center;

    border-radius: 0.078125rem;
     background:#77bc1f
     }
</style>
