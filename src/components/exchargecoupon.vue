<template>
<div class="coupon">
  
    <div class="offthestocks">

      <div   @click="goOnecoupon(key)" class="xin-list" v-for="key in sellist">
        <div class="info">
          
           <span class="coupon-mon">￥{{key.denomina}}元</span>
           <p class="coupon-p">{{brandname}}优惠券</p>
           <p class="leave-num">剩余{{key.num}}张</p>
            
           <p class="coupon-p2">有效期 <span class="coupou-ins">该券可以多次兑换</span></p> 

        </div>
        <div class="cou-right">
             <span class="num">{{key.denomina}}</span>
             <span class="text1">银票</span>
             <span class="text2">我要兑换</span>
          </div>
      </div>
  
    <div class="bigmark" @click="showmark=false;showbigmark=false;showsucess=false" v-show="showbigmark" ></div>
    <div class="mark" v-show="showmark">
    <div class="mark-content">
        <p  class="mark-text">兑换提示</p>
         <p class="mark-text1">该商品将扣除你{{needsliver}}银票</p>
         <div  class="mark-btns" >
          <span @click.stop="showmark=false;showbigmark=fals" >取消</span>
          <span @click="surechange(key)">确定</span>
         </div>
      </div>
    </div>
    <img class="ex-sucess" @click="showbigmark=false;showsucess=false"  v-show="showsucess" src="../images/exsucess.png" height="417" width="482" alt="">

</div>
 <bottom></bottom>
</div>
</template>
<script >
import Vue from 'vue'
import Bottom from './index/Footer.vue'
import {MessageBox} from 'mint-ui';
const ERRCODE = 0;
export default {
  data(){
    return{
      headers: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
     denominaListUrl: 'index/denominaList',
      buyPointCouponsUrl: 'index/buyPointCoupons',
      isTrue:false,
      content:'',
      dizhi:'',
      miyao:'',
      ove:'',
      miyao:'秘钥',
      morgin:'',
      fuzhitext:'',
      thirdPartyOpenid:'',
      sellist:[],
      showmark:false,
      needsliver:'',
      key:'',
      showsucess:false,
      showbigmark:false,
      brandname:''
    }
  },
  components: {
        Bottom,
   
  },
  methods:{

    surechange(key){
    
      if (this.key.num==0) {
          MessageBox.alert('点券已经没有了')
      }
     this.$http.post(this.buyPointCouponsUrl, {
          thirdPartyOpenid: this.thirdPartyOpenid,
          denominaId: this.key.denomina_id,
          num: 1
        }, this.headers)
        .then((res) => {
          if (res.data.error == ERRCODE) {
               this.showsucess= true;
               key.num--
            }else {
             MessageBox.alert('兑换失败，请稍后再试');
             this.showbigmark=false;
          }
            this.showmark = false;
          })
        .catch(function(err) {
          console.log(err)
        })
    },
 
  goOnecoupon(key) {
     // console.log(key)
     if (key.num==0) {
        MessageBox.alert('优惠券已经没有了');
        return
     }
     this.$router.push({ path: 'onecoupon', query: {third_party_name:this.$route.query.third_party_name,third_party_openid:this.$route.query.third_party_openid,denomina:key.denomina,denomina_id:key.denomina_id,num:key.num }})
  },
    
  },
  created(){
    
     this.brandname =this.$route.query.third_party_name;
    this.thirdPartyOpenid = this.$route.query.third_party_openid;
    console.log(this.$route.query.third_party_openid)

    // 获取优惠券lei
  this.$http.get(this.denominaListUrl, {
          params: {
            thirdPartyOpenid: this.thirdPartyOpenid
          }
        })
        .then((res) => {

          if (res.body.error == ERRCODE) {

            let result = res.body.data;
            this.sellist = result;
             console.log(res)
          }

        })
        .catch(function(err) {
          console.log(err)
        })
        // 兑换点券
        


    
  }
}
Vue.filter('shijian', function (val) {
     var timestamp = val
     var d = new Date(timestamp * 1000);
     var date = (d.getFullYear()) + "-" +
       (d.getMonth() + 1) + "-" +
       (d.getDate())
     return date
 }
)
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.coupon{
  padding: 0 0.3125rem;
  background-color:#f3f3f3;
  clear: both;
  height: 100%;
  .coupon-header{
    position: fixed;
    height:1.2rem;
    background-color: #FFF;
    top: 0;
    width: 10rem;
    left: 0;
    z-index: 99;
    ul{
      display: flex;
      list-style: none;
      margin:0;
      padding:0;
      li{
        flex: 1;
        text-align: center;
        .text1{
      display: inline-block;
      height: 1.2rem;
      border-bottom:0.066667rem solid #f3941a;
      width: 2.133333rem;
      text-align: center;
      line-height: 1.2rem;
      font-size: 0.373333rem;
      color:#f3941a;
    }
    .text2{
      display: inline-block;
      height: 1.2rem;
      width: 2.133333rem;
      text-align: center;
      line-height: 1.2rem;
      font-size: 0.373333rem;
    }

      }
    }
  }
}
.offthestocks{
  padding-bottom:0.3125rem;
  
  border-top:0.015625rem solid #fff;
  .xin-list{
   width: 9.36rem;
   height: 3.2rem;
   margin-top:0.3125rem;
   padding:0.3125rem;
   background-image: url(../images/couponbg.png);
   background-size: 100% 100%;
    clear: both;
    padding-bottom:1.09375rem;
    position: relative;
    .go-pay{
      display: block;
      width: 3.09375rem;
      border:1px solid #77bc1f;
      height: 0.65625rem;
      line-height: 0.65625rem;
      text-align: center;
      font-size: 0.375rem;
      color: #fff;
      background-color:#77bc1f;
      border-radius:0.125rem;
      margin-top: 0.21875rem;
      float: right;
    }
    .cou-right{
      position: absolute;
      right: 0;
      top:0;
      height: 100%;
      width: 2.4rem;
      text-align: center;
      span{
        display: block;
        color: #fff;
      }
      .num{
        font-size: 0.72rem;
        margin-top: 0.48rem;
      }
      .text1{
        font-size: 0.346667rem;
        margin-top: 0.066667rem;
      }
      .text2{
        font-size: 0.346667rem;
        border-radius:0.266667rem;
        border:0.04rem solid #fff;
        width: 1.733333rem;
        height: 0.6rem;
        margin:0.266667rem auto 0;
      }
    }
   .info{
    float: left;
    p:nth-child(1){
      
    }
   
    
}
   .coupon-mon{
    font-size: 0.746667rem;
    color: #ff7300;
    
   }
   .coupon-p{
      margin-top: 0.213333rem;
      font-size: 0.426667rem;
      color: #858585;
    }
    .coupon-p2{
     
      font-size: 0.293333rem;
      color: #858585;
    }
   .btn{
      width: 100%;
      .btn-left{
        height: 1.171875rem;
        width: 100%;
        line-height: 0.703125rem;

        span{
          font-size: 0.375rem;
        }
        span:nth-child(1){
          color: #666464;
          display:inline-block;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
          width: 5.6875rem;
        }
        span:nth-child(2){
          float: right;
          display: block;
          border:1px solid #aaabab;
          width: 1.921875rem;
          height: 0.671875rem;
          text-align: center;
          line-height: 0.671875rem;
          border-radius:0.125rem;
          color: #77bc1f;
          background-color:#fff;
          margin-top: -0.03125rem;

        }
      }
      .btn-right{
        height: 1.171875rem;
        width: 100%;
        line-height: 0.703125rem;
        border-bottom:1px dashed #dcdddd;
        span{
          font-size: 0.375rem;
        }
        span:nth-child(1){
          color: #666464;
          display:inline-block;
          white-space:nowrap;
          overflow:hidden;
          text-overflow:ellipsis;
          width: 5.6875rem;
        }
        span:nth-child(2){
          float: right;
          display: block;
          border:1px solid #aaabab;
          width: 1.921875rem;
          height: 0.671875rem;
          text-align: center;
          line-height: 0.671875rem;
          border-radius:0.125rem;
          color: #77bc1f !important;
          background-color:#fff;
          margin-top: -0.03125rem;
        }
      }
    }
  }
}

  .zhezhao{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,.5);
    z-index: 9999;
    left: 0;
  }
  .kuang{
    padding: 0 0.3125rem;
    margin-top: 3.625rem;
    .text{
      padding: 0.3125rem;
      width: 7.8125rem;
      height: 7.1rem;
      background-color: #fff;
      margin: 0 auto;
      border-radius: 0.15625rem;
      p{
        text-align: center;
        font-size: 0.390625rem;
        padding-bottom: 0.3125rem;
      }
      textarea{
        height: 4.6875rem;
        width: 100%;
        border-radius: 0.15625rem;
      }
      span{
        display: inline-block;
        width: 3.125rem;
        height: 0.78125rem;
        line-height: 0.78125rem;
        font-size: 0.390625rem;
        text-align: center;
        margin-top: 0.15625rem;
      }
      .left{
      
        border-radius: 0.15625rem;
        border:1px solid #aaabab;
        color: #000;
      }
      .right{
        background-color: #77bc1f;
        border-radius: 0.15625rem;
        border:1px solid #666464;
        float: right;
      }
    }
  }
  .leave-num{
    margin-top: 0.133333rem;
  font-size: 0.293333rem;
  color: #737373;
  }
  .coupou-ins{
    margin-left: 0.266667rem;
  }
  .mark-exchage{
     position: absolute;
     top:0;
    width: 7.466667rem;
    height: 3.333333rem;
    background-color: red;
  }


  .bigmark{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top:0;
  left: 0;
  z-index: 99;
}
.mark-content{
  width: 100%;
  height: 100%;
  
   background-color: #fff;
   border-radius: 0.266667rem;
   overflow: hidden;
}
.mark-text{
  padding: 0.533333rem 0;
  text-align: center;
  font-size: 0.453333rem;
  color: #222;
}
.mark{
  width:8.293333rem;
 position: fixed;

  top: 50%;
  left: 50%;
 transform:translate(-50%,-50%);

  z-index: 1008;
}
.mark-btns{
   height: 1.226667rem;
  margin-top: 0.506667rem;
  display: flex;
  span{
     flex:1;
     text-align: center;
      line-height: 1.226667rem;
      font-size: 0.453333rem;
     &:nth-child(1){
       background-color: #ddd;
       color: #888;
      }
      &:nth-child(2){
       background-color: #ff7300;
       color: #fff;
      }
  }
}


.mark-text1{
  font-size: 0.48rem;
  color: #666;
  text-align: center;
}
.ex-sucess{
   position: fixed;
   z-index: 100;
   width: 6.426667rem;
   height: 5.56rem;
   left: 50%;
   top:50%;
   transform:translate(-50%,-50%)
}
</style>
