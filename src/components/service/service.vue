<template>
<div class="wrap-page">
 <toptitle :msg='parentMsg'></toptitle>
  <div class="top-one">
      <span class="snow">*</span>
      <span class="lefttext">申请服务</span>
      <span class="last-text">{{servertext}}</span>
  </div>
  <div class="line-fr"></div>
   <div class="top-one posr" @click="showQ">
      <span class="snow">*</span>
      <span class="lefttext1">{{serversreason}}</span>
      <span class="last-text1" >{{reason}}</span>
      <span class="right-se"> <img src="../../images/btn-xiangxia.png" ></span>
      <div class="list"  v-show="showlist">
          <ul>
              <li @click.stop="savetext(text)" v-for="text in texts">{{text}}</li>  
          </ul>
      </div>

  </div>
    <div class="toplast">
      <span class="snow">*</span>
      <span class="num-r" >{{severtext}}</span>
      <input v-model="goodsSum" class="num-se">
      <!-- <span class="s-money">退款金额 <i>￥16.88</i></span> -->
</div>
   <p class="n-text" >(输入希望退款的产品数量，系统会为您核算退款金额)</p>
   <div class="area-box posr">
      <div class="moretext" v-show="showmoretext">最多200字</div>
       <textarea v-model="comment" @click="showmoretext=false" :placeholder="servicemsg" ></textarea>
   </div>
   <div class="imgbox">
     <div class="item">
          <img v-for="phsimg in localIds" :src="phsimg"> 
          <img @click="setphoto" src="../../images/photo.png" >
     </div>
   </div>
   <p class="phot0-text"><span>上传凭证<br>(最多3张)</span></p>
   <div class="bo-box">
       <span class="reindex" @click="returnindex">返回首页</span>
       <span class="sumbtn" @click="service">提交申请</span>
   </div>
</div>
</template>

<script >
 import Toptitle from './../Toptitle.vue';
 import { MessageBox } from 'mint-ui';
 export default {
  data() {
    return {
      afterOrderGoodsurl:'index/afterOrderGoods',
      afterSaleurl:'index/afterSale',
      showmoretext:true,
      servicemsg:'退货说明',
      parentMsg:'申请退货',
      severtext:'退货件数',
      serversreason:'请选择退货原因',
      showlist:false,
      texts:['描述与商品不符','发错货了','收到产品数量不对或破损','拍错/多拍/不喜欢','其他'],
      reason:'商品数量不对',
      comment:'',
      localIds:[],
      serverId:[],
      goodsSum:'',
      resgoodnum:0,
      servicetype:1,
       headers: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      }
    }

  },
  components: {
      Toptitle
  },
  watch:{
    goodsSum(val,old){
      if (val>= this.resgoodnum) {
         this. goodsSum = this.resgoodnum; 
      }
    }
  },
  created() {
       this.servicetype = this.$route.params.servicetype;
    switch(this.servicetype){
        case 1:
         this.servertext = '退货退款';
         this.parentMsg='申请退货';
         this.servicemsg='退货说明';
         this.serversreason='请选择退货原因';
         this.severtext='退货件数';
        break;  
        case 2:
        this.servertext = '仅退款';
        this.parentMsg='申请退款';
        this.servicemsg='退款说明';
        this.serversreason='请选择退款原因';
         this.severtext='退款件数';
        break;
        case 3:
        this.servertext = '换货';
        this.parentMsg='申请换货';
        this.servicemsg='换货说明';
        this.serversreason='请选择换货原因';
        this.severtext='换货件数';
        break;
        default:
         this.servertext = '退货退款';
         this.parentMsg='申请退货';
         this.servicemsg='退货说明';
         this.serversreason='请选择退货原因';
         this.severtext='退货件数';
    }
     // 获取订单数据
     this.$http.get(this.afterOrderGoodsurl, {params:{
        orderSn: this.$route.params.orderSn,
        goodsId:this.$route.params.goodsId,
        goodsAttrId:this.$route.params.goodsAttrId

      }})
      .then((res) => {
  
         if (res.body.error == 0) {
            this.resgoodnum = res.body.data.goods_sum;
            
            
         }
      })
      .catch(function(err) {
        console.log(err)
      })
    
  },
  methods: {  
  // 显示选择原因列表
   showQ(){
    this.showlist = !this.showlist ;
   },
   // 选择原因
   savetext(item){
      this.showlist=false;
      this.reason = item;
   },
   // 上传图片
   setphoto(){
      var vm = this;
     wx.chooseImage({
        count: 3, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function(res) {

          var localIds = res.localIds;
          vm.uploadimg(localIds);

         
        }
      });
   },
   uploadimg(localIds){
      var vm  =this;
      var localId = localIds.pop();
          vm.localIds.push(localId);
      wx.uploadImage({
            localId:localId,
            isShowProgressTips: 1,
            success: function(res) {
             var  serverId = res.serverId;
              vm.serverId.push(serverId);
              if(localIds.length > 0){
                 vm.uploadimg(localIds);
              }
            }
          });
    },
   // 提交申请
   service(){
    
    if (this.goodsSum=='') {
          MessageBox.alert('请填写商品件数');
          return;
       }else if (this.comment =='') {
          MessageBox.alert('请填写说明');
          return;
    }else if (this.comment.length>200) {
          MessageBox.alert('说明不能超过200字');

          return;
    }
    this.$http.post(this.afterSaleurl, {
         orderSn: this.$route.params.orderSn,
         goodsId:this.$route.params.goodsId,
         goodsAttrId:this.$route.params.goodsId,
         comment:this.comment,
         type:this.servicetype,
         num:this.goodsSum,
         reason:this.reason,
         picId: this.serverId
      }, this.headers)
      .then((res) => {
       console.log(res)
        if (res.body.error == 0) {
            MessageBox.alert('提交成功，请等待审核').then(action => {
                    this.$router.push('/')
             })
         }else{
             MessageBox.alert(res.body.msg)
         }
      })
      .catch(function(err) {
        console.log(err)
      })
   },
   // 返回首页
   returnindex(){
    this.$router.push('/')
   }
 }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
ul,li{
    list-style: none;
}
.moretext{
    width: 2rem;
    left:50%;
    margin-left: -1rem;
    text-align: center;
    position: absolute;
    padding-top: 0.21875rem;
    font-size: 0.3125rem;
    color: #000
}
.posr{
    position: relative;

}
.list{
   z-index: 100;
    padding: 0.3125rem 0;
    background: #fff;
    position: absolute;
    width: 8.75rem;
    left: 0.3125rem;
      top:  0.64rem;
      border: 1px solid #dcdddd;
      li{
        font-size: 0.4375rem;
        color: #000;
        text-align: center;
        height: 0.875rem;
        line-height: 0.875rem;
      }    
}
  .wrap-page{
    background: #efeff0
  }
  header{
    background-color: #fff
  }
  .n-text{
    padding-top: 0.234375rem;
      width: 9.375rem;
  color: #aaabab;
  font-size: 0.3125rem;
    margin: 0 auto;
    text-indent:  0.34375rem;
  }
  .top-one{
    
    box-sizing: border-box;
    width: 9.375rem;
    height: 0.6875rem;
    margin: 0 auto;
    margin-top: 0.34375rem;
    background-color: #fff;
    border: 1px solid #d4d4d4;
    border-radius: 0.15625rem;

  }
  .snow{
    width: 0.3125rem;
    display: inline-block;
     height: 0.6875rem;
     line-height:0.6875rem;
     color: #ff0000;
     margin-left: 0.34375rem;
  }
  .lefttext{
      display: inline-block;
    width: 1.5625rem;
     height: 0.6875rem;
     line-height:0.6875rem;
    font-size: 0.375rem;
    color: #9fa0a0;
  }  
  .lefttext1{
       display: inline-block;
       width: 2.8rem;
       height: 0.6875rem;
       line-height:0.6875rem;
      font-size: 0.375rem;
      color: #9fa0a0;
  }

  .last-text{
    text-align: center;
      display: inline-block;
    width: 6.8rem;
     height: 0.6875rem;
     line-height:0.6875rem;
    font-size: 0.3125rem;
    color: #000;
  }
  .last-text1{
    text-align: center;
      display: inline-block;
    width: 5rem;
     height: 0.6875rem;
     line-height:0.6875rem;
    font-size: 0.3125rem;
    color: #000;
  }
  .line-fr{
    width: 9.375rem;
    height: 1px;
    margin: 0 auto;
    margin-top: 0.34375rem;
    background-color:#aaabab
  }
  .right-se{
    position: absolute;
    right:0.28125rem;
     display: inline-block;
     height: 0.6875rem;
     line-height:0.6875rem;
  }
  .toplast{
      box-sizing: border-box;
    width: 9.375rem;
    height: 0.6875rem;
    margin: 0 auto;
    margin-top: 0.34375rem;
    span{
        display: inline-block;
        line-height:0.6875rem; 
         height: 0.6875rem;
    }
   
  }
  .num-r{
    font-size: 0.375rem;
    color:#9fa0a0
  }
  .num-se{
    margin-left: 0.15625rem;
    width: 2.96875rem;
    height: 0.6875rem;
    line-height: 0.6875rem;
    outline: none;
    border-radius: 0.15625rem;
    border:1px solid #aaabab;
    text-align: center
  }
  .s-money{
    color: #666464;
    font-size: 0.3125rem;
    margin-left: 1rem;
    i{
        font-style: normal;
        color: #347f97
    }
  }
  .area-box{
     width: 9.375rem;
   
    margin: 0 auto;
    margin-top: 1.25rem;
    textarea{
        padding: 0.21875rem 0;
        width: 100%;
        height: 4.375rem;
        border-radius: 0.15625rem;
        border: 1px solid #8d8d8d;
        text-indent: 0.625rem;
        font-size: 0.375rem;
        outline:none;
    }
  }
  .item{
    float: right;
  }
  .imgbox{

    overflow: hidden;
      width: 9.375rem;
   
    margin: 0 auto;
    margin-top: 0.21875rem;
    img{
        margin-left: 0.15625rem;
        float: left;
        display: block;
        width: 1.5625rem;
        height: 1.5625rem;
    }
  }
  .phot0-text{
       width: 9.375rem;
   color: #c9caca;
   overflow: hidden;
   margin: 0 auto;
   font-size: 0.3125rem;
   span{
    display: block;
    width:1.5625rem;
    float: right;
    text-align: center;
   }
    
  }
  .bo-box{
    background: #efeff0;
    margin-top: 20px;
    display: flex;
     justify-content: space-around;
     text-align: center;
     padding-bottom: 0.266667rem;
    span{
        display: inline-block;
        width: 3.90625rem;
        height: 0.65625rem;
        line-height: 0.65625rem;
        text-align: center;
    }
  }
.reindex{
    box-sizing: border-box;
   background: #fff;
   font-size:0.4375rem;
   color: #77bc1f;
   border: 1px solid #aaabab;
   border-radius: 0.125rem;
}
.sumbtn{
    box-sizing: border-box;
   background: #77bc1f;
   font-size:0.4375rem;
   color: #fff;
   border: 1px solid #aaabab;
   border-radius: 0.125rem;
}
</style>
