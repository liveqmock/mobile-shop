<template>
<div >
  <header>
    <section   class="top-title" >
      <h1 class="title">
        <a href=""    @click.prevent="backtoprv">
          <i class="mintui mintui-back" style="color:#909090"></i> 
        </a>我的订单
     </h1>
    </section>
  </header>
  <div class="content-header">
        <ul>
            <router-link to='/unpaidorderList' tag='li'  active-class="u-link--Active" exact>
              <img src="../../images/my-1.png"  alt="">
              <span class="navspan">待支付</span>
              <span v-if="unpaid!=0" class="list-num " :class="{bigclass:unpaid>9}">{{unpaid}}</span>
              </router-link> 
             <router-link to='/ReceiveOrderlist' tag='li'  active-class="u-link--Active" exact>
                 <img src="../../images/my-2.png"  alt="">
                 <span class="navspan">待收货</span>
                  <span v-if="delivered!=0" class="list-num " :class="{bigclass:delivered>9}">{{delivered}}</span>
               </router-link> 
             <router-link to='/evaluateOrderlist' tag='li'  active-class="u-link--Active" exact>
              <img src="../../images/my-3.png"  alt="">
              <span class="navspan">待评价</span>
             <span v-if="evaluated!=0" class="list-num " :class="{bigclass:evaluated>9}">{{evaluated}}</span>
               
            </router-link> 
           <router-link to='/aftersaleOrderlist' tag='li'  active-class="u-link--Active" exact>
              <img src="../../images/my-4.png"  alt="">
              <span class="navspan">售后</span>
           </router-link> 
           <router-link to='/doneOrderlist' tag='li'  active-class="u-link--Active" exact>
              <img src="../../images/my-5.png"  alt="">
              <span class="navspan">已完成</span>
           </router-link> 
        </ul>
    </div>
</div>
</template>
<script >
 import {MessageBox,Toast,InfiniteScrol,Header, Badge} from 'mint-ui';
 import Toptitle from './../Toptitle.vue'
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
      
     
      key: '',
      Ninfo: false,
    
      
    }
  },
   components: {
        Toptitle
    },
 computed: {
     ...mapState({
      unpaid: state => state.orderNum.unpaid,
      delivered: state => state.orderNum.delivered,
      evaluated: state => state.orderNum.evaluated
    })
 },
  created() {
       this.getOrderNum()
   },
  methods: {
    ...mapActions([
      'getOrderNum' 
      ]),
    backtoprv: function() {
      this.$router.push('/my')
    },
    // 点击订单中的商品的逻辑
   
   
   
 
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.u-link--Active{
  border-bottom: 2px solid #77bc1f;
}

.list-num{
  position: absolute;
    width: 0.390625rem;
    height: 0.390625rem;
    line-height: 0.390625rem;
    text-align: center;
    top: 0.0625rem;
    left: 1.125rem;
    background: #ff0000;
    color: #fff;
    text-align: center;
    line-height: 0.390625rem;
    border-radius: 50%;
    text-decoration: none;
    font-size: 12px;
    &.bigclass{
          width: 0.65rem;
    border-radius: 0.3125rem;
    }   
    
}





.content-header{
  height: 1.96875rem;
  position: fixed;
  width: 10rem;
  background-color: #fff;
   padding:0 0.3125rem;
  padding-top: 0.125rem;
  ul{
  
    height: 100%;
    display: flex;
    list-style: none;
    border-bottom: 1px solid #77bc1f;
   }
    li{
      box-sizing:border-box;
      flex:1;
      text-align: center;
    
      background-color:#fff;
      position:relative;
   
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
</style>
