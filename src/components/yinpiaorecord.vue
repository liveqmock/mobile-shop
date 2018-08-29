<template>
<div class="wrap-page">
<div class="top-fixed">

</div>
<div class="nav-ming">
  <span class="nav-ming-left" @click="nav_list(val)" :style="key.border" v-for="(key,val) in arr">{{key.text}}</span>
</div>
  <div class="yinpiaolist" v-if="isTrue">
    <ul>
      <li v-for="(key,val) in content">
        <div class="top">
          <span class="left">{{key.use_silver_ticket_name}}</span>
          <span class="right">{{key.silver_ticket_num}}</span>
        </div>
        <div class="bottom">
          <span class="left">订单号:{{key.order_id}}</span>
          <span class="right">{{key.create_time | shijian}}</span>
        </div>
      </li>
    </ul>
  </div>
  <bottom></bottom>
</div>
</template>

<script type="text/ecmascript-6">
import bottom from './index/Footer.vue'
import {Header} from 'mint-ui'
  export default {
    data() {
      return{
        phone:'',
        feedbackContent  :'',
        apiUrl: 'index/silverTicketList',
        headers: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
        isTrue:true,
        content:'',
        silver_ticket:0,
        arr:{
          0:{
            text:'所有明细',
            border:" border-bottom:0.09375rem solid #ff7300;color:#ff7300"
          },
          1:{
            text:'获得明细',
            border:"border_0"
          },
          2:{
            text:'支出明细',
            border:"border_0"
          }
        }
      }
    },
     components: {
        bottom
    },
    created(){
  
      this.$http.get(this.apiUrl)
        .then((data) => {
          console.log(data)
          this.content = data.body.data
          for(var i in this.content){
            if (this.content[i].type ==1) {
              this.content[i].silver_ticket_num = "+"+this.content[i].silver_ticket_num
            }else{
              this.content[i].silver_ticket_num = "-"+this.content[i].silver_ticket_num
            }
          }
          if(data.body.error == 99){
            this.isTrue = false
          }else {
            this.isTrue = true
          }
        });
        var a  = 'index/silverTicket';
        this.$http.get(a)
          .then((data)=>{
          this.silver_ticket = data.data.data.silver_ticket
        })
    },
    methods:{
      go_yinpiao:function(){
          this.$router.go(-1)
      },
      go_index:function () {
        this.$router.push('/')
      },
      nav_list:function(num){
        for(var i in this.arr){
          this.arr[i].border = ''
        }
        this.arr[num].border = 'border-bottom:0.09375rem solid #ff7300;color:#ff7300;'
        if (num == 0) {
           this.$http.get(this.apiUrl)
        .then((data) => {
          console.log(data)
          this.content = data.body.data
          for(var i in this.content){
            if (this.content[i].type ==1) {
              this.content[i].silver_ticket_num = "+"+this.content[i].silver_ticket_num
            }else{
              this.content[i].silver_ticket_num = "-"+this.content[i].silver_ticket_num
            }
          }
          if(data.body.error == 99){
            this.isTrue = false
          }else {
            this.isTrue = true
          }
        })
        } else if (num == 1) {
            this.$http.get(this.apiUrl,{params:{
            type: 1
        }})
        .then((data) => {
          console.log(data)
          this.content = data.body.data
          for(var i in this.content){
            if (this.content[i].type ==1) {
              this.content[i].silver_ticket_num = "+"+this.content[i].silver_ticket_num
            }else{
              this.content[i].silver_ticket_num = "-"+this.content[i].silver_ticket_num
            }
          }
          if(data.body.error == 99){
            this.isTrue = false
          }else {
            this.isTrue = true
          }
        })
        }else if (num == 2) {
             this.$http.get(this.apiUrl,{params:{
            type: 2
        }})
        .then((data) => {
          console.log(data)
          this.content = data.body.data
          for(var i in this.content){
            if (this.content[i].type ==1) {
              this.content[i].silver_ticket_num = "+"+this.content[i].silver_ticket_num
            }else{
              this.content[i].silver_ticket_num = "-"+this.content[i].silver_ticket_num
            }
          }
          if(data.body.error == 99){
            this.isTrue = false
          }else {
            this.isTrue = true
          }
        })
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.top-fixed{
  position: fixed;
  top:0;
  width: 100%;
  left: 0;
}
.border_0 {
  border-bottom:0.09375rem solid #347f97;
}
.wrap-page {
    height: 100%;
    width: 10rem;
    margin:0 auto;
     .nav-ming{
      height: 1.2rem;
      background-color:#fff;
      text-align: center;
      padding: 0 0.3125rem;
      position: fixed;
      top: 0;
      margin:0 auto;
      width: 10rem;
      span{
        display: inline-block;
        height: 100%;
        width: 1.5625rem;
        line-height: 1.2rem;
        text-align: center;
        font-size: 0.373333rem;
        color: #000;
        font-weight: 400;
      }
      span:nth-child(1){
        float: left;
      }
      span:nth-child(3){
        float: right;
      }
      .nav-ming-center{

      }
     }
     .mint-header{

      border-bottom: 1px solid #838383;
      height: 1.15625rem;
     }
      .mint-header-title{
        color: #909090;
      }
    .yinpiaoHeader{
      height: 1.0rem;
      border-bottom: 1px solid #c9caca;
      text-align: center;
      line-height: 1rem;
      span{
        font-size: 0.421875rem;
        color: #c9caca;
      }
    }
    .yinpiaotou{
      height: 3.125rem;
      .info{
        padding-top: 0.859375rem;
        text-align: center;
        span{
          font-size: 0.546875rem;
        }
        p{
          font-size: 0.5rem;
        }
      }
    }
    .yinpiaolist{
      background-color: #f3f3f3;
      padding:1.2rem 0.266667rem 1.390625rem;
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
  }
</style>
