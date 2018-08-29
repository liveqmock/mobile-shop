<template>
  <div class="allList-content" >
  <div  class="lister-header">
     <span class="sliver-icon"></span>
     <span class="sliver-headertext">我要当家</span>
     <span class="sliver-intros">当家说明</span>
  </div>
    <div  class="Recommend-list">
      <ul>
        <li @click="showCouponModel(item)" v-for=" item in recommended" >
          <img :src="item.third_party_logo" alt="">
        </li>
      </ul>
    </div>
<!--兑换点券弹框 -->
  <div class="bigmark" @click="showCup=false" v-show="showCup" ></div>
<div class="coupon-exchange" v-show="showCup">
<img @click.stop="showCup=false" class="close-button" src="../../images/tybtn.png"  alt="">
    <div class="coupou-img">
       <div>
       <img :src="logoimg" alt="">
       </div>
      </div>
    <div class="list-coupon-money">
     
       <span  @click="getDenominaID(sell)" :class="{bgColorgray:sell.num==0,itemselect:sell.showSelect}"  v-for="sell in sellist">{{sell.denomina}}元</span>
      </div>
     
     <div class="duihuan-btn" >确定</div>
</div>

</div>

</div>
</template>

<script>
const ERRCODE = 0;
import {mapGetters,mapActions} from 'vuex';
import {MessageBox,Indicator} from 'mint-ui';
export default {
  data() {
    return {
      headers: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      thirdPartyUrl: 'index/thirdParty',
    
      couponsCodeNumtUrl: 'index/couponsCodeNum',
     
      list: [],
      sellist: [],
     
      showCup: false,
      Dcup: 1,
      denomina: '',
      denomina_id: '',
      logoimg: '',
      recommended: [],
      ordinary: [],
      showSelect: false,
      hasDatalist: false,
      showfare: false,
      farecode: '',
      donghuas:false,
      showAnimataButton:true
    }
  },

  created() {

    // 获取优惠卷的列表
    this.$http.get(this.thirdPartyUrl)
      .then((res) => {
        if (res.body.error === ERRCODE) {

          let result = res.body.data;

          this.recommended = result.recommended;
          this.ordinary = result.ordinary;
        }
      })
      .catch(function(err) {
        console.log(err)
      })
  },
  methods: {
    ...mapActions([
      'resetsliver'
    ]),
    showanimate(){
        this.donghuas=true;
        this.showAnimataButton= false;

    },
     dhclose:function () {
        this.donghuas=false;
         this.showAnimataButton= true;
      },
       handleChange:function (event) {
        console.log(event)
      },
    showCouponModel(item) {

      // 再次点击判断判断是否无数据回到原始状态
      this.hasDatalist = false;
      // 判断如果是跳转的链接
      if (item.type == 3) {
        this.$router.push('/phonefare');
        return;
      }
      if (item.type == 2) {

        location.href = './Third/jump_url/openid/' + item.third_party_openid;
        return
      }
      
       this.$router.push({ path: 'exchargecoupon', query: {third_party_name:item.third_party_name,third_party_openid:item.third_party_openid }})
      // 获取金额列表
     
    
    },

    getDenominaID(sell) {
      this.num = sell.num;
      if (sell.num == 0) {
        MessageBox.alert('此面额点券已经没有了，<br>请选择其他面额')
        return
      }
      this.sellist.forEach((element, index) => {
        this.$set(element, 'showSelect', false);
      });
      this.denomina_id = sell.denomina_id;
      sell.showSelect = true;
    },

    //兑换点券
  
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.lister-header{

  padding: 0 0.32rem;

   margin-top: 0.453333rem;
  height: 0.453333rem;
  line-height:0.453333rem ;
  background-color:#fff;
  overflow: hidden;
}
.sliver-icon{

 float: left;
  width: 0.16rem;
  height: 0.453333rem;
  background-color: #fc7e17;
  border-radius: 0.08rem;
}
.sliver-headertext{
  display: inline-block;
  margin-left: 0.186667rem;
 
  font-size: 0.4rem;
}
.sliver-intros{
  font-size: 0.346667rem;
  color: #888;
  float: right;
  position: relative;
  &:before{
    position: absolute;
    left: -0.466667rem;
    top:50%;
    transform:translate(0,-50%);
    display: inline-block;
    width: 0.333333rem;
    height: 0.333333rem;

     content:"";
    background-image: url(../../images/tipicon.png);
    background-size: 100% 100%;
  }
}
.use-taobaoc{
  width: 4.5rem;
  height: 1.296875rem;
  position: absolute;
  z-index: 1000;
  top:0.3125rem;
  right: 0.40625rem;
}
.close-button{
  position: absolute;
  right: 0.15625rem;
  top:0.125rem;
  display: inline-block;
  width: 0.484375rem;
  height: 0.484375rem;
}
.duihuan-btn.s{
  bottom: 0.3125rem;
}
.allList-content{
  padding-top: 0.453333rem;
  padding-bottom:2rem;
  margin-top: 0.266667rem;
  background-color: #fff;
}
.bgblue{
  background-color: #e6fffe;
  width: 100%;
  height: 1.09375rem;
  line-height: 1.09375rem;
  text-align: center;
  color: #347f97;
  font-size: 0.34375rem;
}
ul,li{
  list-style: none;
}

.Recommend-list{

 
  position: relative;
  overflow: hidden;
  padding: 0 0.32rem;
  width:10rem;
 
  a{
    display: block;
    position: absolute;
    z-index: 1000;
    width: 100%;
    height: 100%;
    z-index: 10000;
    top: 0;
    left: 0;
  }
  &.two{
    padding-top: 0;
  }
  ul{
      float: left;
      overflow: hidden;
     
      clear: both;
  }
  li{
     position: relative;
    line-height:3.125rem;
    width: 3.12rem;
    height: 3.12rem;
  
    box-sizing:border-box;
 
    float: left;
    text-align: center;
    img{
       margin: 0 1px;
      vertical-align: middle;
      display: inline-block;
       max-width: 100%;
       height: auto;

    }
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
.coupon-exchange{

  position: fixed;
  top: 50%;
  left: 50%;
  margin-left:-(8.75rem/2) ;
  margin-top: -(8.75rem/2);
  width: 8.90625rem;
  height: 8.90625rem;
  background-color: #fff;
  border-radius: 0.3125rem;
  border: 8px solid rgba(0, 0, 0, 0.8);
  padding-bottom: 0.3125rem;
  z-index: 1008;
}
.coupou-img{
  padding: 0.5rem 0;
  margin: 0 0.28125rem;
 
  border-bottom:1px solid #8f8f8f;
  div{
    margin: 0 auto;
    width: 2.140625rem;
    height: 1.15625rem;
     text-align: center;
  }
  img{
    display: inline-block;
    max-width: 100%;
    height: auto;
  }
}
.list-coupon-money{
  overflow-x: hidden;
  clear: both;
 position: relative;
left: 0.1875rem;
 text-align: center;
 margin-left: -0.15625rem;
  span{
    float: left;
    width: 2.59375rem;
    height: 1.53125rem;
     line-height: 1.53125rem;
    margin-left: 0.15625rem;
    background-color: #fff;
    border: 1px solid #cdcece;
    border-radius: 0.078125rem;
    margin-top: 0.375rem;
    color: #77bc1f;
    font-size: 0.4375rem;
    &.bgColorgray{
      background-color: #c9caca;
     color: #ababab;
    }
    &.itemselect{
       background-color: #77bc1f;
       color: #fff;
   }

  }
}
.duihuan-btn{
  position: absolute;
  z-index: 1000;
   bottom: 0.625rem;
   left: 50%;
   margin-left: -(3.90625rem/2);
  width: 3.90625rem;
  height: 0.78125rem;
  background-color: #77bc1f;
  color: #fff;
  text-align: center;
  line-height:0.78125rem ;
  border-radius:0.078125rem;
 }
 .no-data{
    position: absolute;
    z-index: 109;
    top: 2.15625rem;
    padding-top: 1rem;
    height: 4.3125rem;
   
    text-align: center;
    background-color: #fff;
    width: 100%;

 }
// 动画css
#donghua{
    position: fixed;
    top:0;
    left: 0;
    width: 100%;
    height:100%;
    background-color: #ffffff;
    z-index: 999;
    .guanbi{
        width: 1.125rem;
        position: absolute;
        bottom: 1.5rem;
        left:50%;
        margin-left: -0.5625rem;
    }
    .mint-swipe {
        background-color: #fff;
        .is-active{
            display: block;
        }
    }
    .num1{
        .shouji{
            position: absolute;
            bottom: 3.5rem;
            left:50%;
            margin-left: -3.4375rem;
            width: 6.875rem;
            animation: myfirst 1s;
        }
        @keyframes myfirst
        {
            from {
                bottom: -100%;
            }
            to {
            bottom: 3rem;
            }
        }
        .xing1{
            width:0.59375rem;
            position: absolute;
            right: 1.481875rem;
            bottom:5.2rem;
            animation: ops 1s ;
            animation-delay: 0.5s;
            animation-fill-mode:forwards;
            opacity: 0;


        }
        .xing2{
            width: 0.640625rem;
            position: absolute;
            right: 3.98rem;
            bottom:5.2rem;
            animation: ops 1s ;
            animation-delay: 1s;
            animation-fill-mode:forwards;
           opacity: 0;

        }
        .xing3{
            width: 0.59375rem;
            position: absolute;
            right: 2.311875rem;
            bottom:4.19rem;
            animation: ops 1s ;
            animation-delay: 1.5s;
            animation-fill-mode:forwards;
            opacity: 0;
        }
        @keyframes ops
        {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;


            }
        }
        .shou{
            width: 2.046875rem;
            position: absolute;
            right: 0;
            bottom: 3rem;
            animation: ops 1s ;
            animation-delay: 1.5s;
            animation-fill-mode:forwards;
            opacity: 0;
        }
        .yuan{
            width:1rem;
            position: absolute;
            left:50%;
            margin-left: -0.5rem;
            margin-top: 20px;
            animation: yuan 1s ;
            animation-delay: 0s;
            animation-fill-mode:forwards;
            opacity: 0;
        }
        .yuan2{
             width:1rem;
             position: absolute;
             left:50%;
             margin-left: -0.5rem;
             margin-top: 20px;
             animation: yuan 1s ;
             animation-delay: 0s;
             animation-fill-mode:forwards;
             opacity: 0;
         }
        .text1{
            position: absolute;
            left:50%;
            top:-100%;


            margin-left: -1.15rem;
            font-size: 0.5859375rem;
            animation: text1 1s ;
            animation-delay: 0.5s;
            animation-fill-mode:forwards;

        }
        .text2{
            position: absolute;
            
            font-size: 0.40625rem;
            width:100%;
            text-align: center;
            color: #666;
            animation: num3 2s ;
            animation-delay: 2s;
            animation-fill-mode:forwards;
            opacity: 0;
        }
        .text3{
            position: absolute;
            top: 4.921875rem;
            font-size: 0.40625rem;
            width:100%;
            text-align: center;
            color: #666;
            animation: num3 2s ;
            animation-delay: 2s;
            animation-fill-mode:forwards;
            opacity: 0;
        }
        @keyframes yuan
        {
            from {
               width: 0px;
                opacity: 0;
            }
            to {
                width:1rem;
                opacity: 1;
            }
        }
        @keyframes text1
        {
            from {
               top: -100%;
            }
            to {
                top:2rem;
            }
        }
        @keyframes text2
        {
            from {
                opacity: 0;
            }
            to {
                opacity: 1;
            }
        }
        .tiao{
            width:8.5rem;
            position: absolute;
            top: 9.2rem;
            left: 50%;
            margin-left: -4.25rem;
            animation: text2 2s ;
            animation-delay: 1.5s;
            animation-fill-mode:forwards;
            opacity: 0;
        }
        .niantie{
            width: 3.109375rem;
            position: absolute;
            top: 7.5rem;
            left: 60%;
            animation: text2 2s ;
            animation-delay: 1.5s;
            animation-fill-mode:forwards;
            opacity: 0;
        }
        .num3text{
            position: absolute;
            top: 3rem;
            font-size: 0.40625rem;
            width:100%;
            text-align: center;
            color: #666;
            animation: text2 2s ;
            animation-delay: 1.5s;
            animation-fill-mode:forwards;
            opacity: 0;
        }
        .num3text2{
            position: absolute;
            top: 3.6rem;
            font-size: 0.40625rem;
            width:100%;
            text-align: center;
            color: #666;
            animation: num3 2s ;
            animation-delay: 2s;
            animation-fill-mode:forwards;
            opacity: 0;
        }
    }
    .num3{
        .num3title{
            text-align: center;
            position: absolute;
            width: 100%;
            top: 2rem;
            font-size: 0.59rem;
            opacity: 0;
            animation: num3 1s ;
            animation-delay: 1s;
            animation-fill-mode:forwards;
            opacity: 0;
            background-color: #fff;
        }
        .num3text{
            position: absolute;
            top: 3rem;
            font-size: 0.40625rem;
            width:100%;
            text-align: center;
            color: #666;
            animation: text2 2s ;
            animation-delay: 1.5s;
            animation-fill-mode:forwards;
            opacity: 0;
        }
        .num3text2{
            position: absolute;
            top: 3.6rem;
            font-size: 0.40625rem;
            width:100%;
            text-align: center;
            color: #666;
            animation: num3 2s ;
            animation-delay: 2s;
            animation-fill-mode:forwards;
            opacity: 0;
        }
        @keyframes num3
        {
            from {
                opacity: 0;
                
            }
            to {
                opacity: 1;
                
            }
        }
        .shouji{
            position: absolute;
            bottom: 3.4rem;
            left:50%;
            margin-left: -3.4375rem;
            width: 6.875rem;
            animation: myfirst 1s;
        }
        .queren{
            width: 8.5625rem;
            position: absolute;
            left:50%;
            margin-left: -4.3125rem;
            bottom: -100%;
            animation: queren 2s ;
            animation-delay: 0.5s;
            animation-fill-mode:forwards;
        }
        .xiaoshou{
            width: 2.109375rem;
            position: absolute;
            right:0;
            bottom: 3.546875rem;
            animation: xiaoshou 2s ;
            animation-delay: 1s;
            animation-fill-mode:forwards;
            opacity: 0;
        }
        .huanhu{
            width:3.90625rem;
            position: absolute;
            left:0;
            bottom:-100%;
            animation: huanhu 2s ;
            animation-delay: 1.5s;
            animation-fill-mode:forwards;
        }
        .yuan3{
            width:1rem;
            position: absolute;
            left:50%;
            margin-left: -0.5rem;
            margin-top: 20px;
            animation: yuan 2s ;
            animation-delay: 0s;
            animation-fill-mode:forwards;
            opacity: 0;
        }
        @keyframes queren
        {
            from {

                bottom:-100%;
            }
            to {
               bottom: 3.446875rem;
            }
        }
        @keyframes xiaoshou
        {
            from {
                
                opacity: 0;
            }
            to {
               
                opacity: 1;
            }
        }
        @keyframes huanhu
        {
            from {
                bottom:-100%;
            }
            to {
                bottom: 0px;
            }
        }
        @keyframes yuan
        {
            from {
                width: 0px;
                opacity: 0;
            }
            to {
                width:1rem;
                opacity: 1;
            }
        }
    }

}

</style>
