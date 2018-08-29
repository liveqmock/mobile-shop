<template>
<div class="coupon">
  <header class="coupon-header">
    <ul>
      <li v-for="(text,index) in textlis" @click="showcoulist(index)">
        <span  class="text1 "   :class="{hasselect:active==index}" >{{text}}</span>
      </li>
      
    </ul>
  </header>
    <div class="offthestocks">
      <div class="xin-list "  :class ="{notime:hasnotime}" v-for="(key,val) in contentlisst">
        <div class="info">
          
           <span class="coupon-mon" :class ="{notime:hasnotime}">￥{{key.denomina}}元</span>
            <p class="coupon-p">聚美优品优惠券</p>
            <p class="coupon-p2">有效期{{key.create_time | shijian}}</p>

        </div>
        <div class="cou-right">
             <span class="num">15</span>
             <span class="text1">银票</span>
             <span class="text2">未使用</span>
          </div>
      </div>
  
   
</div>

</div>
</template>
<script >
import Vue from 'vue'
export default {
  data(){
    return{
     
      textlis:['已兑换','已过期'],
      active:0,
      contentlisst:[],
      conten:[],
      hasnotime:false
    }
  },
  methods:{
   showcoulist(index){
      this.active=index;
      if (index==1) {
        this.hasnotime=true
        // this.contentlisst =[]
      }else {
        this.contentlisst =this.conten; 
        this.hasnotime=false
      }
      console.log(index)
   }
   
  },
  created(){
    this.$http.get('index/userPointList')
      .then((data) => {
        this.conten = data.data.data;
        this.contentlisst= this.conten;
        console.log( data)
       
      })
      .catch(function(err) {
        console.log(err)
      })
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
  background-color:#efeff0;
  clear: both;
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
     
      width: 2.133333rem;
      text-align: center;
      line-height: 1.2rem;
      font-size: 0.373333rem;
     
      &.hasselect{
         border-bottom:0.066667rem solid #f3941a;
          color:#f3941a;
      }
    }
    

      }
    }
  }
}
.offthestocks{
  padding-bottom:0.3125rem;
  margin-top: 1.2rem;
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
    &.notime{
      
       background-image: url(../images/notimec.png);
       background-size: 100% 100%;
    }
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
    &.notime{
      color: #666;
    }
   }
   .coupon-p{
      margin-top: 0.213333rem;
      font-size: 0.426667rem;
      color: #858585;
    }
    .coupon-p2{
      margin-top: 0.466667rem;
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
// .over{
//   overflow: hidden;
// }
// .overSrcol{
//   overflow: auto;
// }

//   .headers{
//     height: 0.984375rem;
//     width: 100%;
//     padding: 0 0.3125rem;
//     span{
//       display: block;
//       line-height: 0.984375rem;
//       height: 0.984375rem;
//       width: 100%;
//       text-align: center;
//       font-size: 0.390625rem;
//       color: #909090;
//       border-bottom: 1px solid #c9caca;
//     }
//   }
//   .content-list{
//     padding-bottom: 2.1875rem;
//   }
//   .content-header{
//     height: 0.98125rem;
//       padding: 0 0.3125rem;
//       position: fixed;
//       width: 10rem;
//       ul{
//         height: 100%;
//         width: 100%;
//         display: flex;
//         list-style: none;
//         margin: 0;
//         padding: 0;
//         margin-top: 0.125rem;
//         border-bottom: 1px solid #ff0000;
//         li{
//           flex:1;
//           text-align: center;
//           margin-top: 0.11rem;
//           span{
//             font-size: 0.21875rem;
//             width: 90%;
//             display: inline-block;
//           }
//           .border{
//             border-bottom: 3px solid #ff0000;
//           }
//           img{
//             display: block;
//             width: 0.4375rem;
//             height: 0.390625rem;
//             margin: 0 auto;
//           }
//         }
//     }
//   }
//   .list-lie{
//     height: 2.34375rem;
//     width: 100%;
//     padding: 0 0.3125rem;
//     .kuai{
//       height: 100%;
//       width: 100%;
//       border:1px solid #cecece;
//       overflow: hidden;
//       div{
//         float: left;
//       }
//       .kuai-img{
//         width: 2.34375rem;
//         height:100%;
//         padding: 0.3125rem;
//         img{
//           width: 100%;
//           height: 100%;
//         }
//       }
//       .kuai-text{
//         width: 2.96875rem;
//         padding: 0.3125rem;
//         height: 100%;
//         p{
//           font-size: 0.25rem;
//            color: #666464;
//         }
//         h1{
//           font-size: 0.453125rem;
//           color: #666464;
//         }
//       }
//       .kuai-type{
//         width: 2.5rem;
//         height: 100%;
//         padding: 0.3125rem 0;
//          p{
//           font-size: 0.25rem;
//            color: #666464;
//         }
//         h1{
//           font-size: 0.453125rem;
//           color: #666464;
//         }
//       }
//       .btnsumit{
//         width: 1.51rem;
//         height: 100%;
//         p{
//           display: inline-block;
//           height: 1.71875rem;
//           width: 0.625rem;
//           background-color: #b2b2b2;
//           color: #fff;
//           margin-top: 0.3125rem;
//           margin-left: 0.3125rem;
//           padding-top: 0.390625rem;
//         }
//       }
//     }
//   }
//   .orderFooter{
//     height: 2.015625rem;
//     width:10rem;
//     margin: 0 auto;
//     margin-top: 0.3125rem;
//     span{
//       display: block;
//       height: 0.703125rem;
//       width: 3.90625rem;
//       text-align: center;
//       line-height: 0.703125rem;
//       font-size: 0.40625rem;
//       color: #fff;
//       background-color: #ff0000;
//       margin: 0 auto;
//       border-radius: 0.15625rem;
//     }
//   }
//   .orderContent{
//     margin-top: 0.984375rem;
//     padding-top: 0.9375rem;
//     padding-left: 0.3125rem;
//     padding-right: 0.3125rem;
//   }
//   .orderContentHeader{
//     height: 1.25rem;
//     border-bottom: 1px solid #c9caca;
//     line-height: 1.25rem;
//     span{
//       font-size: 0.34375rem;
//     }
//     span:nth-child(2){
//       float: right;
//     }
//   }
//   .adressInfo{
//     height: 2.8125rem;
//     width: 100%;
//     padding-top: 0.4375rem;
//     ul{
//       list-style: none;
//       margin: 0;
//       padding:0;
//       li:nth-child(1){
//         span{
//           font-size: 0.359375rem;
//           color: black;
//         }
//         span:nth-child(2){
//           float: right;
//           color: black;
//         }
//       }
//       li{
//         font-size: 0.28125rem;
//         color: #9fa0a0;
//       }
//       li:nth-child(2){
//         margin-top: 0.26875rem;
//       }
//       li:nth-child(3){
//         margin-top: 0.26875rem;
//       }
//     }
//   }
//   .foodsContent{
//     height: 2.65625rem;
//     padding: 0 0.3125rem;
//     background-color: #efeff0;
//     padding-top: 0.15625rem;
//     .foodsContentImg{
//       width: 100%;
//       height: 2.34375rem;
//       border:1px solid #cecece;
//       display: flex;
//       div{
//         flex:1;
//       }
//       div:nth-child(1){
//         img{
//           width: 2.03125rem;
//           height: 2.03125rem;
//           margin-left: 0.203125rem;
//           margin-top: 0.15625rem;
//         }
//       }
//       div:nth-child(2){
//         span{
//           display: block;
//           font-size: 0.25rem;
//           color: #b5b5b6;
//           margin-top: 0.25rem;
//         }
//         span:nth-child(1){
//           font-size: 0.4375rem;
//           color: black;
//           margin-top: 0.20625rem;
//         }
//         span:nth-child(2){

//         }
//       }
//     }
//     div:nth-child(3){
//       p{
//         display: block;
//         width: 0.78125rem;
//         height: 2.015625rem;
//         border:1px solid #8d8d8d;
//         float: right;
//         margin-top: 0.15625rem;
//         text-align: center;
//         padding-top: 0.546875rem;
//         color: #9fa0a0;
//       }
//     }
//   }
//   .goodsContentInfo{
//     padding: 0 0.3125rem;
//     .InfoTitle{
//       height: 1.25rem;
//       width: 100%;
//       margin-top: 0.15625rem;
//       line-height: 1.25rem;
//       span{
//          font-size: 0.34375rem;
//       }
//       span:nth-child(2){
//         float: right;
//       }
//       .infoContent{
//           padding: 0 0.703125rem;
//           height: 1.5625rem;
//          ul{
//           list-style: none;
//           margin: 0;
//           padding: 0;
//           border-top: 1px solid #c9caca;
//           li{
//             height: 1rem;
//             overflow: hidden;
//             span{
//               font-size: 0.25rem;
//             }
//           }
//           li:nth-child(1){
//             span{
//               font-size: 0.359375rem;
//             }
//           }
//           li:nth-child(4){
//             span{
//               font-size: 0.34375rem;
//             }
//           }
//            li:nth-child(5){
//             margin-top: -0.46875rem;
//             span{
//               font-size: 0.21875rem;
//               color: #a6a7a7;
//             }
//            }
//          }
//       }
//     }
//   }
//   .affirmOrder{
//     height: 3.125rem;
//     width: 100%;
//     text-align: center;
//     padding-top: 0.625rem;
//     p:nth-child(1){
//       font-size: 0.359375rem;
//       color: #000000;
//     }
//      p:nth-child(2){
//       padding-top: 0.46875rem;
//       font-size: 0.484375rem;
//       color: #000000;
//     }
//   }
//   .OrderPay{
//     span{
//       display: block;
//       width: 3.90625rem;
//       height: 0.703125rem;
//       text-align: center;
//       line-height: 0.703125rem;
//       background-color: #ff0000;
//       border-radius:0.078125rem;
//       margin: 0 auto;
//       font-size: 0.390625rem;
//       color: #fff;
//     }
//   }
//   .offthestocks{
//     padding: 0.3125rem;
//     width: 100%;
//     clear: both;
//     background-color:#efeff0;
//     .list-div:nth-child(1){
//       margin-top: 0;
//     }
//     .list-div{
//       height: 2.34375rem;
//       background-color: #fff;
//       margin-top: 0.3125rem;
//       border-bottom: 1px solid #eee;
//       .div-left{
//         width: 2.34375rem;
//         height: 2.34375rem;
//         float: left;
//         img{
//           height: 0.78125rem;
//           width: 2.34375rem;
//           margin-top: 0.625rem;
//         }
//         p{
//           margin-top: 0.15625rem;
//           text-align: center;
//           color: #666464;
//         }
//       }
//       .div-right{
//         width: 7.03125rem;
//         height: 2.34375rem;
//         float: left;
//         .top{
//           height: 1.40625rem;
//           border-bottom: 1px dashed #dcdddd;
//           padding-top: 0.1rem;
//           .diamonds{
//             display: inline-block;
//             width: 1.375rem;
//             height: 0.515625rem;
//             line-height: 0.515625rem;
//             text-align: center;
//             color: #fff;
//             font-size: 0.25rem;
//             background-color: #95d7e5;
//             border-radius: 0.078125rem;
//             margin-left: 0.3125rem;
//           }
//           .explain{
//             display: inline-block;
//             font-size: 0.3125rem;
//             margin-left: 0.3125rem;
//           }
//           p{
//             display: inline-block;
//             margin-left: 0.3125rem;
//             margin-top: 0.15625rem;
//             font-size: 0.359375rem;
//             color: #666464;
//           }
//         }
//         .bottom{
//           width: 100%;

//          span{
//           display: inline-block;
//           text-align: center;
//           height: 0.75rem;
//           width: 3.28125rem;
//           border-radius: 0.15625rem;
//           background-color: #95d7e5;
//           line-height: 0.75rem;
//           color: #fff;
//           font-size: 0.421875rem;
//           margin-left: 0.15625rem;
//           margin-top: 0.078125rem;
//          }
//         }
//       }
//     }
//   }
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
</style>
