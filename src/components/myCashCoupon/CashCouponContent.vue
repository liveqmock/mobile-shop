<template>
  <div class="cash-content">
     <span class="cashcoupon">现金券 {{cash}} 元</span>
     <span class="btn" @click="go_pay">来加满</span>
     <div class="zhe" v-if="isTrue" @click = "yin">
       <div class="kuang">
         <div class="nei">
           <img src="../../images/xianjinlogo.png" alt="">
           <input type="text" name="" placeholder="输入现金券密码"  v-model = 'ma' >
           <span class="btn" @click = "queding">确定</span>
         </div>
       </div>
     </div>
  </div>
</template>

<script>
import {
  MessageBox
} from 'mint-ui';
export default {
  created(){
     this.$http.get(this.apiUrl)
             .then((data) => {
                this.cash = data.data.data.cash_coupons;
             })
             .catch(function(err) {
                
             })
  },
  data(){
    return{
        apiUrl: 'index/cashCoupons',
          headers: {
            headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          }
      },
      cash:'',
      isTrue:false,
      ma:'',
      releaseCommentURL:'index/inCCCode'
    }
  },
  methods:{
    yin:function(ev){
      if(ev.target.className == "zhe"){
        this.isTrue = false;
      }
    },
    go_pay:function(){
        this.isTrue = true;
    },
    queding:function(){
      
      var addEvaluationParams = {
        ccCode:this.ma
      }
       if (this.ma=='') {
        MessageBox.alert('输入不能为空');
        return
       }
        this.$http.post(this.releaseCommentURL,addEvaluationParams
        ,this.headers)
        .then((res) => {
          console.log(res)
          if(res.data.error == 98){
               MessageBox.alert(res.data.msg)
          }else if (res.data.success == 1) {
             MessageBox.alert('充值成功').then(action => {
                  location.reload() 
            });
          }
        })
        .catch(function(err) {
        })
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.cash-content{
  margin-top: 1.1875rem;
  height: 3.515625rem;
  text-align: center;
   padding-top: 0.9375rem;
   .zhe{
    position: fixed;
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.5);
    top: 0;
    left: 0;
    z-index: 999;
    .kuang{
      height: 4.6875rem;
      width: 9.0625rem;
      background-color: rgba(0,0,0,.5);
      border-radius:0.234375rem;
      padding: 0.15625rem;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left:-4.53125rem;
      margin-top: -3.125rem;
      .nei{
       width: 100%;
       height: 100%;
       background-color:#fff;
       border-radius:0.234375rem;
       padding-top:0.296875rem;
       img{
         width: 1.296875rem;
         height: 1.265625rem;
         display: block;
         margin:0 auto;
       }
       input{
        width: 6.21875rem;
        height: 0.6875rem;
        outline:none;
        border:1px solid #c9caca;
        border-radius : 0.125rem;
        margin-top: 0.296875rem;
        text-align: center;
       }
       .btn{
          width: 3.90625rem;
          height: 0.78125rem;
           
          background:#77bc1f;

          border-radius:0.125rem;
          line-height: 0.78125rem;
          text-align: center;
          font-size: 0.4375rem;
          color: #fff;
       }
      }
    }
   }
  .cashcoupon{
    display: block;
    font-size: 0.4375rem;
    color: #000;
  }
  .btn{
    display: block;
    height: 0.78125rem;
    width: 3.90625rem;
  
     background:#77bc1f;
    margin: 0 auto;
    margin-top: 0.625rem;
    border-radius: 0.078125rem;
    color: #fff;
    font-size: 0.40625rem;
    line-height: 0.78125rem;
  }
}

</style>
