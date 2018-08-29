<template>
<div class="wrap-page">
 <toptitle msg="售后详情"></toptitle>
 <div v-if="agree==0" class="text-center">
  订单未审核
</div>
 <div v-else-if="agree==2" class="text-center">
   审核未通过
</div>
 <div v-else>
<div class="info-one bt"><span class="left">申请服务</span><span class="right">{{servicetext}}</span></div>
<div class="info-one"><span class="left">退货原因</span><span class="right">{{reason}}</span></div>

<div class="content">
  <div class="info-one x  bt"><span class="severci-left">退款金额</span><span class="right blue">￥{{Number(cash)+Number(silver_ticket)+Number(cash_coupons)}}</span></div>
  <div class="bt-x">
    <div class="info-small"><span class="money">现金</span><span class="right blue moneyright">￥{{cash}}</span></div>
    <div class="info-small"><span class="money">银票</span><span class="right blue moneyright">￥{{silver_ticket}}</span></div>
    <div class="info-small"><span class="money">现金券</span><span class="right blue moneyright">￥{{cash_coupons}}</span></div>
  </div>
</div>
   <div>
     <p class="p-text">已上传凭证</p>
     <div class="imgbox">
       <img v-for="phsimg in pic" :src="phsimg">
       
     </div>
   </div>
  <div>
     <p class="p-text">{{comment}}</p>
     <p class="textbox">
        
     </p>
   </div>
   </div>
</div>
</template>

<script >
 import Toptitle from './../Toptitle.vue';
 export default {
  data () {
    return {
      afterGoodsInfoUrl:'index/afterGoodsInfo',
      servicetext:'',
      reason:'',
      cash:'',
      silver_ticket:'',
      cash_coupons:'',
      agree:'',
      comment:'',
       pic:[],
       headers: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }

  },
  components: {
      Toptitle
  },

  created() {

      this.$http.get(this.afterGoodsInfoUrl, {params:{
        orderSn: this.$route.params.orderSn,
        goodsId:this.$route.params.goodsId,
        goodsAttrId:this.$route.params.goodsAttrId

      }})
      .then((res) => {
     
         if (res.body.error == 0) {
            let resulst = res.body.data;
            switch(resulst.type){
                case '1':
                this.servicetext='退货退款'
                break;
                case '2':
                this.servicetext='退款'
                break;
                case '3':
                this.servicetext='换货'
                break;

            }
            this.agree =resulst.agree;
            this.reason = resulst.reason;
            this.cash = resulst.cash;
            this.silver_ticket = resulst.silver_ticket;
            this.cash_coupons = resulst.cash_coupons;
            this.pic = resulst.pic;
            this.comment=resulst.comment;
         }
      })
      .catch(function(err) {
        console.log(err)
      })
    
  },
  methods: {}
 }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.text-center{
  text-align: center;
  margin-top: 0.625rem;
  font-size: 0.40625rem;
}
header,.content{
  background: #fff;
}
.content{
  width: 9.375rem;
  margin: 0 auto
}
.wrap-page{
  background: #efeff0
}
.bt{
  border-bottom:1px  solid #aaabab;
}
.info-one{
    padding: 0.46875rem 0;
    width: 9.375rem;
    margin: 0 auto;
    span{
      display: inline-block;
      text-align: center;
    }
  .severci-left{
    text-align: center;
    width: 2.34375rem;
    color: #9fa0a0;
    font-size: 0.375rem
  }
  .right{
    text-align: center;
    width: 7.03125rem;
    text-align: center;
    font-size: 0.3125rem;
    color: #000;
    &.blue{
      width: 6.40625rem;
      color: #347f97
    }

  }
}
.info-small{
  height: 0.625rem;
  line-height: 0.625rem;
  width: 8.75rem;
  margin: 0 auto;
  font-size: 0.3125rem;
}
.money{
   display: inline-block;
  width: 1.5625rem;
  color: #9fa0a0
}
.info-one.x{
  width: 8.75rem;
  margin: 0 auto;
  span.left{
    text-align: left
  }
}
.moneyright{
  display: inline-block;
  width:7.1875rem;
  text-align: center
}
.bt-x{
  padding-top: 0.4375rem;
  padding-bottom: 0.625rem;
}
.p-text{
  margin-left: 0.625rem;
  padding-top: 0.75rem;
  color: #9fa0a0;
  font-size: 0.375rem;
  line-height: 0.75rem;
}
.imgbox{
  overflow: hidden;
  margin-top: 0.3125rem;
   margin-left: 0.625rem;
  img{
    width: 1.5625rem;
    height: 1.5625rem;
    margin-left: 0.15625rem;
  }
}
.textbox{
  padding:0.15625rem 0.625rem 0
}
</style>
