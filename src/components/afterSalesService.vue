<template>
<div class="wrap-page">
  <header class="mint-header" data-v-3b4e2db0="">
    <div class="mint-header-button is-left" @click="go_next">
      <a  class="router-link-active" data-v-3b4e2db0="">
        <button class="mint-button mint-button--default mint-button--normal" data-v-3b4e2db0="">
          <span class="mint-button-icon">
            <i class="mintui mintui-back"></i>
          </span> 
          <label class="mint-button-text"></label>
        </button> 
        <!-- <button class="mint-button mint-button--default mint-button--normal" data-v-3b4e2db0="">
          <label class="mint-button-text">close</label>
        </button> -->
      </a>
    </div> 
    <h1 class="mint-header-title">服务选择</h1> 
    <div class="mint-header-button is-right"></div>
  </header>
  <div class="row">
    <div class="row-1" @click="go_Service(1)">
      <div>
         <img src="../images/fuwu-1.png" alt="">
      </div>
      <div>
        <h1>退货退款</h1>
        <p>已收到货，需要退还已收到的货物</p>
      </div>
    </div>
    <div class="row-1 margin-top-10" @click="go_Service(2)">
       <div>
         <img src="../images/fuwu-2.png" alt="">
      </div>
      <div>
        <h1>仅退款</h1>
        <p>未收到货，或与卖家协商同意前提下申请</p>
      </div>
    </div>
    <div class="row-1 margin-top-10" @click="go_Service(3)">
      <div>
         <img src="../images/wufu-3.png" alt="">
      </div>
      <div>
        <h1>换货</h1>
        <p>对已收到的货不满意，联系卖家协助换货</p>
      </div>
    </div>
  </div>
 <!--  <div class="footer">
    <span class="footer-left">返回首页</span>
    <span class="footer-right">确定</span>
  </div> -->
</div>
</template>

<script>

 export default {
  created(){
    
  },
   methods:{
    go_next:function (){
      this.$router.go(-1);
    },
    go_Service:function (item) {
      var item = item;
      this.$router.push({ name: 'service', params: { servicetype: item, orderSn:this.$route.params.orderSn,goodsId:this.$route.params.goodsId,goodsAttrId:this.$route.params.goodsAttrId}})
    }
   }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrap-page{
  padding: 0 0.3125rem;
  background-color: #efeff0;
  position: relative;
  .mint-header{
    background-color: #efeff0;
    height: 1.171875rem;
    line-height: 1.171875rem;
    border-bottom: 1px solid #c9caca;
    .mint-header-title{
      font-size: 0.4375rem;
      color: #909090;
    }
    .mint-button--normal{
       color: #909090;
    }
  }
  .row-1{
    height: 2.5rem;
    width: 100%;
    background-color:#fff;
    display: flex;
    div:nth-child(1){
      flex:1
    }
     div:nth-child(2){
      flex:6;
      line-height: normal;
      h1{
        font-size: 0.4375rem;
        color: #666464;
        margin-top: 0.78125rem;
      }
      p{
        padding-top:0.078125rem;
        font-size: 0.3125rem;
        color: #9fa0a0;
      }
    }
    img{
      width: 0.859375rem;
      height: 0.859375rem;
      margin-left: 0.3125rem;
       margin-top: 0.859375rem;
    }
  }
  .margin-top-10{
    margin-top: 0.15625rem;
  }
  .footer{
    position: absolute;
    width: 100%;
    height: 2.03125rem;
    bottom:0;
    left: 0;
    text-align: center;
    span{
      display: inline-block;
      width: 3.90625rem;
      height: 0.65625rem;
      text-align: center;
      line-height: 0.65625rem;
      font-size: 0.4375rem;
      border:1px solid #aaabab;
      border-radius:0.09375rem;
    }
    .footer-left{
      background-color:#e6fffe;
      margin-right: 0.234375rem;
      color: #347f97;
    }
    .footer-right{
      background-color:#347f97;
      margin-left: 0.234375rem;
      color: #fff;
    }
  }
}
</style>
