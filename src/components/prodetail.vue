<template>
 <div class="wrap-page-i">
     <div class="porbanner">
      <banner :autoTime="autoTime" :swiperSlides="swiperSlides" :showInd="showInd"></banner> 
     </div> 
      <div class="detail-text"  >
            <p class="name">【爆款】{{proname}}</p>
            <p class="spec">{{desc}}</p>
            <p class="prodetail-pricke">
                <span class="good-price">￥{{price}}</span> 
                <span class="return_silver">返还银票{{return_silver_ticket}}</span> 
            </p>
             <p class="kucu-pro"><span>已售：{{sold_num}}件</span><span>库存：{{stock}}件</span></p>
       </div>
        <p class="prodetail-area">
          <span class="prodetail-origin">产地：{{origin}}</span>
          <span class="prodetail-promotion">{{promotion}}</span>
        </p>
       <div class="comment-r">
         <p class="d-comment" v-cloak @click="tocomment">
            <span>商品评价({{commmetNumber}})</span>
            <span class="wb_arrow"></span>
         </p>
         <div class="comment-container" v-show="commmetNumber!=0">
            <p class="coment-score">评分：</p>
            <p class="coment-text1">这个商品很好这个商品很好这个商品很好这个商品很好这个商品很好这个商品很好这个商品很好这个商品很好这个商品很好这个商品很好这个商品很好这个商品很好这个商品很好这个商品很好</span>
         </div>
       </div>
       <!-- 热门商品 -->
        <div class="hot-good">
          <p class="hottitle">猜你喜欢</p>
          <div>
            <ul>
              <li>
                <div class="hot-imgbox">
                  <img src="../images/addn.png" height="41" width="41" alt="">
                </div>
                <p class="hot-goodname">蛋糕</p>
                <p class="hot-goodprice">￥12.00</p>
              </li>
               
            </ul>
          </div>
        </div>
        <!-- <div class="show-describe">继续上拉查看图文详情</div> -->
       <!-- 商品图文描述 -->
        <div class="pro-describe"  v-html="info">
      </div>
         <div class="detail-bottom">
           <router-link to="/">
           <span class="b-small one">
              <img class="indexicon" src="../images/bnav1s.png" alt="">
            </span>
              <span class="nav-text">首页</span>

          </router-link>
           <router-link to="/shopcar">

            <span class="b-small two">
                 <b v-if="shopcarTotal!=0" :class="{bigclass:showBigNum}">{{shopcarTotal}}</b>
                <img class="shoacaricon" src="../images/bnav4.png" alt="">
                
            </span>
                <span class="nav-text">购物车</span>

            </router-link>
            <a href="javascript:0" @click='add'>
            <span class="b-small one">
              <img class="addicon" src="../images/addiocn.png" alt="">
            </span>
             <span class="nav-text">加入购物车</span>

            </a>
            <a href="javascript:0" >
            <span class="sure-mli" @click='showSelcetNumMt'>立即购买</span>
            </a>
       </div>


       <div class="annimateimg" :class="{move:isAnnimate}"><img :src="defaultAnnimateImg" alt=""></div>
       <div class="sn-box" v-show="showSelcetNum">
             <img @click="showSelcetNum=false" class="close-sn" src="../images/snclose.png" alt="">
              <div class="sn-con">
                <div class="showtip-right">
                  <p class="sn-proname">{{proname}}</p>
                  <p class="snpric">
                    <span class="the-oneprice">￥{{price}}</span>
                    <span class="re-sliver">返还银票{{return_silver_ticket}}</span>
                  </p>
                </div>
                <div class="show-tostimg">
                <img :src="defaultAnnimateImg" alt="">
              </div>
            </div>
            <div class="sn-numr">
                <span>购买数量</span>
                <div class="redu-box-pro"> 
                  <span class="redu-good" @click="goodsNum>1?goodsNum--:goodsNum"  alt="">-</span>
                  <span class="good-b-num">{{goodsNum}}</span>
                  <span class="add-good" @click="goodsNum<stock?goodsNum++:goodsNum">+</span>
                </div>
            </div>
           <div @click="generateOrder" class="sn-buy">立即购买</div>
        </div>
 </div>

</template>

<script>
import Vue from 'vue'
import { Toast, MessageBox } from 'mint-ui';
import Banner from './index/Banner.vue'
import Toptitle from './Toptitle.vue'
import {mapGetters,mapActions,mapState} from 'vuex'
export default {
  data() {
    return {
       commmentUrl:'Shop/index/evaluationList',
      prodUrl: 'index/productInfo',
      introduceUrl: 'index/productDesciption',
      addcarUrl: 'index/setCart',
      cartNumUrl: 'index/cartNum',
      headers: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      proname: '',
      spec: '',
      price: '',
      swiperSlides: null,
      info: null,
      goodsId: null,
      goodsAttrId: null,
      attr_goods_attr_id:'',
      attr_value:'',
      goodsNum:1,
      origin:'',
      promotion:'',
      desc:'',
      isAnnimate:false,
      defaultAnnimateImg:'',
      commmetNumber:'',
      showBigNum:false,
      autoTime:5000,
      showInd:false,
      return_silver_ticket:'',
      showSelcetNum:false,
      stock:'',
      sold_num:''
    }

  },
  components: {
    Toptitle,
   
    Banner
  },
   computed: {
    ...mapState({
         shopcarTotal:function(state) {
           if (state.carnum > 9||state.carnum=='99+') {
                this.showBigNum =true;
           }
             return state.carnum
         }
    })
  
  },
  created: function() {
    // 获取购物车总商品数量
     this.restCarnum();
     this.goodsId = this.$route.params.prodetailId;
     this.goodsAttrId =  this.$route.params.goodsAttrId;

     // 获取评论

     this.$http.get(this.commmentUrl,{params:{goodsId:this.goodsId}})
            .then((res) => {
                  console.log(1)
                  console.log(res)
               if(res.body.error==0){

                this.commmetNumber = res.body.data.length;

               }else {
                 this.commmetNumber=0;
             }

            })
            .catch(function(err) {
                console.log(err)
            })

    let data = {
      params: {
        goodsId: this.goodsId,
        goodsAttrId: this.goodsAttrId
      }
    }


    this.$http.get(this.prodUrl, data)
      .then((res) => {
        console.log(res)
       let lastres = res.data.data;
        this.origin = lastres.origin;
        this.desc = lastres.desc;
        this.promotion = lastres.promotion;
        this.proname = lastres.name;
        this.sold_num = lastres.sold_num
        //规格价格默认显示第一个
        let phda = lastres.pdata[0];

        this.spec = phda.attr_value;
        this.return_silver_ticket=phda.return_silver_ticket
        this.price = phda.price;
        this.stock = phda.stock;
        this.goodsAttrId = phda.goods_attr_id,

          // 轮播图图片
        this.swiperSlides = lastres.pic;
        if (this.swiperSlides&&this.swiperSlides.length>1) {
          this.showInd=true;
        }
        if (this.swiperSlides) {
          this.defaultAnnimateImg = lastres.pic[0].pic;
         }



      })
      .catch(function(err) {
        console.log(err)
      })
      // 商品图文介绍接口
    this.$http.get(this.introduceUrl, {
        params: {
          goodsId: this.goodsId
        }
      })
      .then((res) => {
        if (res.body.error == 0) {
          let inres = res.data.data;
         this.info = inres.info;
        }
        


      })
      .catch(function(err) {
        console.log(err)
      })


  },
  methods: {
     ...mapActions(['restCarnum']),
     showSelcetNumMt(){
       if(this.stock!=0){
         this.showSelcetNum = true;
      }else {
        Toast({
              message: '库存不足',
              position: 'center',
              duration: 1000
           });
      }
      
     },
    
    // 添加购物车
    add: function() {
    if (this.stock ==0) {
        Toast({
              message: '库存不足',
              position: 'center',
              duration: 1000
           });
       return
    }
      this.$http.get(this.addcarUrl, {
          params: {
            goodsId: this.goodsId,
            goodsNum: this.goodsNum,
            goodsAttrId: this.goodsAttrId
          }
        })
        .then((res) => {
         if(res.body.error==0){
            this.restCarnum();
            this.isAnnimate=true;

            setTimeout(()=>{
               this.isAnnimate=false;
             }, 500);
           
         }else{

          Toast({
              message: res.body.msg,
              position: 'bottom',
              duration: 1000
           });
            
         }

        })
        .catch(function(err) {
          console.log(err)
        })
    },
    tocomment() {
      if(this.commmetNumber==0){
          return;
      }
      this.$router.push({
        name: 'comment',
        params: {
          goodsId: this.goodsId,
          isGood:true
        }
      })
    },
    //点击购买跳转到订单页
    generateOrder() {
      this.$router.push({
        name: 'surorder',
        params: {
           cartId: 0,
          goodsAttrId: this.goodsAttrId,
          goodsNum: this.goodsNum,
          goodsId: this.goodsId
         
        }
      })
    }
  }
}
 
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss"  rel="stylesheet/scss" >
 .wb_arrow{
            position: absolute;
               right: 0.32rem;
               top:50%;
               transform:translate(0,-50%);
               
               display: inline-block;
                border-right: 1px solid #878787;
                border-top: 1px solid #878787;
                height: 8px;
                width: 8px;
                transform: rotate(45deg);
                -webkit-transform: rotate(45deg);
                
            }
.wrap-page-i{
  background-color: #f3f3f3;
  height: auto;
  padding-bottom: 2rem;
}

img.close-sn{
  width: 0.76rem;
  height: 0.76rem;
  position: absolute;
  right:20px;
  top:-0.38rem;
}
.sn-con{
   position: relative;
  height: 3.52rem;
  padding: 0 0.28125rem;
  
}
.showtip-right{
  position: absolute;
  right: 0;
  bottom: 0;
  width: 5.4rem;
}
.sn-box{
  width: 10.0rem;
  height: 6.8rem;
  position: fixed;
  bottom: 0;
  z-index: 4;
  background-color: #fff;
 
}
.show-tostimg{
  width: 4.0rem;
  height: 4.0rem;
  position: absolute;
  left: 0.32rem;
  top:-20px;
 img{
  width: 100%;
  height: 100%;
 }
}
.snpric{
  font-size: 0.375rem;
  color: #666464;
.the-oneprice{
  font-size: 0.426667rem;
  color: #FF7300;
}
 .re-sliver{
  font-size: 0.293333rem;
  color: #666666;
  margin-left: 16px;
 }
}
.sn-t{
  position: relative;
   border-top: 1px solid #e6e6e6;
  margin-top: 0.46875rem;
  margin-bottom: 0.75rem;
  height: 2.71875rem;
}
.sn-buy{
  font-size: 0.4rem;
  width: 100%;
  position: absolute;
  bottom: 0;
 text-align: center;
 color: #fff;
 font-size: 0.5rem;
 height: 1.173333rem;
 line-height: 1.173333rem;
 background: #FF7300;
}
.sn-proname{
  overflow: hidden;
  padding-right: 0.625rem;
text-overflow:ellipsis;
white-space: nowrap;
  margin-left: 2px;
  height: 40px;
  line-height: 40px;
  font-size: 0.46875rem;
  
}
.sn-numr{

   border-top: 1px solid #ddd;

  position: relative;
  font-size: 0;
  margin-top: 0.4rem;
   padding: 0 0.4rem;
   color: #666;
   height: 0.693333rem;
   line-height: 0.693333rem;
  padding-top: 0.4rem;

  img,span{
    display: inline-block;
  }

  .redu-good,.add-good,.good-b-num{
   
    background-size: 100%;
    font-size: 0.373333rem;
    text-align: center;
    line-height:0.640625rem ;

  }

  .redu-good{
    width: 0.8rem;
   
  }
  span:nth-child(1){
    font-size: 0.4rem;
  }
  .good-b-num{
    width: 1.16rem;
    border-left: 1px solid #cdcdcd;
    border-right: 1px solid #cdcdcd;

   text-align: center;
   line-height: 0.640625rem ;
   

  }
  .redu-box-pro{
    width: 2.853333rem;
    border: 1px solid #cdcdcd;
    border-radius: 3px;
    position: absolute;
    top:0.4rem;
    right: 20px;
    span{
      float: left;
      text-align: center;
       &.add-good{
       float: right;
       width: 0.8rem;
    

  }
    }
  }
}
img{
  max-width:100%;
  height: auto;
}

.prodetail-pricke{
  .good-price{
    margin-left: 0.4rem;
    font-size: 0.48rem;
    color: #FF7300;
  }


 
}
.rsl{
  position: relative;
  
   &.r{
    padding: 0;
    margin-top: 5px;
    .r-sliver{
      float: left;
    }
   }

.r-sliver{

  float: right;
  color:#ff0000;
   clear: both;
  font-size: 0.46875rem;
   overflow: hidden;
   height: 0.46875rem;
   line-height:0.46875rem;
  span:nth-child(1){
      display: inline-block;
    width: 0.4375rem;
    margin-right: 4px;
   
    img{
         position: relative;
         top: 0.03125rem;
         display: inline-block;
         max-width: 100%;
         height: auto;
       }
  }
  span:nth-child(2){
    margin-top: 0.078125rem;
       display: inline-block;
       height: 0.46875rem;
       line-height:0.46875rem ;
       vertical-align: top;
    font-size:0.3125rem ;
  }
}
}

 .mint-swipe-indicator.is-active{
  background-color: #FF7300!important;
  opacity: 0.8;
 }
.gray{
  width: 100%;
  height: 1.40625rem;
  background: #dcdddd;
}

 html{
  -webkit-text-size-adjust:none;
  text-size-adjust:none
 }
.annimateimg{
  position: fixed;
  bottom: 4rem;
  left:6rem;
  width: 2rem;
  height:2rem;
  border-radius:50%;
  overflow: hidden;
  background-color: #eee;

  opacity: 0;
  text-align: center;

  &.move{
    animation:mymove .5s;
    -webkit-animation:mymove .5s;
    opacity: 1;

}
  img{
 display: inline-block;
 width: 2rem;
  height:2rem;

  }
}
@keyframes mymove
{
  0%{
     -webkit-animation-timing-function: ease-in-out;
    animation-timing-function:ease-in-out;
    opacity: 100;
  }
  80%{
     -webkit-animation-timing-function: ease-in-out;
    animation-timing-function:ease-in-out;
     opacity: 100;
  }
  100%{
     -webkit-animation-timing-function: ease-in-out;
    animation-timing-function:ease-in-out;
    bottom: 0;
    opacity: 0;
    left: 1.96875rem;
    transform:scale3d(0.5,0.5,0.5);
  }
}
@-webkit-keyframes mymove /* Safari and Chrome */
{
 0%{
   -webkit-animation-timing-function: ease-in-out;
    animation-timing-function:ease-in-out ;
    opacity: 100;
  }
  50%{
     -webkit-animation-timing-function: ease-in-out;
    animation-timing-function:ease-in-out;
     opacity: 100;
  }
  100%{
     -webkit-animation-timing-function: ease-in-out;
    animation-timing-function:ease-in-out;
    bottom: 0;
    opacity: 0;
    left: 1.96875rem;
    transform:scale3d(0.5,0.5,0.5);
  }
}

.prodetail-area{
  margin: 20px 0;
  color: #36383F;
  width: 10.0rem;
  height: 0.853333rem;
  background-color: #fff;
  line-height: 0.78125rem;
  font-size: 0.293333rem;
}

.btn-box{
  overflow: hidden;
  clear: both;
}
.porbanner{
  width: 10.0rem;
  height: 10.0rem;
  margin: 0 auto;
 

}
.mint-swipe-item img{
  width: 100%;
  height: 100%;
 }
.detail-text{
   padding: 10px 0;
  background-color: #fff;
  font-size: 0.4375rem;
 margin-top: 0.266667rem;
   p{
    &.name{
     
      margin-left: 0.533333rem;
      line-height: 0.56rem;
      font-size: 0.4rem;
      color: #222;


    }
      &.spec{
        margin-left: 0.426667rem;
        font-size:0.32rem;
        height: 0.506667rem;
        line-height: 0.506667rem;
        color: #FF7300;
        margin-top: 10px;
      }
   }
.return_silver{
  color: #666;
  font-size: 0.293333rem;
  margin-left: 0.32rem;
  }
}
.prodetail-pricke{
  margin-top: 0.066667rem;
}
.kucu-pro{
  margin-top: 20px;
  margin-left: 0.4rem;
  font-size: 0.32rem;
  color: #808080;
  span:nth-child(2){
    margin-left: 20px;
  }
}
.prodetail-origin{
  margin-left: 0.375rem;
}

.prodetail-promotion{
  float: right;
  margin-right: 0.375rem;

}
.comment-r{
  width: 100%;
    background-color: #fff;
    padding-bottom: 0.133333rem;
    border-bottom: 1px solid #E0E0E0;
}
.d-comment{

  position: relative;
  padding-top: 0.133333rem;
  margin-left: 0.4rem;
  color: #666;
  font-size: 0.3125rem;

  font-size: 0.346667rem;
  color: #36383F;
  height: 32px;
  line-height: 32px;
    span{
      // float: right;
    }
}

.coment-text1,.coment-score{
  font-size: 0.293333rem;
  color: #808080;
  margin-left: 0.4rem;
}
.coment-score{
  margin-top: 0.133333rem;
  margin-bottom: 0.08rem;
}

.pro-describe{
    width: 9.6875rem;
    margin:0 auto;
    margin-top: 0.46875rem;
    margin-bottom: 1.875rem;
    overflow: hidden;
    img{
      width:100%!important;
      height: auto !important;
    }
}


.detail-bottom{
  font-size: 0;
  display: flex;
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1.3125rem;
a{
  border-right: 1px solid #EBEBEB;
  box-sizing:border-box;
  flex:1;
  height: 1.3125rem;
  text-decoration: none;
  color: #000;
  background-color: #fff;
   position: relative;
}
span{
  
  font-size: 0.373333rem;

}

}
.sure-mli{
  text-align: center;
  color: #fff;
  display: inline-block;
  background: #FF7300;
  width: 3.84rem;
  line-height: 1.3125rem;
}
.detail-bottom span.nav-text{
  width: 100%;
  position: absolute;
  font-size: 0.266667rem;
  color: #5D5F6B;
  bottom: 2px;
  text-align: center;
}
.addicon{
  width: 0.426667rem;
  height: 0.426667rem;
}
.b-small{
  position: relative;
  display:flex;
  flex-direction:column;
  align-content: center;
  align-items: center;
  width: 1.96875rem;
  background-color: #fff;
  padding-top: 0.09375rem;
 
  &.two{
    border: none;
    position: relative;
    b{

        width: 0.390625rem;
        height: 0.390625rem;
        line-height:0.25rem ;
        text-align: center;
        top: 0.0625rem;
        left: 1.125rem;
        background: #FF7300;
        color: #fff;
        text-align: center;
        line-height: 0.390625rem;
        border-radius: 50%;
        position: absolute;
        text-decoration: none;
        font-size: 12px;
        &.bigclass{
          width: 0.65rem;
          border-radius: 0.3125rem;
        }
    }
  }
 img{
     margin-top: 0.125rem;
 }
 i{
  font-style: normal;
  font-size: 0.28125rem;
  line-height: 0.4375rem;
  color: #000;
 }
       .indexicon{
          width: 0.506667rem;
          height: 0.466667rem;
       }

      .shoacaricon{
       width: 0.466667rem;
        height: 0.48rem
      }
  
  

     
    
}
.b-big{
  width: ((10rem-1.96875rem*2)/2);
  line-height: 1.3125rem;
  
  text-align: center;
   color: #fff;
   &.a{
       box-sizing:border-box;
        background-color: #fff;
        color: #77bc1f;
    }
     &.b{
      width: 1.946667rem;
     background-color: #77bc1f;
     color: #fff;
    }
}
 .swiper-wrapper{
  position: absolute;
  top:0

  }
  .swiper-box.box2{
    margin-top: 0;
    height: (9.375rem/2);
  }
      .swiper-box.box2 img {
     width: 100%;
     height: (9.375rem/2);

  }
   .swiper-item {
    height: 100%;
    text-align: center;
    font-size: 18px ;
    background: #fff;
    /* Center slide text vertically */
    display: -webkit-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    -webkit-justify-content: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    -webkit-align-items: center;
    align-items: center;
  }
  .spec-select{
    margin-top: 0.2rem;
    width: 4rem;
    height: 0.6rem;
    text-indent: 0;
    text-align: center;
    float: right;
  }
 .btnss{
        display: inline-block;
    border: 0.015625rem solid #858585;
    margin-left: 0.734375rem;
    overflow: hidden;
     height: 0.609375rem;
    float: right;

    b{
     text-align: center;
     line-height:0.609375rem ;
    height: 0.609375rem;
    width: 0.609375rem;
     margin-bottom: 2px;
     outline:none;
     float: left;
     background-color: #ccc;
     color: #fff;
    &:nth-child(1) {
          border-right: 1px solid #858585;
       }
        &.right{
            border-left: 1px solid #858585;
        }

    }
    input{
      float: left;
      height: 0.609375rem;
    width: 0.609375rem;
    border: none;

    text-align: center;
    }
  }
// 热门商品
.hot-good{
overflow: hidden;
  li{
    list-style: none;
    width: 2.133333rem;
    float: left;
    margin-left: 0.133333rem;
  }
  padding: 0 0.4rem 20px;
  background-color: #fff;
  .hottitle{
    padding: 10px 0;
    font-size: 0.293333rem;
    color: #36383F;
  }
  .hot-imgbox{
    width: 2.133333rem;
    height: 2.133333rem;
    img{
      width: 100%;
      height: 100%;
    }
  }
  .hot-goodname{
    padding: 10px 0;
    text-align: center;
    font-size: 0.293333rem;
    color: #666;
  }
  .hot-goodprice{

    text-align: center;
    font-size: 0.293333rem;
    color: #FF7300 ;
  }
}
.show-describe{
  margin-top: 20px;
    height: 1.333333rem;
    line-height: 1.333333rem;
    text-align: center;
    background-color: #fff;
}

</style>
