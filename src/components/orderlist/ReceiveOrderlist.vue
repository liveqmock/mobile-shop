<template>
    <div class="wrap-page">
  <order-header></order-header> 
  <div class="Ninfo"  v-if="Ninfo" style="background:#efeff0">
       <img src="../../images/youhuijuan2.png" ></img>
        <p>没有订单数据！</p>
    </div>
     <div  v-if="!Ninfo" class="content-list"
      v-infinite-scroll="loadMore"
      infinite-scroll-disabled="false"
      infinite-scroll-distance="100"
      infinite-scroll-immediate-check='true'
      style="padding-left:0.3125rem;padding-right:0.3125rem;background:#efeff0;overflow-y:scroll;position:absolute; top:3.25rem; height:81%;width:10rem;padding-bottom:1rem;"
      >
        <div class="xin-li" v-for="(order,index) in ReceiveOrderlist"  name='div'>
            <div class="li-one">
              <span>订单编号 : {{order.order_id}}</span>
              <span>{{order.zhuangtai}}</span>
              <span>{{order.create_time | shijian}}</span>
            </div>
            <div class="goods">
                <div class="goods-li"  v-for="goods in order.goods" @click="goContent(order,goods)">
                  <div class="li-img">
                    <img :src="goods.thumb" alt="">
                  </div>
                  <div class="li-text">
                    <h1>{{goods.name}}</h1>
                    <p>单价{{goods.price}}元<p>
                    <p id="num" >{{goods.goods_sum}}件</p>
                  </div>
                  
                </div>
                <div class="goods-button">
                  <div>
                    <span>运费：{{order.freight}}</span>
                    <span>总金额{{order.total}}元</span>
                  </div>
                  <div >
                    <span class="ci" v-if="order.delivery==0"   @click="receivegoods(order,index)" >确认收货</span>
                    <span class="ci a" v-if="order.delivery!=0"    >等待发货</span>
                   
                  </div>
                 
                </div>
            </div>
        </div>
      </div>
 
   
  
</div>
</template>

<script >
 import {MessageBox,InfiniteScrol} from 'mint-ui';
 import orderHeader from './orderheader.vue'
import {mapGetters,mapActions,mapState} from 'vuex'
export default {
  data: function() {
    return {
   
      apiUrl: 'index/orderList',
      headers: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      ReceiveOrderlist: '',
     
      page: 1,
     
      Ninfo: false,
    }
  },
  components:{
    orderHeader
  },
  created() {
 
  // 待收货订单type =2

  
    this.$http.get(this.apiUrl, {
        params: {
          type: 2,
          page: 1
        }
      })
      .then((data) => {
        this.ReceiveOrderlist = data.data.data;
    
        if (data.data.error == 99) {
        
          this.Ninfo = true
        } else {
         
          this.Ninfo = false
        }

      
      })
      .catch(function(err) {
         console.log(err )
      })
  
 
  
  },
  methods: {
    // 获取订单数量的vuex
     ...mapActions([
      'getOrderNum' 
      ]),
     // 确认收货
   receivegoods(order,index){
   
    MessageBox({
          title: '提示',
          message: '是否确认收货?',
          showCancelButton: true
        });
        MessageBox.confirm('是否确认收货?').then(action => {
           this.$http.get('index/confirmReceiptOrder', {
              params: {
                orderSn: order.order_id
              }
            }).then((res) => {
                if (res.body.error==0) {
                  this.ReceiveOrderlist.splice(index,1)
                  this.getOrderNum()
                }
           })
          .then((res) => {
            console.log(res)
          })
        })
        .catch(action=>{
           console.log(action)
        })
  },
  // 点击订单中的商品的到详情
    goContent: function(order,goods) {

     
     
      this.$router.push({
        name: 'orderContent',
        params: {
          orderSn: order.order_id,
          type: 2
        }
      })
    },
   
   
    loadMore() {
      this.loading = true;
      this.jiazai()
    },
    jiazai: function() {
      this.page++
        
    
      this.$http.get(this.apiUrl, {
          params: {
            type: 2,
            page: this.page
          }
        }).then((res) => {
           let content   =res.body.data ;
           if (content) {
            this.ReceiveOrderlist = this.ReceiveOrderlist.concat(content)
         }

        })
        .catch(function(err) {
          console.log(err)
        })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.content-list{
  -webkit-overflow-scrolling:touch;
 
}
  .shopCar-header{
    height: 1.025rem;
    padding: 0 0.3125rem 0;
    position: fixed;
    top: 0;
    width: 10rem;
    margin: 0 auto;
    background-color: #fff;
    z-index: 1;
    .header-top{
      height: 1.05rem;
      border-bottom: 1px solid #c9caca;
      line-height: 1.05rem;
      text-align: center;
      position: relative;
      span{
        font-size: 0.375rem;
        color: #909090;
      }
      img{
        position: absolute;
        width: 0.21875rem;
        height: 0.1875rem;
        left: 0;
        top: 50%;
        margin-top: -0.09375rem;
      }
    }
  }
.header-line{
  display: block;
  position:adsolute;
  bottom:0;
  left: 0;
  margin-left: 0.3125rem;
  height: 1px;
  width: 9.375rem;
  background-color:#c9caca;
}
.mint-header{
  position:fixed;
  top: 0;
  width: 100%;
  margin:0 auto;
  background-color:#fff;
  z-index: 99;
  left: 0;
  padding:0 0.3125rem;
}
.orderFooter{
  height: 2.015625rem;
  width:10rem;
  position: fixed;
  bottom: 0;
  margin: 0 auto;
  background-color: #fff !important;
  span{
    display: block;
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
}
.headers{
  height: 0.984375rem;
  width: 100%;
  padding: 0 0.3125rem;
  position: fixed;
  background-color: #fff;
  top:0;
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
.content-header{
  height: 1.96875rem;
  position: fixed;
  width: 10rem;
  background-color: #fff;
  top:1.16rem;
  padding:0 0.3125rem;
  ul{
    height: 1.96875rem;
    display: flex;
    list-style: none;
    margin: 0;
    padding: 0;
    margin-top: 0.125rem;
     border-bottom: 1px solid #77bc1f;
    li{
      flex:1;
      text-align: center;
      margin-top: 0.11rem;
      background-color:#fff;
      position:relative;
     .line{
      display: inline-block;
      height: 0.09375rem;
      width: 100%;
      background-color:#77bc1f;
      position:absolute;
      bottom:0;
      left: 0;
     }
      .navspan{
        font-size: 0.375rem;
        width: 90%;
        display: inline-block;
        margin-top: 3px;
        font-weight: 500;
      }
      img{
        display: block;
            width: 0.859375rem;
          height: 0.78125rem;
        margin: 0 auto;
        margin-top: 0.10625rem;
      }
    }
    li:nth-child(1){
      .yuanyuan{
        position:absolute;
        top: 7%;
        left: 55%;
        padding:0 4px !important;
        background-color:#ff0000 !important;
      }
    }
    li:nth-child(2){
      .yuanyuan{
        position:absolute;
        top: 7%;
        left: 62%;
        padding:0 4px !important;
        background-color:#ff0000 !important;
      }
    }
    li:nth-child(3){
      .yuanyuan{
        position:absolute;
        top: 7%;
        left: 66%;
        padding:0 4px !important;
        background-color:#ff0000 !important;
      }
    }
    li:nth-child(4){
      .yuanyuan{
        position:absolute;
        top: 7%;
        left: 70%;
        padding:0 4px !important;
        background-color:#ff0000 !important;
      }
    }
  }
}

.xin-li{
  width: 100%;
  border:1px solid #c9caca;
  margin-top: 0.3125rem;
  background-color: #fff;
  .li-one{
    height: 1.078125rem;
    border-bottom:1px solid #c9caca;
    padding-left:0.3125rem;
    padding-right: 0.3125rem;
    line-height: 1.078125rem;
    text-align: center;
    span{
      font-size: 0.32rem;
      color: #909090;
    }
    span:nth-child(1){
      float: left;
    }
    span:last-child{
      float: right;
    }
  }
  .goods{
    padding-left:0.3125rem;
    padding-right: 0.3125rem;
    padding-bottom:0.3125rem;
    .goods-button{
      div:nth-child(1){
        height: 1.3125rem;
        line-height: 1.3125rem;
        span{
          font-size:0.375rem;
          color: #666464;
        }
        span:nth-child(2){
          float: right;
        }
      }
      div:nth-child(2){
        text-align: right;
        span{
          display: inline-block;
          padding:0.078125rem 0;
          width: 2.34375rem;
          border-radius:0.15625rem;
          font-size: 0.375rem;
         
          text-align: center;
        }
        .zhu{
          box-sizing:border-box;
          border:1px solid #8d8d8d;
          color: #666464;
          background-color:#fff;
          margin-right: 0.234375rem;
        }
        .ci{
          background-color:#77bc1f;
          color: #fff;
          &.a{
            background-color: #e3e3e3;
            color: #999;
          }
        }
      }
    }
    .goods-li{
      height: 2.34375rem;
      width: 100%;
      border-bottom:1px solid #c9caca;
      padding-top:0.296875rem;
      padding-bottom:0.296875rem;
      position: relative;
      .shouhou{
        position: absolute;
        width: 2.34375rem;
        height: 0.703125rem;
        background-color:#77bc1f;
        line-height: 0.703125rem;
        text-align: center;
        color: #fff;
        font-size: 0.4375rem;
        right: 0;
        bottom:0.28125rem;
        border-radius:0.125rem;
      }
      .li-img{
        height: 1.71875rem;
        line-height: 1.71875rem;
        width: 1.71875rem;
        border:1px solid #cecece;
        float: left;
        img{
          vertical-align: middle;
          display: inline-block;
          max-width: 100%;
          height: auto;
        }
      }
      .li-text{
        float: left;
        width: 8.59375rem - 1.71875rem;
        height: 100%;
        position: relative;
        padding-left:0.296875rem;
        h1{
          font-size: 0.32rem;
          color: #666464;
        }
        p{
          font-size: 0.296875rem;
          color: #666464;
          position: absolute;
          bottom:0;
        }
        #num{
          font-size: 0.32rem;
          color: #666464;
          position: absolute;
          bottom:0;
          right: 0;
        }
      }
    }
  }

    .orderContent{
      margin-top: 0.984375rem;
      padding-top: 0.9375rem;
      padding-left: 0.3125rem;
      padding-right: 0.3125rem;
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
      height: 2.65625rem;
      padding: 0 0.3125rem;
      background-color: #efeff0;
      padding-top: 0.15625rem;
      .foodsContentImg{
        width: 100%;
        height: 2.34375rem;
        border:1px solid #cecece;
        display: flex;
        div{
          flex:1;
        }
        div:nth-child(1){
          img{
            width: 2.03125rem;
            height: 2.03125rem;
            margin-left: 0.203125rem;
            margin-top: 0.15625rem;
          }
        }
        div:nth-child(2){
          span{
            display: block;
            font-size: 0.25rem;
            color: #b5b5b6;
            margin-top: 0.25rem;
          }
          span:nth-child(1){
            font-size: 0.4375rem;
            color: black;
            margin-top: 0.20625rem;
          }
          span:nth-child(2){

          }
        }
      }
      div:nth-child(3){
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
        }
      }
    }
    .goodsContentInfo{
      padding: 0 0.3125rem;
      .InfoTitle{
        height: 1.25rem;
        width: 100%;
        margin-top: 0.15625rem;
        line-height: 1.25rem;
        span{
          font-size: 0.34375rem;
        }
        span:nth-child(2){
          float: right;
        }
        .infoContent{
          padding: 0 0.703125rem;
          height: 1.5625rem;
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
              }
            }
            li:nth-child(5){
              margin-top: -0.46875rem;
              span{
                font-size: 0.21875rem;
                color: #a6a7a7;
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
  }
.jia{
  display: block;
  height: 0.703125rem;
  width:3.4375rem;
  background-color: red;
  border-radius: 0.125rem;
  margin: 0 auto;
  line-height:  0.703125rem;
  text-align: center;
  font-size: 0.3rem;
  color: #fff;
}
.Ninfo{
  margin-top: 2.2rem;
 
 
  img{

    display: block;
    margin: 0 auto;
     margin-top: 0.625rem;
    width: 2.03125rem;
    height: 2.03125rem;
  }
  p{
    display: block;
    margin-top: 0.3125rem;
    text-align: center;
    font-size: 0.40625rem;
    color: #656565;
  }
}
</style>
