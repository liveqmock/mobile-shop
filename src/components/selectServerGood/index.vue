<template>
  <div class="top" >
   <toptitle msg='申请售后的商品列表'></toptitle>
    <div class="content">
      <div class="content-list">
        <div class="xin-li"   name='div'>
            <div class="li-one">
              <span>订单编号 : {{order_id}}</span>
              <span>状态</span>
              <span>时间:{{create_time|shijian}}</span>
            </div>
            <div class="goods" v-for="good in goodlist">
              <div class="goods-li" >
                <div class="li-img">
                  <img :src="good.thumb" alt="">
                </div>
                <div class="li-text">
                  <h1>{{good.name}}</h1>
                  <p>{{good.price}}<p>
                  <p id="num" >x{{good.goods_sum}}件</p>
                </div>
                  <span @click="afterSales(good)" v-if="good.is_after_sale==0" class="shouhou">申请售后</span>
                  <span @click="goServerInfo(good)" v-if="good.is_after_sale==1" class="shouhou">售后详情</span>
                </div>
            </div>
        </div>
      </div>
    </div>
   
  </div>
</template>
<script >
import Toptitle from './../Toptitle.vue'
export default {
    data () {
        return {
            headers: {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            },
            apiUrl: 'index/orderInfo',
            create_time: '',
            goodlist: '',
            order_id: ''
        }
    },
    components: {
        Toptitle
    },
    created() {
        var orderId = this.$route.query.orderSon;
        console.log(orderId)
        this.$http.post(this.apiUrl, {
                orderSn: orderId
            }, this.headers)
            .then((res) => {
                let result = res.body.data;
                this.create_time = result.create_time;
                this.order_id = result.order_id
                this.goodlist = result.goods;
            })
    },
    methods: {
        afterSales(good) {
            this.$router.push({
                name: 'afterSalesService',
                params: {
                    orderSn: this.$route.query.orderSon,
                    goodsId: good.goods_id,
                    goodsAttrId: good.goods_attr_id
                }
            })
        },
        goServerInfo(good) {
            this.$router.push({
                name: 'serviceinfo',
                params: {
                    orderSn: this.$route.query.orderSon,
                    goodsId: good.goods_id,
                    goodsAttrId: good.goods_attr_id
                }
            })
        }
    }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.xin-li{
  width: 100%;

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
          top:0.625rem;
          left: 0.3125rem;
        }
      }
    }
  }
}


</style>
