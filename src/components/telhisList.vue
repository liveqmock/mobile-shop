<template>
<div class="wrap-page">
 <toptitle msg='充值记录'></toptitle>  

  <div class="yinpiaolist" >
    <ul>
      <li v-for="(key,val) in content">
        <div class="top">
          <span class="left">手机号：{{key.mo_mobile}}</span>
          <span class="right">￥{{key.price}}</span>
        </div>
        <div class="bottom">
          <span class="left">订单号:{{key.mo_order}}</span>
          <span class="right">{{key.times}}</span>
        </div>
      </li>
    </ul>
  </div>
  <div class="footer">
    <span @click="go_index">返回首页</span>
  </div>
</div>
</template>

<script >
import Toptitle from './Toptitle.vue'
import {Header} from 'mint-ui'
  export default {
    data() {
      return{
        phone:'',
        feedbackContent  :'',
        apiUrl: 'Phone/get_order',
        headers: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
        isTrue:true,
        content:'',
      
      }
    },
     components: {
        Toptitle
    },
    created(){
  
      this.$http.get(this.apiUrl)
        .then((data) => {
           this.content = data.body
          });
       },
    methods:{
      go_yinpiao:function(){
          this.$router.go(-1)
      },
      go_index:function () {
        this.$router.push('/')
      },
     }
       
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.wrap-page {
    height: 100%;
    width: 10rem;
    margin:0 auto;
     padding: 0 0.3125rem;
     
    
    
   
   
    .yinpiaolist{
      padding-bottom: 2.34375rem;
      ul{
        list-style: none;
        margin: 0;
        padding: 0;
        li{
          height: 1.5625rem;
          border-bottom: 1px solid #c9caca;
          .top{
            padding-top: 0.3125rem;
            .left{
              font-size: 0.34375rem;
              color: black;
              font-weight: bold;
            }
            .right{
              font-size: 0.34375rem;
              color: black;
              font-weight: bold;
              float: right;
            }
          }
        }
        .bottom{
          padding-top: 0.234375rem;
          .left{
              font-size: 0.25rem;
              color: #aeaeae;
            }
            .right{
              font-size:  0.25rem;
              float: right;
              color: #aeaeae;
            }
        }
      }
    }
    .footer{
      height: 2.03125rem;
      position: fixed;
      left: 0;
      bottom: 0;
      width: 10rem;
      margin: 0 auto;
      background-color: #fff;
      span{
        display: block;
        height: 0.703125rem;
        width: 3.90625rem;

        background-size: 1px 0.703125rem;
        background-repeat: repeat-x;
        line-height: 0.703125rem;
        color: #fff;
        background-color: #77bc1f;
        line-height: 0.703125rem;
        text-align: center;
        margin:0 auto;
        border-radius: 0.078125rem;
        font-size: 0.4375rem;
      }
    }
  }
</style>
