<template>
  <div>
  <div class="head-portrait">
   <!-- 右侧箭头 -->
     <div class="portrait">
        <img :src="headerimg" alt="">
    </div>
    <div class="head-text">
      <span class="text">{{name}}</span>
    </div>
  </div>
  <div class="my-nav">
    <ul>
      <li @click="go_myOrder(0)">
        <img src="../../images/my-1.png" alt="">
        <span>待支付</span>
        <span class="mint-badge is-primary is-size-small dian" v-if="unpaid!=0" >{{unpaid}}</span>
      </li>
      <li @click="go_myOrder(2)">
        <img src="../../images/my-3.png" alt="">
        <span>待收货</span>
        <span class="mint-badge is-primary is-size-small dian" v-if="delivered!=0" >{{delivered}}</span>
      </li>
      <li @click="go_myOrder(3)">
        <img src="../../images/my-4.png" alt="">
        <span>待评价</span>
        <span class="mint-badge is-primary is-size-small dian" v-if="evaluated!=0">{{evaluated}}</span>
      </li>
      <li @click="go_myOrder(4)">
        <img src="../../images/shouhou.png" alt="">
        <span>售后</span>
      </li>
      <li @click="go_myOrder(5)">
        <img src="../../images/my-5.png" alt="">
        <span>已完成</span>
      </li>
    </ul>


  </div>
  <div class="my-nav-list" style="padding-bottom:2rem">
    <ul>
     
       <li @click="navList(5)">
        <span>我的银票</span>
       <span class="wb_arrow"></span>
      </li>
       <li  @click="showmark=true">
           <span>银票充值</span>
           <span class="wb_arrow"></span>

      </li>
      <li  @click="navList(6)">
           <span>我的现金券</span>
           <span class="wb_arrow"></span>
      </li>
        <li @click="navList(3)">
        <span>已兑换的点券</span>
         <span class="wb_arrow"></span>
      </li>


     <li @click="navList(2)">
        <span>地址管理</span>
        <span class="wb_arrow"></span>
      </li>

      <li @click="navList(4)">
        <span>帮助与反馈</span>
        <span class="wb_arrow"></span>
      </li>


    </ul>
  </div>
  
  <!-- 充值部分开始 -->
     <div class="bigmark" @click="showmark=false" v-show="showmark" ></div>
    <div class="mark" v-show="showmark">
    <div class="mark-content">
       <img @click.stop="showmark=false" class="close-button" src="../../images/tybtn.png"  alt="">
        <div class="icon-box"><img src="../../images/zhifubao.png" alt=""></div>
        <input v-model="stCode" class="shuruinput" placeholder="输入充值券码" type="text">
         <div class="duihuan-btn" @click="Recharge">确定</div>
      </div>
    </div>
    <!-- 充值部分 -->
  </div>
</template>

<script >
import { Indicator,MessageBox ,Badge  } from 'mint-ui';
 import {mapGetters,mapActions,mapState} from 'vuex'
  export default {
    data(){
        return{
          userInfoUrl:'index/userInfo',
          headerimg:'',
          silver:'',
            showmark:false,
           stCode:'',
            inSTCodeUrl:'index/inSTCode',
              headers: {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        },
        name:'',
        }
     },
      computed: {
     ...mapState({
      unpaid: state => state.orderNum.unpaid,
      delivered: state => state.orderNum.delivered,
      evaluated: state => state.orderNum.evaluated
    })
 },
    methods:{
        ...mapActions([
      'getOrderNum' 
      ]),
      navList:function (a) {
        if(a==1){
          this.$router.push('/coupon')
        }else if (a == 2) {

          this.$router.push({name:'addresslist'})

        }else if (a == 3) {
          this.$router.push('/couponList')
        }else if (a == 4) {
          this.$router.push('/feedback')
        }else if (a == 5) {
          this.$router.push('/silverTicketList')
        }else if (a == 6) {
          this.$router.push('/myCashCoupon/0')
        }
      },
      go_myOrder:function(params){
        if (params==0) {
          this.$router.push('/unpaidorderList')
        } if (params==2) {
          this.$router.push('/ReceiveOrderlist')
        } if (params==3) {
          this.$router.push('/evaluateOrderlist')
        }
       if (params==4) {
          this.$router.push('/aftersaleOrderlist')
        }
        if (params==5) {
          this.$router.push('/doneOrderlist')
        }
       
      },
     // 银票充值
       Recharge(){
         if(this.stCode==''){
            MessageBox.alert('输入不能为空').then(()=>{
              this.stCode='';
          });

            return
         }
       this.$http.post(this.inSTCodeUrl,{stCode:this.stCode},this.headers).then((res) => {

                 MessageBox.alert(res.data.msg).then(()=>{
                     this.stCode='';
                 });

                 this.showmark=false;

           })
            .catch(function(err) {
                console.log(err)
            })
    }
    },
    created(){
      this.getOrderNum();
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
    });
       this.$http.get(this.userInfoUrl)
            .then((res) => {
               let data = res.data.data;
               this.headerimg= data.head_pic;
                this.silver = data.silver_ticket;
                this.name = data.nick
                Indicator.close();
               })
            .catch(function(err) {
                console.log(err)
            })
            
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.close-button{
  position: absolute;
  right: 0.15625rem;
  top:0.125rem;
  display: inline-block;
  width: 0.484375rem;
  height: 0.484375rem;
}

 .wb_arrow{
               position: absolute;
               right: 32px;
               top:50%;
               transform:translate(0,-50%);
                margin-top: -4px;
               display: inline-block;
                border-right: 1px solid #878787;
                border-top: 1px solid #878787;
                height: 8px;
                width: 8px;
                transform: rotate(45deg);
                -webkit-transform: rotate(45deg);
                
            }

.yinquanchongzhi{
   height: 1.0rem;
   width: 96%;
   box-sizing:border-box;
    margin: 0 auto;
   border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
   span{
    text-indent: 0.625rem;

    display: inline-block;
    height: 1rem;
    line-height: 1.0rem;
   }
   b{
    float: right;
     height: 1rem;
    line-height: 1.0rem;
    margin-right: 0.625rem;
    color: #999;
   }
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
   border-radius: 0.234375rem;
   background-color: #fff;
}
.mark{
  width: 8.75rem;
  height: 4.375rem;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top:(-4.375rem/2) ;
    margin-left:(-8.75rem/2) ;

  z-index: 100;
  border-radius: 0.234375rem;
  border: 8px solid rgba(0, 0, 0, 0.4);

}
.icon-box{
  padding-top: 0.28125rem;
  text-align: center;
  img{
    display: inline-block;
    width: 1.21875rem;
    height: 1.21875rem;
  }
}
.shuru{
  text-align: center;

}
.shuruinput{

   display: block;
   margin: 0 auto;
   width: 6.25rem;
   height: 0.6875rem;
   line-height: 0.6875rem;
   outline:none;
   border-radius:0.078125rem;
   border: 1px solid #8d8d8d;
  text-align: center;

  margin-top: 0.15625rem;


}
.duihuan-btn{

  width: 3.90625rem;
  padding: 0.078125rem 0;

  background:#77bc1f;
  margin: 0 auto;
  margin-top: 0.3125rem;
  font-size: 0.4375rem;
  color: #fff;
  text-align: center;

  border-radius:0.078125rem;

}
  .head-portrait{
    height: 5.9375rem;
    overflow:hidden;
    background:url('../../images/slivert-headbg.jpg');
    .portrait{
      height: 3.125rem;
      width: 3.125rem;
      border-radius: 50%;
  
      margin: 0.625rem auto 0;
      overflow: hidden;
      margin-top: 0.9125rem;
      padding:0.15625rem;
      img{
   width: 100%;
   height: auto;
   border-radius:50%;
      }
    }
    .head-text{
      margin-top: 0.296875rem;
      width: 100%;
      text-align: center;
      .text{
        font-size: 0.375rem;
        color: #000;
      }
      p{
        font-size: 0.515625rem;
      }
    }
  }
  .my-order{
    padding: 0 0.3125rem;
    height: 0.78125rem;
    div{
      background-color: #efefef;
      height: 100%;
      line-height: 0.78125rem;
      position: relative;
      span{
        margin-left: 0.3125rem;
        font-size: 0.34375rem;
        color: black;
      }
      img{
        width: 0.21875rem;
        height: 0.1875rem;
        position: absolute;
        right: 0.9375rem;
        top: 50%;
        margin-top: -0.09375rem;
      }
    }
  }
  .my-nav{
    height: 2.03125rem;
    padding: 0 0.3125rem;
    ul{
      height: 100%;
      width: 100%;
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      margin-top: 0.125rem;
      li{
        flex:1;
        text-align: center;
        margin-top: 0.3rem;
        position: relative;
        span{
          display: block;
          margin-top: 0.1rem;
          font-size: 0.375rem;
          
        }
        img{
          display: block;
          width: 0.859375rem;
          height: 0.78125rem  ;
          margin: 0 auto;
        }
        .dian{
          position: absolute;
          left:1.09375rem;
          top: -0.2125rem;
          font-size: 8px;
          background-color:#ff0000;
          border-radius:8px;
          padding:1px 6px;
        }
      }
    }
  }
  .my-nav-list{
    padding: 0 0.3125rem;
    ul{
      height: 100%;
      width: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
      li{
        height: 1.25rem;
        width: 100%;
        border-top: 1px solid #efefef;
        line-height: 1.25rem;
        position: relative;
        span{
          margin-left: 0.3125rem;
          font-size: 0.375rem;
         
        }
        img{
          width: 0.21875rem;
          height: 0.1875rem;
          position: absolute;
          right: 0.9375rem;
          top: 50%;
          margin-top: -0.09375rem;
        }
      }
      li:last-child{
        border-bottom: 1px solid #efefef;
      }
    }
  }
</style>
