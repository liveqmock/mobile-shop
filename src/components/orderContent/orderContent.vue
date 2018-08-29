<template>
<div style="padding-bottom:2.215625rem;">
   <toptitle msg='订单详情'></toptitle>
    <div class="orderContent">
      <div class="addressOrder">
        <div class="addressOrder-div">
          <span>订单号 : {{content.order_id}}</span>
          <span>{{content.status}}</span>
        </div>
        <p style="margin-top:0.703125rem;">收货人详细信息：</p>
        <p>{{adress.province}} {{adress.city}} {{adress.area}} {{adress.address}}</p>
        <p>{{adress.consignee}} {{adress.tel}}</p>
        <p>买家留言: {{content.msg}}</p>
      </div>
    </div>
    <div class="foodsContentImg" >
        <div class="title">
          <p>商品详情</p>
        </div>
        <div class="kuang">
          <div class="goods" v-for="(key,val) in content.goods">
            <div class="goods-img">
                <img :src="key.thumb" alt="">
            </div>
            <div class="goods-text">
                 <span class="span-title" v-html="key.name"></span>
                 <span class="left-bootom">单价{{key.goods_price}}元</span>
                 <span class="right-bootom">{{key.goods_sum}}个</span>
            </div>      
        </div>      
        </div>   
    </div>
    <div class="foodsContent">
        <div class="goodsContentInfo">
            <div class="InfoTitle">
                <span style="margin-left: 0.3125rem;">支付方式</span>
                <span style="margin-right: 0.6125rem;">微信支付</span>
                <div class="infoContent">
                    <ul>
                        <li><span style="float:left">商品总额</span><span>{{(content.total - content.freight).toFixed(2)}}  </span></li>
                         <li><span style="float:left">现金券</span><span>- {{content.use_cash_coupons}}</span></li>
                         <li><span style="float:left">银票</span><span>- {{content.use_silver_ticket}}</span></li>
                        <li><span style="float:left">运费</span><span>+ {{content.freight}}</span></li>
                        <li><span></span><span>实付款:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{{content.actual_payment}}</span></li>
                        <li><span></span><span style="color:#a6a7a7">下单时间:  {{content.create_time | shijian}}</span></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
    <div class="orderFooter">
      <span @click="go_index" v-if="iscibtn">{{cibtn}}</span>
      <span @click='addShopCar'>{{showStatustext}}</span>
    </div>
</div>
</template>

<script >
import { Header,MessageBox } from 'mint-ui'
 import Toptitle from './../Toptitle.vue'
  export default {
    data() {
      return{
        phone:'',
        feedbackContent  :'',
        apiUrl: 'index/orderInfo',
        headers: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
        content:'',
        adress:'',
        type:'',
        text:'',
        addcarUrl:'index/setCart',
        showStatustext:'再次购买',
        cibtn:"",
        iscibtn:true
      }
    },
     components: {
        Toptitle
    },
    created(){
      var orderId = this.$route.params.orderSn;
      this.type = this.$route.params.type;
      this.$http.post(this.apiUrl,{
        orderSn:orderId
      },this.headers)
        .then((data) => {
   
          this.content = data.body.data;
          console.log(data)
          this.adress = data.body.data.address_value
          if(this.content.is_pay == 0){
              if(this.content.delivery==0){
                this.content.status ='已发货'
                this.showStatustext = "确认收货"
                this.cibtn = "申请售后"
              }else if(this.content.delivery==1){
                this.content.status ='未发货'
                this.iscibtn = false
                this.showStatustext = "申请售后"
              }else if(this.content.delivery==2){
                this.content.status ='确认收货'
                this.showStatustext = "立即评价"
                this.cibtn = "申请售后"
              }
          }else if(this.content.is_pay == 1){
              this.content.status ='未支付';
              this.showStatustext= '去支付';
              this.cibtn = "取消订单"
          } 
           if(this.type==4) {
             this.showStatustext = "再次购买"
          }
          if(this.type==5 ) {
             this.showStatustext= '返回首页';
          }
       
        })
        .catch(function(err) {
//          console.log(err + '123123')
        })
          console.log(this.content)
    },
    methods:{
      addShopCar:function(){
        if(this.type==5 ) {
              this.$router.push('/');
              return
          }
         if(this.showStatustext == "申请售后"){
             this.$router.push({
             name: 'selectServerGood',
              query: { 
                  orderSon: this.$route.params.orderSn
                    }
           })
          return
         }
      // 取消订单
       if(this.showStatustext == "取消订单"){
          this.$http.get("index/cancelOrder",{params: {
              orderSn: this.$route.params.orderSn
            }})
              .then((res) => {
                 if (res.body.error==0) {
                    console.log(res)
                      MessageBox.alert('取消成功').then(()=>{
                        this.$router.push('/unpaidorderList')
                      })
                 }else {
                     MessageBox.alert('取消失败，请稍后再试')
                 }
              })
               return;
         }
        if (this.showStatustext == "立即评价") {
           this.$router.push({
             name: 'releasecomment',
             params: { 
                  orderSon: this.$route.params.orderSn
                    }
           })
           return
        }
        
        if (this.showStatustext == "确认收货") {
        
            MessageBox.confirm('确定执行此操作?').then(action => {
         
            this.$http.get('index/confirmReceiptOrder', {
            params: {
                 orderSn:this.$route.params.orderSn
            }
          })
          .then((res) => {
            if (res.body.error==0) {
               MessageBox.alert('提交成功').then(()=>{
                this.$router.push('/ReceiveOrderlist')
               })
               
            }else {
              MessageBox.alert('系统繁忙，请稍后再试')
            }

          })
          .catch(function(err) {
            console.log(err)
          })
       
      }).catch(() => {
        return
      })
          return
        }
      



        if (this.content.is_pay==1) {
          var orderID = this.content.order_id
           window.location.href='./poor/pay/orderSn/'+orderID;
        }
        var a =0;
          for(var i=0;i<this.content.goods.length;i++){
            this.$http.get(this.addcarUrl, {
              params: {
              goodsId: this.content.goods[i].goods_id,
              goodsNum: this.content.goods[i].goods_sum,
              goodsAttrId: this.content.goods[i].goods_attr_id
            }
          })
          .then((res) => {
              if(res.body.success == 1){
                a++
                if(a = i){
                  this.$router.push('/shopcar')
                }
              }
            })

        }
      },
      // 一个按钮的逻辑
      go_index:function(){

        if(this.cibtn == "取消订单"){
          this.$http.get("index/cancelOrder",{params: {
              orderSn: this.$route.params.orderSn
            }})
              .then((res) => {
                 if (res.body.error==0) {
                
                      MessageBox.alert('取消成功').then(()=>{
                        this.$router.push('/unpaidorderList')
                      })
                 }else {
                     MessageBox.alert('取消失败，请稍后再试')
                 }
              })
         }
         if(this.cibtn == "申请售后") {
           this.$router.push({
             name: 'selectServerGood',
              query: { 
                  orderSon: this.$route.params.orderSn
                    }
           })
          
         }
       },
      go_content:function(a){
        this.$router.push({name:'prodetail',params:{
          prodetailId:a.goods_id,
          goodsAttrId:a.goods_attr_id
         }})
      },
      go_list:function(){
          this.$router.go(-1)
      }
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .orderFooter{
    width:10rem;
    margin: 1.0125rem auto 0;
    text-align: center;
    span{
      display: inline-block;
      height: 0.703125rem;
      width: 3.90625rem;
      text-align: center;
      line-height: 0.703125rem;
      font-size: 0.40625rem;
      color: #fff;
      background-color: #ff0000;
      margin: 0 auto;
      border-radius: 0.15625rem;
    }
    span:nth-child(1){
      background-color:#fff;
      color: #77bc1f;
      border:1px solid #aaabab;
      margin-right: 0.625rem;
    }
    span:nth-child(2){
      background-color:#77bc1f;
      color: #fff;
      border:1px solid #77bc1f;
    }
  }
  .orderContent{
    padding-left: 0.3125rem;
    padding-right: 0.3125rem;
    margin-top: 1.15625rem;
    .addressOrder{
      height: 100%;
      width: 100%;
      border-top:1px solid #fff;
      padding-bottom:0.78125rem;
      .addressOrder-div{
        height: 1.234375rem;
        line-height: 1.234375rem;
        border-bottom:1px solid #c9caca;
        padding:0 0.3125rem;
        span{
          font-size: 0.375rem;
          font-weight: bold;
        }
        span:nth-child(2){
          float: right;
        }
      }
      p{
        font-size: 0.3125rem;
      }
      p:nth-child(1){
        padding-top: 0.703125rem;
      }
      p:nth-child(5){
        margin-top: 0.890625rem;
        color: #9fa0a0;
      }
    }
  }
.foodsContentImg{
      width: 10rem;
      border:1px solid #cecece;
      background-color:#efeff0;
      padding:0.3125rem;
      overflow: hidden;
      .kuang{
        padding-bottom:0.3125rem;
        background-color:#fff;
        padding-left:0.234375rem;
        padding-right:0.234375rem;
      }
      .title{
        height: 1.09375rem;
        border-bottom:1px solid #c9caca;
        background-color:#fff;
        text-align: left;
        padding-left:0.25rem;
      }
      .goods{
        width: 100%;
        border-bottom: 1px solid  #c9caca;
        background-color:#fff;
        overflow: hidden;
        padding-top:0.3125rem;
        padding-bottom:0.3125rem;
      }
      .goods-img{
        float: left;
        img{
          width: 2.03125rem;
          height: 2.03125rem;
          
          border:1px solid #c9caca;
        }
      }
      .goods-text{
        float: left;
        width: 6.8rem;
        padding-left:0.4rem;
        position: relative;
        height: 2.03125rem;
        .span-title{
            display: block;
            font-size: 0.3125rem;
            color: #666464;
            font-weight: bold;
        }
        .left-bootom{
          position: absolute;
          left: 0.4rem;
          bottom:0;
          font-size: 0.3125rem;
          color: #666464;
        }
        .right-bootom{
          position: absolute;
          right: 0.3125rem;
          bottom:0;
          font-size: 0.3125rem;
          color: #666464;
        }
      }
.mint-header{
  height: 1.15625rem;
  
}
  .headers{
    height: 0.984375rem;
    width: 100%;
    padding: 0 0.3125rem;
    span{
      display: block;
      line-height: 0.984375rem;
      height: 0.984375rem;
      width: 100%;
      text-align: center;
      font-size: 0.390625rem;
      color: #909090;
      border-bottom: 1px solid #c9caca;
    }
  }
  .content-list{
    padding-bottom: 2.1875rem;
  }
  .content-header{
    height: 0.98125rem;
      padding: 0 0.3125rem;
      position: fixed;
      width: 10rem;
      ul{
        height: 100%;
        width: 100%;
        display: flex;
        list-style: none;
        margin: 0;
        padding: 0;
        margin-top: 0.125rem;
        border-bottom: 1px solid #ff0000;
        li{
          flex:1;
          text-align: center;
          margin-top: 0.11rem;
          span{
            font-size: 0.21875rem;
            width: 90%;
            display: inline-block;
          }
          .border{
            border-bottom: 3px solid #ff0000;
          }
          img{
            display: block;
            width: 0.4375rem;
            height: 0.390625rem;
            margin: 0 auto;
          }
        }
    }
  }
  .list-lie{
    height: 2.34375rem;
    width: 100%;
    padding: 0 0.3125rem;
    .kuai{
      height: 100%;
      width: 100%;
      border:1px solid #cecece;
      overflow: hidden;
      div{
        float: left;
      }
      .kuai-img{
        width: 2.34375rem;
        height:2.34375rem;
        padding: 0.3125rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .kuai-text{
        width: 2.96875rem;
        padding: 0.3125rem;
        height: 100%;
        p{
          font-size: 0.25rem;
           color: #666464;
        }
        h1{
          font-size: 0.453125rem;
          color: #666464;
        }
      }
      .kuai-type{
        width: 2.5rem;
        height: 100%;
        padding: 0.3125rem 0;
         p{
          font-size: 0.25rem;
           color: #666464;
        }
        h1{
          font-size: 0.453125rem;
          color: #666464;
        }
      }
      .btnsumit{
        width: 1.51rem;
        height: 100%;
        p{
          display: inline-block;
          height: 1.71875rem;
          width: 0.625rem;
          background-color: #b2b2b2;
          color: #fff;
          margin-top: 0.3125rem;
          margin-left: 0.3125rem;
          padding-top: 0.390625rem;
        }
      }
    }
  }


  .orderContentHeader{
    height: 1.25rem;
    border-bottom: 1px solid #c9caca;
    line-height: 1.25rem;
    span{
      font-size: 0.34375rem;
    }
    span:nth-child(2){
      float: right;
    }
  }
  .adressInfo{
    height: 2.8125rem;
    width: 100%;
    padding-top: 0.4375rem;
    ul{
      list-style: none;
      margin: 0;
      padding:0;
      li:nth-child(1){
        span{
          font-size: 0.359375rem;
          color: black;
        }
        span:nth-child(2){
          float: right;
          color: black;
        }
      }
      li{
        font-size: 0.28125rem;
        color: #9fa0a0;
      }
      li:nth-child(2){
        margin-top: 0.26875rem;
      }
      li:nth-child(3){
        margin-top: 0.26875rem;
      }
    }
  }
  .foodsContent{
    padding: 0 0.3125rem;
    // background-color: #efeff0;
    padding-top: 0.15625rem;
    
    }
    div:nth-child(3){
      text-align: center;
      p{
        display: block;
        width: 0.78125rem;
        height: 2.015625rem;
        border:1px solid #8d8d8d;
        float: right;
        margin-top: 0.15625rem;
        text-align: center;
        padding-top: 0.546875rem;
        color: #9fa0a0;
        margin-right: 0.1rem;
      }
    }
  }
  .goodsContentInfo{
    padding: 0 0.3125rem;
    .InfoTitle{
      width: 100%;
      margin-top: 0.15625rem;
      line-height: 1.25rem;
      padding-bottom:1.15625rem;
      span{
         font-size: 0.34375rem;
      }
      span:nth-child(2){
        float: right;

      }
      .infoContent{
          padding: 0 0.703125rem;
          
         ul{
          list-style: none;
          margin: 0;
          padding: 0;
          border-top: 1px solid #c9caca;
          li{
            height: 1rem;
            overflow: hidden;
            span{
              font-size: 0.25rem;
            }
          }
          li:nth-child(1){
            span{
              font-size: 0.359375rem;
            }
          }
          li:nth-child(4){
            span{
              font-size: 0.34375rem;
              color: #a6a7a7;
            }
          }
           li:nth-child(5){
            margin-top: -0.46875rem;
            span{
              font-size: 0.375rem;
              color: #black;
            }
           }
         }
      }
    }
  }
  .affirmOrder{
    height: 3.125rem;
    width: 100%;
    text-align: center;
    padding-top: 0.625rem;
    p:nth-child(1){
      font-size: 0.359375rem;
      color: #000000;
    }
     p:nth-child(2){
      padding-top: 0.46875rem;
      font-size: 0.484375rem;
      color: #000000;
    }
  }
  .OrderPay{
    span{
      display: block;
      width: 3.90625rem;
      height: 0.703125rem;
      text-align: center;
      line-height: 0.703125rem;
      background-color: #ff0000;
      border-radius:0.078125rem;
      margin: 0 auto;
      font-size: 0.390625rem;
      color: #fff;
    }
  }
  .offthestocks{
    padding: 0.3125rem;
    width: 100%;
    background-color: #efeff0;
    clear: both;
    .list-div{
      height: 2.34375rem;
      background-color: #fff;
      .div-left{
        width: 2.34375rem;
        height: 2.34375rem;
        background-color: red;
        float: left;
        img{
          height: 0.78125rem;
          width: 2.34375rem;
          margin-top: 0.625rem;
        }
        p{
          margin-top: 0.15625rem;
          text-align: center;
          color: #666464;
        }
      }
      .div-right{
        width: 7.03125rem;
        height: 2.34375rem;
        float: left;
        background-color: yellow;
        .top{
          height: 1.40625rem;
          border-bottom: 1px dashed #dcdddd;
          .diamonds{
            display: inline-block;
            width: 1.375rem;
            height: 0.515625rem;
            line-height: 0.515625rem;
            text-align: center;
            color: #fff;
            font-size: 0.25rem;
            background-color: #95d7e5;
            border-radius: 0.078125rem;
            margin-left: 0.3125rem;
          }
          .explain{
            display: inline-block;
            font-size: 0.3125rem;
            margin-left: 0.3125rem;
          }
          p{
            display: inline-block;
            margin-left: 0.3125rem;
            margin-top: 0.15625rem;
            font-size: 0.359375rem;
            color: #666464;
          }
        }
        .bottom{
          width: 100%;
         span{
          display: block;
          height: 0.703125rem;
          width:3.4375rem;
          text-align: center;
          line-height: 0.703125rem;
          background-color: #95d7e5;
          border-radius: 0.125rem;
          margin: 0 auto;
          margin-top: 0.125rem;
         }
        }
      }
    }
  }
</style>
