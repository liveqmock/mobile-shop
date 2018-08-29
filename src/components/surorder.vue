<template>
  <div class="wrap-pag">
  	  <div class="cus-address" @click="toAddresslist">
            <p class="name-phone">
                <span>{{curentAddress.consignee}}</span>
                <span class="add-phone">{{curentAddress.tel}}</span>
            </p>
            <p class="the-add">{{curentAddress.province}}省{{curentAddress.city}}市{{curentAddress.area}}{{curentAddress.address}}</p>
        </div>
   
           <div class="buy-list">
           
            <div class="has-buy bt-border" v-for="good in goods">

              <div class="goodimg-left">
                <img :src="good.thumb" height="25" width="38" alt="">
               </div>
              <div class="good-info">
               <p class="good-name">{{good.name}}</p>
                
              </div>
              <div class="info-text">
              <ul>
                <li >￥{{good.price}}元</li>
                  
                  <li class="goods-num">x{{good.goods_num}}</li>
              </ul>
                 
               </div>
          </div>
          <!--  -->
           <p class="orderinfo-list " @click="showCouMehod" :class="{Couponclass:showCouponclass}">
                  <span>优惠抵扣</span>
                  <span class="blue">已经抵扣{{Number(cashCouponAmount)+Number(silverAmount)}}</span>
               </p>
          <div class="selecte-paytype"  v-show="showCouponlist">
             
             <div class="surorder-bge" v-if="cashCoupon!=0">
                <p class="sur-yinpiao" >
                    <span>点券:</span>
                    <span @click="cashAllUse" class="all-leave " :class="{hasSelect:isShowselct}"></span>
                    <span>全额</span>
                   <span class="use-money">（拥有点券{{cashCoupon>=10000?parseInt(cashCoupon/10000)+"万":cashCoupon}}元）</span>
                    <input v-model.number="cashCouponAmount" class="use-yinpiao" type="number" placeholder="自定义金额" >
                         
                 
                </p>
                
             </div>
              <div class="surorder-bge" v-if="silver_ticket!=0">
                <p class="sur-yinpiao">
                    <span>银票:</span>
                     <span @click="silverAllUse" class="all-leave" :class="{hasSelect:isShowselct1}"></span>
                      <span>全额</span>
                    <span class="use-money">（拥有银票{{silver_ticket>=10000?parseInt(silver_ticket/10000)+"万":silver_ticket}}张）</span>
                      <input v-model.number="silverAmount" class="use-yinpiao" type="number" placeholder="自定义金额" >
                </p>
                
             </div>
            </div>
            <!-- end -->
         <p class="orderinfo-list " @click="showInvoice=true">
                  <span>发票</span>
                  <span class="blue" >{{invoicetext}}</span>
               </p>

        </div>
         <!--  -->
         <div class="orderlist-bottom">
          <div class="order-info">
               <p class="orderinfo-tj ">
                  <span>订单金额</span>
                  <span class="blue">{{totalCost.toFixed(2)}}元</span>
               </p>
               <p class="orderinfo-tj ">
                 <span>商品金额</span>
                 <span>{{(totalCost-freight).toFixed(2)}}元</span>
              </p>
              <p class="orderinfo-tj " v-if="canshow">
                 <span>运费</span>
                 <span>{{freight}}元</span>
              </p>

            </div>
         </div>
             <p class="orderinfo-tj bz">
                  <span>备注信息</span>
                  <input v-model="userMessage" type="text" placeholder="请填写安全存放地址，按门铃配送等要求">
               </p>
               <p class="orderinfo-tj bz" >
                 <span>支付方式</span>

                  <i :class="{checked:wxpay}" @click="wxpay=!wxpay"></i>
                   <span class="wxpay-text">微信支付</span>
              </p>
         
          <div class="surorder-total">实付款:{{(totalCost-silverAmount - cashCouponAmount).toFixed(2).replace(/-/,'') }}&nbsp;元
          <span :class="{disable:canclickbtn}" @click="Settlement">立即支付</span>
        </div>
        <!-- 发票 -->
      <div class="invoice-content" v-if="showInvoice">
       <div class="invoice-header">
      <span>需要发票</span>
      <label data-v-306d2ed0="" class="mint-switch">
          <input type="checkbox" class="mint-switch-input" v-model="isInvoice"> 
          <span class="mint-switch-core"></span> 
          <div class="mint-switch-label"></div>
      </label>
    </div>
    <div class="invoice-info" v-if="isInvoice">
      <p>发票类型</p>
      <label class="mint-checklist-label">
        <span class="mint-checkbox"></span>
        <!-- <input type="radio" value="one" class="mint-checkbox-input"  >  -->
        <!-- <span class="mint-checkbox-core"></span></span>  -->
        <span class="mint-checkbox-label">普通发票</span>
      </label>
    
    </div>
    <div class="invoice-div" v-if="isInvoice">
      <p>发票抬头</p>
      <label class="mint-checklist-label">
        <span class="mint-checkbox">
        <input type="radio" class="mint-checkbox-input"  value="1" v-model="personalUnit"> 
        <span class="mint-checkbox-core"></span></span> 
        <span class="mint-checkbox-label">个人</span>
      </label>
      <label class="mint-checklist-label" style="margin-left:1.253333rem">
        <span class="mint-checkbox">
        <input type="radio" class="mint-checkbox-input" v-model="personalUnit" value="2"> 
        <span class="mint-checkbox-core"></span></span> 
        <span class="mint-checkbox-label">单位</span>
      </label>
      <input type="text" name="" placeholder="请输入单位名称" v-if="personalUnit=='2'" v-model="companyName">
    </div>
    
    <span class="submit" @click="saveInvoice">确定</span> 

</div>
  </div>

</template>

<script>

import {Toast,MessageBox} from 'mint-ui'
import Toptitle from './Toptitle.vue'
  export default {
     data(){
        return{
		  prodUrl:'index/productInfo',
		  addlistdUrl:'index/addressList',
      silverTicketUrl:'index/silverTicket',
      createOrderUrl:'index/createOrder',
      confirmOrderrUrl:'index/confirmOrder',
      cashCouponsUrl:'index/cashCoupons',
		    hasBrandname:true,
          goodsId:null,
          goodsAttrId:null,
          brand_name:null,
          showCouponlist:false,
          isShowselct:false,
          isShowselct1:false,
          spec:'',
          proname:'',
          price:null,
          goodsNum:null,
          backAddressID:null,
          useyinpiao:false,
          useyxianjin:false,
          silver_ticket:0,
          cashCoupon:0,
          cartId:'',
          userMessage:'',
          silverAmount:null,
          cashCouponAmount:null,
          totalCost:0,
          wxpay:true,
          showCouponclass:false,
          goods:[],
          curentAddress:{
          	 consignee:'',
          	 tel:'',
          	 province:'',
          	 city:'',
          	 area:'',
          	 address:'',
          	 id:'',
             freight:'',
             noaddress:false,
           
          },
          freight:'',
          canshow:true,
          canclickbtn:false,
          headers: {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        },
        isInvoice:false,
         personalUnit:'',
         companyName:'',
         showInvoice:false,
         invoicetext:'不需要发票'

      }
     },
     components: {
      Toptitle
  },

     created(){


      const ERRCODE = 0;
   
     // 非购物车进入显示
         
            this.goodsNum=this.$route.params.goodsNum;
            
            this.goodsId = this.$route.params.goodsId;
            this.goodsAttrId = this.$route.params.goodsAttrId;
        console.log(this.goodsNum,this.goodsId )
       // 如果是从地址列表返回来的
          this.backAddressID =  this.$route.params.backAddressID;

      // 获取默认地址
       	this.$http.get(this.addlistdUrl)
            .then((res) => {
                let adresslist = res.data.data;

                if(!adresslist){
                    this.noaddress =true;
                 this.$el.querySelector('.cus-address').innerHTML='新增地址';
                 this.$el.querySelector('.cus-address').style.textAlign='center' ;
                 this.$el.querySelector('.cus-address').style.lineHeight='2.8125rem';
                 this.$el.querySelector('.cus-address').style.fontSize= '0.5rem'

                }else{

                adresslist.forEach((address, index)=> {
                  //判断不是返回来的则backAddressID不存在
                 if(this.backAddressID == undefined){
                 	if(address.is_default == 0){
                		this.curentAddress= address;
                	   }else{
					            this.curentAddress=adresslist[0];
                	}
                }else {
                	// 判断backAddressID存在则是从地址列表返回来的
                	if (this.backAddressID == address.id) {
                		this.curentAddress= address;
                	}}
              });

        if(this.curentAddress.freight==0){
             this.canshow=false;
      };
    // 如果当前地址没有运费则按钮变灰
    if(this.curentAddress.freight==0||this.curentAddress.freight==''){
       this.canclickbtn =true;
     }
}

    // 判断是从新增地址返回的，则购物车id取路由参数
    if (this.$route.params.cartId) {
       this.cartId = this.$route.params.cartId.replace(/undefined/g,'');
    }else {
      this.cartId =0;
    }
    

   // 生成订单接口参数
       let  confirmdata = {
        cartId:this.cartId,
        goodsAttrId:this.goodsAttrId,
        goodsNum:this.goodsNum||1,
        addressId:this.curentAddress.id
      }

      console.log(confirmdata)
   
     // 访问生成订单接口
      this.$http.post(this.confirmOrderrUrl,confirmdata,this.headers)
            .then((res) => {
               console.log(res)
             
              let orderResult = res.data.data;

                this.totalCost = orderResult.totalCost;
                this.goods =  orderResult.goods;
                this.freight= orderResult.freight;
                if(this.freight == 0){
                  this.canshow=false;
                }


            })
            .catch(function(err) {
                console.log(err)
            })

            //end

             })
            .catch(function(err) {
                console.log(err)
            })

       // 获取用户银票金额
          this.$http.get(this.silverTicketUrl)
            .then((res) => {

              if (res.data.error===ERRCODE) {

                 let resultdata = res.data.data;

                 this.silver_ticket = resultdata.silver_ticket;
              }
            })
            .catch(function(err) {
                console.log(err)
            })
            // 获取用户现金券金额
          this.$http.get(this.cashCouponsUrl)
            .then((res) => {

              if (res.data.error===ERRCODE) {

                 let result = res.data.data;
                  this.cashCoupon = result.cash_coupons;


              }
            })
            .catch(function(err) {
                console.log(err)
            })

     },
     watch:{

      // 监听用户点击了微信支付
      wxpay(value,oldval){
        
        if(!value){

            var totalCoupon =  Number(this.silverAmount) + Number(this.cashCouponAmount);
            // 银票加点券不够按钮变灰
          if(totalCoupon<Number(this.totalCost)){
             this.canclickbtn =true;
          }
        }else{
           this.canclickbtn =false;
        }
      },
      // 监测用户输入的银票价格
        silverAmount:function (value,old) {
           if (typeof(value)=='number') {
              var  value = Number(value.toFixed(2))
            }
           this.silverAmount = value;
              // 判断银票加现金券是否可以等于总价
             var showWX = Number(this.totalCost) -Number(this.silverAmount)-Number(this.cashCouponAmount);
           if(showWX==0) {
            this.wxpay = false;

           }else{
             this.wxpay = true;
           }

          // 判断是否大于订单总金额
            var totalMoney = Number(this.totalCost) - Number(this.cashCouponAmount);
            totalMoney = totalMoney.toFixed(2);
         
            if (totalMoney<=0) {
              this.silverAmount = 0;
               return;
            }
            // 银票金额是否超过余额
            let big =  Number(value)>Number(this.silver_ticket);

           if (Number(value) >Number(totalMoney)) {
                this.silverAmount = totalMoney;
            }
           if(big){
              this.silverAmount = this.silver_ticket
           }
        },
        // 监测用户输入的现金券价格
        cashCouponAmount:function (value,old) {
          
            if (typeof(value)=='number') {
              var  value = Number(value.toFixed(2))
            }
            this.cashCouponAmount =value;
           
            // 判断银票加现金券是否可以等于总价
             var showWX = Number(this.totalCost) -Number(this.silverAmount)-Number(this.cashCouponAmount);

             if(showWX==0) {
                   this.wxpay = false;
                   this.canclickbtn=false;  //余额为0则显示可以付款按钮
              }else{
                this.wxpay = true;
               }

           // 判断是否大于订单总金额
           var totalMoney;
          // 如果银票的钱大于运费，现金券就不减去运费
            if(Number(this.silverAmount) >= Number(this.freight)){
                totalMoney = Number(this.totalCost) - Number(this.silverAmount);

            }else{
              totalMoney = Number(this.totalCost) - Number(this.silverAmount)-Number(this.freight);
            }

           totalMoney = totalMoney.toFixed(2);
            
            
           
            if (totalMoney<=0) {
               this.cashCouponAmount = 0;
               return;
            }else if (Number(value)>Number(totalMoney)) {

                this.cashCouponAmount = totalMoney;
            }
            //  现金券输入金额超过余额
            let big =  Number(value)>Number(this.cashCoupon);
            if(big){
                this.cashCouponAmount = this.cashCoupon;
            }

        }
    },
     methods:{
      // 保存发票的选项
      saveInvoice(){
        console.log(+this.isInvoice, '发票类型'+this.personalUnit,'公司名称'+this.companyName)
        if (this.isInvoice ==1) {
            if (this.personalUnit=='') {
                MessageBox.alert('请选择发票类型');
               return
            }
            this.invoicetext='需要发票'
        }else {
           this.invoicetext='不需要发票'
        }
         
        if (this.personalUnit ==2&&this.companyName=='') {
            MessageBox.alert('请填写单位名称');
            return
        }else {
          this.showInvoice=false;
        }
        
      },
      //显示优惠列表
      showCouMehod(){
        this.showCouponlist=!this.showCouponlist;
        this.showCouponclass = !this.showCouponclass;
      },
      // 点击是否使用现金券逻辑
      usecashCoupon(){
        this.useyxianjin =!this.useyxianjin;
        if(!this.useyxianjin){
          this.cashCouponAmount=null;
        }
      },
      useSlivert(){
        this.useyinpiao=!this.useyinpiao;
         if(!this.useyinpiao){
          this.silverAmount=null;
        }
      },
      // 全额使用现金券
      cashAllUse(){
        
           this.isShowselct =!this.isShowselct;
          if (!this.isShowselct) {
             this.cashCouponAmount='';
             return
          }

        //现金券使用的时候总金额-银券选择额度
          var needMoney;

        if(Number(this.silverAmount) >= Number(this.freight)){
                needMoney = Number(this.totalCost) - Number(this.silverAmount);
     
            }else{
              needMoney = Number(this.totalCost) - Number(this.silverAmount)-Number(this.freight);
            }
           needMoney = parseFloat(needMoney).toFixed(2);
         

        if (Number(this.cashCoupon)>=Number(needMoney)) {

            this.cashCouponAmount = needMoney;
            
         }else{
           this.cashCouponAmount = this.cashCoupon;
        }



  },
      silverAllUse(){
        this.isShowselct1 =!this.isShowselct1;
          if (!this.isShowselct1) {
             this.silverAmount='';
             return
          }
        //银券使用的时候总金额-现金券选择的额度
        var needMoney = Number(this.totalCost) - Number(this.cashCouponAmount);
        if (Number(this.silver_ticket)>=Number(needMoney)) {

            this.silverAmount = needMoney;
            this.canclickbtn =false;
        }else{
           this.silverAmount =this.silver_ticket;
        }
      },
      // 跳转到地址列表
       toAddresslist(){
          if(this.noaddress){

                this.$router.push({
                 name:'newaddress',
                 query: {
                  cartId:this.cartId,
                   goodsId:this.goodsId,
                  order:true,
                  goodsAttrId:this.goodsAttrId,
                  goodsNum:this.goodsNum
                }
              })
             
          }else {

             let AddressID = this.curentAddress.id
            this.$router.push({
                 name:'addresslist',
                 query: {
                  cartId:this.cartId,
                  AddressID: AddressID,
                  goodsId:this.goodsId,
                  order:true,
                  goodsAttrId:this.goodsAttrId,
                  goodsNum:this.goodsNum
                }
              })
          }
       	   
       },
       // 点击结算按钮生成订单
       Settlement(){
          if(this.noaddress){
              MessageBox.alert('你还没有选择地址');
              return
          }

          if(this.canclickbtn){
            return
          }

           if(!this.useyxianjin){
              this.cashCouponAmount =0;
           }
           if(!this.useyinpiao){
              this.silverAmount =0;
           }
          let data = {
            cartId:this.cartId,
            goodsAttrId:this.goodsAttrId,
            goodsNum:this.goodsNum||1,
            addressId:this.curentAddress.id,
            msg:this.userMessage,
            silverTicket:this.silverAmount,
            cashCoupons:this.cashCouponAmount,
            isInvoice:+this.isInvoice,
            invoiceType:1,
            personalUnit:this.personalUnit,
            companyName:this.companyName
         }
      
        this.$http.post(this.createOrderUrl,data,this.headers)
            .then((res) => {

               let data = res.data;

               if (data.error==0) {

               	  let orderID =data.data;
                  // console.log(res)
                   window.location.href='./poor/pay/orderSn/'+orderID;
               	  //this.$router.push({name:'paym',params: {orderID:orderID}})
               }else {
               	  Toast(data.msg);
               }
            })
            .catch(function(err) {
                console.log(err)
            })
       },
       // 返回首页
       returnIndex(){
          this.$router.push('/')
       }
     }

  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
li{
  list-style: none;
}
.slivert-bottom span.leftspan{
  margin: 0;
}
.blue{
  color: #77bc1f;
}
.wrap-pag{
 
    width: 10rem;
    margin: 0 auto;
    background-color: #efefef;
    height: 100%;
    overflow-y: scroll;
    padding-bottom: 2rem;
}
header{
  background-color: #fff;
}
.hasbd{
    border-bottom: 1px solid #aaabab;
    padding-bottom: 0.28125rem;
}
.surorder-bge{

  overflow: hidden;
}

.colorBlue{
    color: #347f97;

};
.orderinfo-list{
  position: relative;
    color: #909090;
    font-size: 0.4375rem;
    height: 1.173333rem;
    line-height: 1.173333rem;
    clear: both;
    border-bottom: 1px solid #F0F0F0;
    &.Couponclass:after{
       -webkit-transform: rotate(135deg);
    }

     &:after {
    content: '';
    position: absolute;
    right: 0.266667rem;
    top: 50%;
    transform: translate(0, -50%);
    margin-top: -4px;
    display: inline-block;
    border-right: 1px solid #878787;
    border-top: 1px solid #878787;
    height: 8px;
    width: 8px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}
    span:nth-child(1){
        float: left;
        margin-left: 0.4rem;
        font-size: 0.346667rem;
        color: #36383F;

    }
    span:nth-child(2){
        float: right;
        margin-right: 1.173333rem;
        font-size: 0.346667rem;
        color: #999999;
    }

}

.surorder-total{
  width: 100%;
  position: fixed;
  bottom: 0;
  text-indent: 0.65625rem;
 
  line-height: 1.173333rem;
  height: 1.173333rem;
  background: #fff;
  font-size: 0.46875rem;
   border-radius: 0.078125rem;
   font-weight: 400;
  span{
   float: right;
    width: 3.84rem;
    height: 1.173333rem;
    line-height: 1.173333rem;
   text-align: center;
    display: inline-block;
    font-size: 0.373333rem;
    background-color: #FF7300;
    color: #fff;
    &.disable{
      background:#999;
    }

  }

}
.clearfix{
  clear: both;
  overflow: hidden;
}
.cus-address{
  background-color: #fff;
  height: 1.68rem;
  position: relative;


}
.cus-address:before{
   position: absolute;
   left: 0.4rem;
   top: 50%;
   transform:translate(0,-50%);
   content:'';
   width: 0.426667rem;
   height: 0.56rem;
   display: inline-block;
   background: url(../images/dingwei.png);
   background-size: 100% 100%;
}

.cus-address:after{
  content:'';
  position: absolute;
    right: 0.266667rem;
    top: 50%;
    transform: translate(0, -50%);
    margin-top: -4px;
    display: inline-block;
    border-right: 1px solid #878787;
    border-top: 1px solid #878787;
    height: 8px;
    width: 8px;
    transform: rotate(45deg);
    -webkit-transform: rotate(45deg);
}

.cus-address p{
  margin-left:1.12rem;
}
.name-phone{
  padding-top: 0.266667rem;

   font-size: 0.32rem;
   color: #222222;
  span{
    display: inline-block
  }
}
.the-add{
  margin-top: 0.186667rem;
 font-size: 0.32rem;
color: #808080;

}
.add-phone{
  margin-left: 0.5rem;
}
.has-buy{
   position: relative;
  overflow: hidden;
  clear: both;
 padding-top:0.266667rem;




}

.good-name{
    font-size: 0.293333rem;
    color: #222222
}
.selecte-coupontype{
  height:1.5625rem;
   padding: 0 0.625rem;
   box-sizing:content-box;
   border-bottom: 0.3125rem solid #dcdddd;
   border-top: 0.3125rem solid #dcdddd;
  p{
    height: 0.78125rem;
    line-height: 0.78125rem;
    position: relative;
        border-bottom: 1px solid #f0f0f0;
    span{
      margin-left: 0.8125rem;

    }
  }
}
.selecte-coupontype img{
  position: absolute;
  display: inline-block;
  top: 50%;
  margin-top:-(0.390625rem/2);

  width: 0.59375rem;
  height: 0.390625rem;

}
.return-index {
  width: 3.90625rem;
  height: 0.65625rem;
  line-height:0.65625rem;
  margin: 0 auto;
   display: block;
   font-size: 0.4375rem;

    background-image: url(../images/navbg.png);
    background-size: 1px 0.78125rem;
    background-repeat: repeat-x;
    margin-top: 0.625rem;
    color: #fff;
    text-align: center;

    border-radius: 0.078125rem
}
.btborder{
   border-bottom: 1px solid #d3d3d4;
}
.bt-border{
  border-bottom: 1px solid #f0f0f0;

}
.buy-list{
 
  margin-top: 0.213333rem;
  background-color: #fff;
 padding-left: 0.4rem;
}
.selecte-paytype{

 border-bottom: 1px solid #F0F0F0;

     background-color: #fff;
     
  p{

    position: relative;
    width: 100%;
        height: 1.173333rem;
    line-height: 1.173333rem;
        padding-left: 0.4rem;
  }
  input.user-input{
    border:none;
     position: absolute;
     left: 1.9375rem;
    margin-left: 0.15625rem;
    font-size: 0.375rem;
    display: inline-block;
    width: 100%;
    height: 100%;
    outline:none;
    padding-right: 3.125rem;

  }
  img{
   position: relative;
   top:(1rem - 0.6875rem)/2;
    width: 0.6875rem;
   height:0.6875rem;
  }
  .wx-text{
     display: inline-block;
     font-size: 0.34375rem;
   
     &.user-tell{
      width: 1.78125rem;
       margin-left: 0;
     }
  }
}
.selecte-paytype,.selecte-coupontype{
  i{
     position: absolute;
    float: right;
    border: 1px solid #a0a0a0;
    display: inline-block;
    width: 0.390625rem;
    height: 0.390625rem;
    border-radius: 0.078125rem;
    margin-top:(1rem - 0.390625rem)/2 ;
   right: 0.234375rem;
    &.checked{
      border: none;
      background-image: url("../images/checked.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
  }
}
.sur-yinpiao{
  span{
    display: inline-block;
    line-height: 1.17333rem;
        vertical-align: middle;
  }
}
.use-yinpiao{
  position: absolute;
  right: 1.173333rem;
  top:50%;
  transform:translate(0,-50%);

  display:inline-block;
   border: none;
   padding-top: 2px;
 box-sizing:border-box;
  width: 2.08rem;
  height:0.666667rem;
  line-height:normal;
  border-radius:0.04rem;
  background-color: #f0f0f0;
  text-align: center;
  font-size: 0.28125rem;
  outline:none;

}
.surorder-yin-text{

   span{
    margin: 0;
    &:nth-child(1){
      color: #818181;
    }
    &:nth-child(2){
      float: right;
    }
  }
}
.suroder-freight{
  line-height: 0.75rem;
  font-size: 0.3125rem;
  border-bottom: 1px solid #818181;
  margin: 0 0.125rem;
  span{
    margin: 0;
    &:nth-child(2){
     float: right;
    }
  }
}
.goodimg-left{
  float: left;
  margin-left: 0.46875rem;
  position: relative;
  width: 1.333333rem;
  height: 1.333333rem;

  img{
    width:100%;
    height: 100%;

  }
}
.good-info{
  width: 6.0625rem;
  position: relative;
  float: left;
  height: 1.71875rem;
  margin-left:0.2rem;
}
.info-text{
   position: absolute;
  top: 0.266667rem;
  right: 0.4rem;
  font-size: 0.32rem;
  color: #BDBDBD;
  li{
    text-align: right;
  }
}
.orderlist-bottom{
  overflow: hidden;
  background-color: #fff;
}
.goods-num{
  
}
.total-price{

  padding: 0.9375rem 0;
  text-align: right;
  margin-right: 0.5625rem;
  font-size: 0.4375rem;

}
.order-info{
  float: right;
   padding: 0.78125rem 0 1.0625rem 0 ;
  padding-right: 1.173333rem;

  background-color: #fff;
}
.orderinfo-tj{
  position: relative;
  background-color: #fff;
   height: 1.173333rem;
   line-height: 1.173333rem;
   &.bz{
    margin-top: 0.213333rem;
    input{
      display: inline-block;
      width: 6.933333rem;
      height: 0.48rem;
    }
   }


     span:nth-child(1){
         float: left;
        width: 1.866667rem;
        text-align: right;
        margin-left: 0.4rem;
        font-size: 0.346667rem;
        color: #36383F;
        margin-right: 0.613333rem;

    }
    span:nth-child(2){
        float: right;
        font-size: 0.373333rem;
        color: #999999;
    }
    i{
      position: absolute;
      float: right;
     border: 1px solid #a0a0a0;
    display: inline-block;
    width: 0.533333rem;
    height: 0.466667rem;
    border-radius: 0.078125rem;
    margin-top: 0.30469rem;
    right: 2.0rem;
      &.checked{
      border: none;
      background-image: url("../images/wxpay.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
    }
    }
}
.wxpay-img{
    margin-left: 0.375rem;
}
.slivert-bottom{

    margin: 0.8125rem 0 1.40625rem 0;
    height: 0.71875rem;
    line-height: 0.71875rem;
    position: relative;

    span,input{
      
        float: left;
        margin: 0 0.078125rem;
    }
    .right-input{
      overflow: hidden;
        height:0.6875rem;
        line-height:0.6875rem;
        position: absolute;
        right: 0;
        top: 0;
    }
}
.all-leave{
  display: inline-block;
  margin-left: 0.4rem;
  background-image: url("../images/counoselect.png");
    width: 0.48rem;
    height:0.48rem ;

  background-size: 100%;
 
    
    text-align: center;
    &.hasSelect{
      background-image: url("../images/couselect.png");
    }
    
}
.use-money{
   margin-left: 0.133333rem;
   font-size: 0.293333rem;
   color: #999;
}
.wxpay-text{
  float: right;
  margin-right: 0.286667rem;
}
// 发票
.invoice-content{
   position: fixed;
   height: 100%;
  z-index: 2;
  top:0;
  background: #fff;
}
.invoice-header{
  height: 1.173333rem;
  width: 10rem;
  background-color: #FFF;
  line-height: 1.173333rem;
  padding-left: 0.373333rem;
  span{
    font-family: PingFangSC-Regular;
    font-size: 0.346667rem;
    color: #333333;
    letter-spacing: 0;
  }
  label{
    float: right;
    margin-top: 0.24rem;
    margin-right: 0.306667rem;
  }
}
.wrap-page{
  background-color: #eee;
}
.invoice-info{
  width: 10rem;
  height: 2.386667rem;
  background-color: #FFF;
  margin-top: 0.266667rem;
  border:0.013333rem solid #fff;
  p{
    font-family: PingFangSC-Regular;
    font-size: 0.346667rem;
    color: #666666;
    letter-spacing: 0;
    padding-left:0.373333rem;
    margin-top: 0.36rem;
  }
  label{
    margin-top: 0.533333rem;
    float: left;
    padding:0;
    margin-left: 0.32rem;
    .mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #FE7300;
    border-color: #FE7300;
    }
    .mint-checkbox-label{
      font-family: PingFangSC-Regular;
      font-size: 0.346667rem;
      color: #333333;
      letter-spacing: 0;
    }
  }
}
.invoice-div{
 
  width: 10rem;
  background-color: #FFF;
  margin-top: 0.266667rem;
  border:0.013333rem solid #fff;
  overflow: hidden;
  padding-bottom:0.466667rem;
   p{
    font-family: PingFangSC-Regular;
    font-size: 0.346667rem;
    color: #666666;
    letter-spacing: 0;
    padding-left:0.373333rem;
    margin-top: 0.36rem;
  }
  label{
    margin-top: 0.533333rem;
    float: left;
    padding:0;
    margin-left: 0.32rem;
    .mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #FE7300;
    border-color: #FE7300;
    }
    .mint-checkbox-label{
      font-family: PingFangSC-Regular;
      font-size: 0.346667rem;
      color: #333333;
      letter-spacing: 0;
    }
  }
  input{
    height:0.8rem;
    width: 9.28rem;
    background: #F0F0F0;
    outline: none;
    margin-left: 0.36rem;
    margin-top: 0.4rem;
    border:none;
    font-family: PingFangSC-Regular;
    font-size: 0.346667rem;
    color: #999999;
    letter-spacing: 0;
  }
}
.submit{
  position:fixed;
  bottom:0;
  height:1.173333rem;
  width:10rem;
  text-align: center;
  line-height: 1.173333rem;
  background-color:#FE7300;
  font-size: 0.426667rem;
  color:#fff;
  font-family: PingFangSC-Regular;
}

.mint-switch-input:checked + .mint-switch-core {
    border-color: #FF7300;
    background-color: #FF7300;
}
</style>
