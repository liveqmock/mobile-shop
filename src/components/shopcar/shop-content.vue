<template>
<div class="bg">
<header v-if="showCheckModel">
  <label class="mint-checklist-label">
    <span class="mint-checkbox">
      <input type="checkbox" class="mint-checkbox-input" v-model="checkAll"> 
      <span class="mint-checkbox-core"></span>
    </span> 
    <span class="mint-checkbox-label">全部商品</span>
  </label>
  <span class="delete" @click="deleteList">删除</span>
</header>
<div class="shaoCarList">
  <ul>
    <li  v-for='list in carlist' >
      <label class="mint-checklist-label">
        <span class="mint-checkbox">
          <input type="checkbox" class="mint-checkbox-input"  v-model="list.selected" > 
          <span class="mint-checkbox-core"></span>
        </span> 
      </label>
       <img class="goodImg" :src="list.thumb" @click="goParticulars(list)">
       <p class="goodName" @click="goParticulars(list)">{{list.name}}</p>
      <p class="goodMoney" @click="goParticulars(list)">
        <span class="Symbol" @click="goParticulars(list)">¥</span>&nbsp;
        <span class="money" @click="goParticulars(list)">{{list.price}}</span>&nbsp;&nbsp;&nbsp;
        <span class="fan" @click="goParticulars(list)">返银票 {{list.price}}</span>
      </p>
      <div class="btn-jj">
            <span class="left" @click.stop='addition(list,-1)'>-</span>
            <span class="num">{{list.goods_num}}</span>
            <span class="right" @click.stop='addition(list,1)'>+</span>
        </div>
    </li>
  </ul>
  <div id="mei" v-if="imgIsTrue">
    <img src="../../images/shop_car.png"></img>
  </div>
</div>
 <!-- <div class="shopCar-content">
   <div v-if="showCheckModel" class="quanxuandiv">
     <label class="mint-checklist-label" style="margin-left:0.1rem;margin-top:0.3125rem;" >
    <span class="mint-checkbox">
      <input type="checkbox" class="mint-checkbox-input"  v-model="checkAll">
      <span class="mint-checkbox-core"></span>
  </span>
  <span class="mint-checkbox-label" >
    全选 
  </span>
</label>
<span @click="deleteList" style="float: right;margin-right: 0.2rem;margin-top:0.3125rem;">删除</span>
 </div>
  <div id="mei" v-if="imgIsTrue">
    <img src="../../images/shop_car.png"></img>
  </div>
    <ul>
      <li v-for='list in carlist' >
        <div class="btn">
          <label class="mint-checklist-label" >
            <span class="mint-checkbox">
              <input type="checkbox" class="mint-checkbox-input"  v-model="list.selected">
            <span class="mint-checkbox-core"></span>
          </span>
        </label>
        </div>
        <div class="img" @click="goParticulars(list)">
          <img :src="list.thumb"  alt="">
        </div>
        <div class="shopTxet" @click="goParticulars(list)">
          <h1>{{list.name}}</h1>
          <span v-for="(value,key) in list.attr"></span>
          <p style="margin-top:0.2rem;">单价{{list.price}}元</p>
        </div>
        <div class="btn-jj">
          <div class="btn">
            <span @click='addition(list,-1)'>-</span>
            <span>{{list.goods_num}}</span>
            <span @click='addition(list,1)'>+</span>
          </div>
        </div>
        <span class="line"></span>
      </li>
    </ul>
    <div class="total" v-if="canShowItem">
      <div class="total-left">
        <span>合计：</span>
        <span>￥{{AllMoney?AllMoney.toFixed(2):0}}</span>
      </div>
      <div class="total-right">
        <span @click = "go_pay">去结算</span>
      </div>
    </div>
  </div> -->
  <div class="Total">
    <div class="Total-right" @click = "go_pay">
      <span>结算({{selectCount}})</span>
    </div>
    <div class="Total-info">
      <span>合计:</span>
      <span>¥&nbsp;{{AllMoney?AllMoney.toFixed(2):0}}</span>
    </div>
  </div>
</div>
</template>
<script >
import Vue from 'vue';
import {mapGetters, mapActions} from 'vuex';
import { MessageBox,Checklist,Indicator} from 'mint-ui';
Vue.component(Checklist.name, Checklist);
export default {
  data() {
    return {
      apiUrl: 'index/cartList',
      headers: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      carlist: [],
      imgIsTrue: false,
      canShowItem: true,
      showCheckModel: true,
      cart_id: ''
    }
  },
  computed: {
    // 设置全选
    checkAll: {
      get() {
        return this.selectCount == this.carlist.length;
      },
      set(val) {
        this.carlist.forEach(function(item) {
          item.selected = val;
        });
        return val;
      }
    },
    // 获取已经选中的商品数量
    selectCount: {
      get() {
        var selitemnum = 0;
        this.cart_id = '';
        for (var i = 0; i < this.carlist.length; i++) {
          let item = this.carlist[i];

          if (item.selected == 1) {
            selitemnum++;
           
            this.cart_id += item.cart_id + ','
          }
        }
        return selitemnum;
      }
    },
    // 计算总价，如果select ==1时选中
    AllMoney: {
      get() {
        if (this.carlist.length) {
          var goodAllmoney = 0;
     
          for (var i = 0; i < this.carlist.length; i++) {
            let item = this.carlist[i];
            if (item.selected == 1) {
              goodAllmoney += Number(item.goods_num) * Number(item.price);
            }
          }
          return goodAllmoney;
        }
      }
    }
  },
  created: function() {
    // 请求购物车接口
    this.getcarlist();
  },

  methods: {
    ...mapActions(['restCarnum']),
    // 获取购物车商品的列表
    getcarlist() {
      this.$http.get(this.apiUrl)
        .then((res) => {
          if (res.body.error == 0) {
            this.carlist = res.body.data;
            this.carlist.forEach(function(item, index) {
              // 库存为0
              if (item.stock == 0) {
                item.selected = false;
                item.goods_num = 0;
              }
              // 已经下架
              if (item.is_shelves == 1) {
                 item.selected = false;
                 item.goods_num = 0;
              }
            });
          }
          if (res.body.error == 99) {
             this.carlist = [];
             this.showCheckModel = false;
             this.imgIsTrue = true;
             this.canShowItem =false;
            return;
          }
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    // 去结算
    go_pay() {
      if (this.carlist.length ==0) {
         MessageBox('提示', "请选择需要购买的商品");
         return
      }
      // 判断商品库存，弹出提示
      var itemstock = '';
      // 判断商品下架 
       var itemshelves = '';
      for (var i = 0; i < this.carlist.length; i++) {
        var item = this.carlist[i];
        if (item.stock == 0 && item.selected == 1) {
          itemstock += item.name + ',' 
        }
        if (item.is_shelves == 1 && item.selected == 1) {
             itemshelves += item.name + ','
          }
      }
      if (itemshelves != '') {
        MessageBox('提示', itemshelves + "商品已经下架,请移除或者取消选中后购买");
        return
      }
     
      if (itemstock != '') {
        MessageBox('提示', itemstock + "已经没有库存了，请移除或者取消选中后购买");
        return
      }
      if (this.cart_id == '') {
        MessageBox('提示', '请选择需要购买的商品');
      } else {
        this.$router.push({
          name: 'surorder',
          params: {
            cartId: this.cart_id
          }
        })
      }
    },
    // 购物车删除提示框
    messagetip() {
      if (this.cart_id == '') {
         MessageBox.alert('请选择需要删除的商品')
         return  Promise.reject(false)
       }
      return MessageBox.confirm('您确定删除商品?').then(action => {
        return Promise.resolve('成功')
      }).catch((err) => {
        return Promise.reject(false)
      })
    },
    // 封装删除购物车的方法
    async deleteCargood() {
      let messageres = await this.messagetip().catch((err) => {
        console.log(err)
      });
      if (!messageres) {
        return Promise.reject(false)
      }

      // 更新购物车接口，type 1 删除 2 加减
      return this.$http.get('index/updateCart', {
          params: {
            type: 1,
            cartId: this.cart_id
          }
        })
        .then((data) => {
          return data
        })
    },
    // 删除选中的商品
    async deleteList() {
      let result = await this.deleteCargood().catch((err) => {
        console.log(err)
      });
      if (result && result.data.msg == '操作成功') {
        this.restCarnum()
        this.getcarlist()
      };
    },
    // 去详情
    goParticulars(list) {
      
      this.$router.push({
          name: 'prodetail',
          params: {
          prodetailId: list.goods_id,
          goodsAttrId:list.goods_attr_id
        }
      })
    },
    //加减法逻辑，参数为1是加，-1则是减
    addition(list, a) {
      // 判断库存
      if (list.stock == 0) {
        list.selected = 0;
        list.goods_num = 0;
        MessageBox('提示', '该商品已经没有库存了');
        return
      } 
      if (list.is_shelves == 1) {
        list.selected = 0;
        list.goods_num = 0;
        MessageBox('提示', '该商品已经下架');
        return
      }

      list.selected = 1;
      list.goods_num = Number(list.goods_num) + a;
      if (list.goods_num < 1) {
        list.goods_num = 1;
      } else if (list.goods_num > list.stock) {
        list.goods_num = list.stock;
      }

      this.$http.get('index/updateCart', {
          params: {
            type: 2,
            num: list.goods_num,
            cartId: list.cart_id
          }
        })
        .then((res) => {
          if (res.body.error == 0) {
            this.restCarnum()
          }
        })
        .catch(function(err) {
          console.log(err)
        });
    },
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
// .quanxuandiv{
//   background-color :#fff;
//   height: 1.09375rem;
//   border-bottom:1px solid #c9caca;
// }
// .bg{
//   background-color:#efeff0;
//   padding-bottom:4rem;
//   padding-top:0.3125rem;
// }

// .line{
//   display: block;
//   height: 1px;
//   width: 90%;
//   background-color:#c9caca;
//   position: absolute;
//   bottom:0;
//   margin-left: 5%;
// }
// label{
//   display: inline-block;
// }
// .mint-checklist-label{
//   padding: 0;
// }
// #mei{
//   width: 100%;
//   height: 6.25rem;
//   img{
//     width: 100%;
//   }
// }
// .shopCar-content{
//     padding: 0 0.3125rem 0;
//     margin-top: 1.140625rem;
//     border-left: 1px solid #dcdddd;
//     ul{
//       list-style: none;
//       padding:0;
//       margin: 0;
//       li{
//         height: 2.34375rem;
//         width: 100%;
//         padding: 0.15625rem 0;
//         background-color:#fff;
//         position: relative;
//         .btn{
//           width: 0.6875rem;
//           height: 100%;
//           text-align: center;
//           line-height: 1.9rem;
//           float: left;
//           img{
//             width: 0.28125rem;
//             height: 0.28125rem;
//             margin-left: 0.015625rem;
//           }
//         }
//         .img{
//           width: 2.03125rem;
//           height: 100%;
//           float: left;
//           margin-left: 0.2rem;
//           border: 1px solid #cecece;

//           img{
//             width: 100%;
//             height: 100%;
//           }
//         }
//         .shopTxet{
//           width: 4.453125rem;
//           height: 100%;
//           float: left;
//           text-align: left;
//           padding-bottom: 1.328125rem;
//           padding-left:0.18125rem;
//           h1{
//             font-size: 0.3125rem;
//             color: #666464;
//             display: block;
//             width: 110%;
//             height: 0.9rem;
//             line-height: 0.45rem;
//             overflow: hidden;
//             text-overflow: ellipsis;
//             display: -webkit-box;
//             -webkit-line-clamp: 2;
//             -webkit-box-orient: vertical;
//           }
//           span{
//             display: inline-block;
//             font-size: 0.25rem;
//             color: #b5b5b6;
//             margin-top: 0.12rem;
//           }
//           p{
//             color: #666464;
//             font-size: 0.3125rem;
//           }
//         }
//         .btn-jj{
//           width: 1.90625rem;
//           height: 100%;
//           float: left;
//           position: relative;
//           .btn{
//             width: 1.875rem;
//             height: 0.609375rem;
//             border:1px solid #858585;
//             position: absolute;
//             top: 50%;
//             margin-top: 0.296875rem;
//             left: 50%;
//             margin-left: -1.9375rem;
//             display: flex;
//             line-height: 0.55rem;

//             span{
//               flex:1;
//             }
//             span:nth-child(1){
//               border-right: 1px solid #858585;
//               flex:1;
//               font-size: 0.5rem;
//               background-color: #cccccc;
//               color: #fff;
//             }
//             span:nth-child(3){
//               border-left: 1px solid #858585;
//               flex:1;
//               font-size: 0.3rem;
//               background-color: #cccccc;
//                color: #fff;
//             }
//           }
//         }
//       }
     
//     }
//   }
//   .AllBtn{
//     display: inline-block;
//     width: 0.390625rem;
//     height: 0.390625rem
//   }
//   .header-bottom{
//     height: 0.625rem;
//     line-height: 0.625rem;
//     padding-left: 0.15rem;
//     img{
//       width: 0.28125rem;
//       height: 0.28125rem;
//       position: absolute;
//       left: 0.234375rem;
//       top: 50%;
//       margin-top:-0.140625rem;
//     }
//     span{
//       font-size: 0.21875rem;
//     }
//   }
//   .total{
//     padding: 0 0.3125rem;
//     position: fixed;
//     width: 10rem;
//     margin: 0 auto;
//     margin-bottom: 10px;
//     height:1.466667rem;
//     background-color: #fff;
//     bottom: 1.306667rem;
//     line-height: 1.875rem;
//     left: 0;
  
//     .total-left{
//       float: left;
//       padding-left:0.3125rem;
//       span{
//         font-size: 0.4375rem;
//         font-weight: bold;
//       }
//     }
//     .total-right{
//         float: right;
//       span{
//        padding:5px 1.5625rem;
//         vertical-align: middle;
        
//         width: 3.90625rem;
          
//         background-color: #77bc1f;
//         color: #fff;
//         font-size: 0.359375rem;
//         text-align: center;
      
        
//         border-radius:0.09375rem;
       
//         margin-right: 0.3125rem;
//       }
//     }
//   }
// 新改的地方
.bg{
    background-color: #f3f3f3;
    height: calc(100% - 1.390625rem);
    width: 10rem;
    margin:0 auto;
  header{
    height: 1.066667rem;
    border-bottom: 1px solid #DFDFDF;
    background-color: #FFF;
    line-height: 1.066667rem;
    position:relative;
    .mint-checkbox-label{
      font-family: PingFangSC-Regular;
      font-size: 0.346667rem;
      color: #7F7F7F;
      letter-spacing: 0;
    }
    .mint-checkbox-core{
        width: 0.48rem;
        height: 0.48rem;
      }
    .delete{
      position:absolute;
      right: 0.586667rem;
      top: 0;
      font-family: PingFangSC-Regular;
      font-size: 0.346667rem;
      color: #7F7F7F;
      letter-spacing: 0;
    }
  }
}
.shaoCarList{
  padding-bottom: 3rem;
 
  ul{
    list-style:none;
    margin:0;
    padding:0;
    li{
      background-color: #fff;
      height: 2.826667rem;
      position:relative;
      border-bottom: 1px solid #DFDFDF;
      label{
        position: relative;
        top: 1.186667rem;
      }
      .goodImg{
        height: 1.92rem;
        width: 1.92rem;
        margin-left: 1.146667rem;
        float: left;
      }
      .goodName{
        padding-left: 3.48rem;
        font-family: PingFangSC-Regular;
        font-size: 0.373333rem;
        color: #3C3C3C;
        letter-spacing: 0;
      }
      .goodMoney{
        padding-left: 3.48rem;
        display: block;
        margin-top: 0.893333rem;
        .Symbol{
          font-family: PingFangSC-Regular;
          font-size: 0.426667rem;
          color: #FF7300;
          letter-spacing: 0;
        }
        .money{
          font-family: PingFangSC-Regular;
          font-size: 0.426667rem;
          color: #FF7300;
          letter-spacing: 0;
        }
         .fan{
            font-family: PingFangSC-Regular;
            font-size: 0.266667rem;
            color:#BBBBBB;
            letter-spacing: 0;
          }
      }
    }
    .btn-jj{
        height:0.6rem;
        width:2.16rem;
        position:absolute;
        right: 0.24rem;
        bottom:0.426667rem;
        border: 1px solid #CDCDCD;
        border-radius: 0.04rem;
        .left{
          float: left;
          width: 0.573333rem;
          height: 0.586667rem;
          line-height: 0.586667rem;
          text-align: center;
          border-right:1px solid #CDCDCD;
          font-family: PingFangSC-Regular;
          font-size: 0.373333rem;
          color: #3C3C3C;
          letter-spacing: 0;
        }
        .right{
          float: right;
          width: 0.573333rem;
          height: 0.586667rem;
          line-height: 0.586667rem;
          text-align: center;
          border-left:1px solid #CDCDCD;
          font-family: PingFangSC-Regular;
          font-size: 0.373333rem;
          color: #3C3C3C;
          letter-spacing: 0;
        }
        .num{
          display: inline-block;
          text-align: center;
          line-height: 0.586667rem;
          width: calc(100% - 1.173333rem);
          font-family: PingFangSC-Medium;
          font-size: 0.373333rem;
          color: #3C3C3C;
          letter-spacing: 0;
        }
    }
  }
}
#mei{
  img{
    width: 100%;
    height: auto;
  }
}
.Total{
    position:fixed;
    bottom:1.390625rem;
    height:1.466667rem;
    width: 10rem;
    background-color: #FFF;
    .Total-right{
      float: right;
      width: 2.293333rem;
      height:1.466667rem;
      text-align: center;
      line-height: 1.466667rem;
      background-color: #FF7300;
      span{
        font-family: PingFangSC-Medium;
        font-size: 0.426667rem;
        color: #FFFFFF;
        letter-spacing: 0;
      }
    }
    .Total-info{
      float: right;
      height:1.466667rem;
      margin-right: 0.373333rem;
      line-height: 1.466667rem;

      span{
        font-family: PingFangSC-Regular;
        font-size: 0.453333rem;
        letter-spacing: 0;
      }
      span:nth-child(1){
         color: #3C3C3C;
      }
      span:nth-child(2){
         color: #FF7300;
      }
    }
  }
.mint-checkbox-input:checked + .mint-checkbox-core::after {
    border-color:#fff!important;
}
.mint-checkbox-input:checked + .mint-checkbox-core {
    background-color:  #FE7300;
    border-color:  #FE7300;
}
</style>
