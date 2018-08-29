<template>
<div>
  <toptitle msg="帮助与反馈"></toptitle>
 

  <div class="cons-xf">
    <p class="bt-border l" @click="tosuggest"><span class="feedbackone"></span>意见反馈<span class="right">&gt;</span></p>
    <p class="bt-border one" >
      <span class="feedbacktwo"></span>
       <i class="first" >客服电话：020-66618800-8207 <br></i>
       <i class="second"> （客服时间 9:00-18:00）</i></p>
  </div>
  <p class="about-sliver" @click="toinstructions">关于银票和兑换点券<span class="right">&gt;</span></p>
  <div>
    <span class="save-btn" @click="go_index">返回首页</span>
  </div>
</div>
</template>

<script >
import Toptitle from './Toptitle.vue'
export default {
   components: {
    Toptitle,
  
  },
    methods:{
      go_index:function () {
        this.$router.push('/')
      },
      tosuggest(){
         this.$router.push('/suggest')

     },
     toinstructions(){
     this.$router.push('/instructions')
     }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
html {
    -webkit-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;
}
.feedbackone{
  float: left;
   display: inline-block;
  margin-left: 0.46875rem;

  width: 0.90625rem;
  height: 0.890625rem;
  background-size: 100% 100%;
  margin-top:0.25rem;
  background-image: url("../images/feedbackone.png");
}
 span.right{
  float: right;
  margin-right: 0.125rem;
  color: #878787;
 }
.about-sliver{
  font-size:0.375rem;
  text-indent: 0.46875rem;
 padding: 0.40625rem 0;
 margin:0 0.46875rem ;
 border-bottom: 0.015625rem solid #c9caca;

}
.feedbacktwo{
 float: left;
   display: inline-block;
  margin-left:0.46875rem;

  width: 0.90625rem;
  height: 0.890625rem;
  background-size: 100% 100%;
  margin-top:0.25rem;
  background-image: url("../images/feedbacktwo.png");
}
  .top-title{
    width:10rem;
    padding:0 0.3125rem;
  }
  .title{
    position: relative;
    text-align:center;
    height: 1.0rem;
    line-height:1.0rem;
    font-size:0.4375rem;
    border-bottom:1px solid #cacaca;
    font-weight:400;
    color: #909090;
  }
  .title a{
    color: #909090;
    text-decoration: none;
    float: left;
  }
  .text-cont{
    clear: both;
    box-sizing:content-box;
    color: #347f97;
    font-size: 0.4375rem;
    padding: 0 0.625rem;
    height: 1.09375rem;

    border-bottom: 0.3125rem solid #efeff0;
  }
  .icon{
    float: left;
    margin-right: 0.625rem;
    display: inline-block;
    margin-top: 0.09375rem;
    width: 1.15625rem;
    height: 0.875rem;
    background-image: url("../images/contacticon.png");
    background-size: 100% 100%;
  }
  .text{
    float: left;
    display: inline-block;
     line-height: 1.09375rem;
  }
  .bt-border{
     margin:0 0.46875rem ;
    font-size: 0.34375rem;
    border-bottom: 1px solid #d3d3d4;
    &.l{
      line-height: 1.28125rem;
    }

  }
  .cons-xf{
   border-top: 0.75rem solid #efeff0;
   border-bottom: 0.28125rem solid #efeff0;
    p{
      box-sizing:border-box;
      height: 1.28125rem;

      font-size: 0.34375rem;
      &.one{
        font-size: 0.34375rem;

      }
    }
  }

.save-btn {
    position: absolute;
    bottom: 1.40625rem;
   height: 0.78125rem;
    width: 3.90625rem;
    line-height: 0.78125rem;
     font-size: 0.40625rem;
    
    color: #fff;
    margin: 0 auto;
    left: 50%;
    margin-left: -1.96875rem;
    text-align: center;

    border-radius: 0.078125rem;
      background:#77bc1f




     }
  i{
    font-style: normal;

      &.first{
      display:block;
      padding-top: .25rem;
      font-size: 0.34375rem;
      }
      &.second{
          font-size: 0.28125rem;

        }
     }

</style>
