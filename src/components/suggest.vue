<template>
<div class="wrap-page">
<div >
  <toptitle msg="意见反馈"></toptitle>
  <div class="con-box">
    <p class="you-feed">你的建议&nbsp;&nbsp;（必填）</p>
    <textarea name="" id="" placeholder="在这里输入" v-model="feedbackContent"></textarea>
  </div>
  <div class="con-box">
    <p class="you-contact">联系方式&nbsp;&nbsp;（必填）</p>
    <input type="text" placeholder="你的手机号" v-model="phone" >
  </div>
  <p class="b-text">如果您填写了有效的联系方式，穷人当家团队会在48小时内根据您的反馈内容以邮件、短信或者电话的方式进行回复。<br><br>

    紧急问题请直接联系客服:020-66618800-8207 <br>（客服时间&nbsp;&nbsp;9：00-18：00）</p>
    </div>

    <span class="r-btn" @click="btn_submit">提交</span>

</div>
</template>

<script >
import { MessageBox } from 'mint-ui';
import Toptitle from './Toptitle.vue'
  export default {
    data() {
      return{
        phone:'',
        feedbackContent  :'',
        apiUrl: 'index/inFeedback',
        headers: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
      }
    },
    components: {
    Toptitle,
  
  },
    methods:{
      go_index:function () {
        this.$router.push('/')
      },
       backtoprv(){
        this.$router.go(-1)
     },
      btn_submit:function () {
       
        var myreg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
         if (!(myreg.test(this.phone))) {
            MessageBox.alert('手机号码不正确')
            return

         }else if (this.feedbackContent == '') {
           MessageBox.alert('请填写建议')
            return
            
         }else {
          MessageBox.alert('提交成功，谢谢你的反馈');

          this.$http.post(this.apiUrl,{
          phone:this.phone,
          feedbackContent:this.feedbackContent
        },this.headers)
          .then((data) => {
            if(data.body.error == 0){
              this.phone = ''
              this.feedbackContent = ''
              this.$router.push('/guestSever')
            }
          })
          .catch(function(err) {
          })
         }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
 .con-box{
    padding: 0 0.28125rem;
    textarea{
      padding-top: 0.3125rem;
      font-size: 0.375rem;
      text-indent: 0.3125rem;
      display: block;
      width: 100%;
      height: 6.6875rem;
      border: none;
      outline: none;
      background-color: #efeff0;
    }
    input{
      text-indent: 0.3125rem;
      font-size: 0.375rem;
      outline: none;
      width: 100%;
      height: 1.25rem;
      line-height: 1.25rem;
      background-color: #efeff0;
      border: none;
    }
  }
  .you-feed{
    font-size: 0.375rem;
    height: 1.25rem;
    line-height: 1.25rem;
    text-indent:0.625rem;
  }
  .you-contact{
    font-size: 0.375rem;
    height: 0.9375rem;
    line-height: 0.9375rem;
    text-indent:0.625rem;
  }
  .b-text{
    padding: 0 0.28125rem;
    margin-top: 0.46875rem;
    font-size: 0.375rem;
    line-height: 1.5;
  }
   .save-btnbox{
    height: 0.71875rem;
    overflow: hidden;
     display: block;

  }
  .r-btn {
    margin:0 auto;
     margin-top: 1rem;
    display: block;

    line-height: 0.71875rem;
    color: #fff;
    text-align: center;
    height: 0.78125rem;
    width: 3.90625rem;
     font-size: 0.40625rem;
    line-height: 0.78125rem;
    border-radius: 0.078125rem;
   margin-bottom: 1rem;
    border-radius: 0.078125rem;
    background:#77bc1f
  }

</style>
