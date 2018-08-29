<template>
<div class="wrap-page">
    <div class="list-content">
      <ul>
        <li v-for="(address,index) of addressList"  @click="rebackOrder(address)">
 
        <label class="mint-checklist-label"   >
          <span class="mint-checkbox">
            <!-- <input type="checkbox" class="mint-checkbox-input" value="选项B"> -->
             <!-- <span class="mint-checkbox-core"></span> -->
          </span> 
          <span class="mint-checkbox-label"></span></label>
          <div class="list-content-div">
              <p class="userinfo"><span class="name">{{address.consignee}}</span> <span class="phone">{{address.tel}}</span></p>
              <p class="address-con">{{address.province}}{{address.city}}{{address.area}}{{address.address}}</p>
          </div>
          <img class="modify" @click='tobianji(address,$event)' src="../images/adress-img.png">
        </li>
      </ul>
    </div>
     
     <div class="adress-footer">
        <span @click='toadd'>新增地址</span>
      </div>
</div>
</template>

<script>
 import { MessageBox } from 'mint-ui';
import Toptitle from './Toptitle.vue'


 export default {
  data() {
    return {
      addlistdUrl: 'index/addressList',
      deladdressUrl: 'index/delAddress',
      addressList: [],
      AddressID: null,
      goodsId: '',
      goodsAttrId: '',
      goodsNum:''
    }

  },
  components: {
      Toptitle
  },
  created() {

    this.goodsId = this.$route.query.goodsId;
    this.goodsAttrId = this.$route.query.goodsAttrId;
     this.goodsNum=this.$route.query.goodsNum;
    
    this.$http.get(this.addlistdUrl)
      .then((res) => {
        this.addressList = res.data.data;
       
        //获取立即购买传过来的地址id
        this.AddressID = this.$route.query.AddressID;
        this.addressList.forEach((address, index) => {
          if (this.AddressID == address.id) {
              this.$set(address, 'sel', true)
            }
        });
      })
      .catch(function(err) {
        console.log(err)
      })
  },
  methods: {
    // 删除地址
    deladdress(index, address) {
      MessageBox.confirm('确定执行此操作?').then(action => {
        let id = address.id;
        this.$http.get('index/delAddress', {
            params: {
              addressId: id
            }
          })
          .then((res) => {
            console.log(res)

          })
          .catch(function(err) {
            console.log(err)
          })
        this.addressList.splice(index, 1);
      }).catch(() => {
        return
      })
    },
     // 跳转到编辑页面
    tobianji(address,event){
      event.stopPropagation()
          let cartId = this.$route.query.cartId;
          let goodsAttrId = this.$route.query.goodsAttrId;

          this.$router.push({ name: 'addressedit', query: {address: address.address, addressId:address.id,area:address.area,cartId:cartId,consignee:address.consignee,goodsNum:this.goodsNum,goodsAttrId: goodsAttrId,goodsId: this.goodsId,isDefault:address.is_default,order:this.$route.query.order,provinceId:address.province_id, tel:address.tel}});

    },
    //
    toadd() {
      let goodsAttrId = this.$route.query.goodsAttrId;
      let cartId = this.$route.query.cartId;
      let goodsNum= this.$route.query.goodsNum;
      // 如果是从确认订单进去的则添加参数
      this.$router.push({
        name: 'newaddress',
        query: {
          cartId: cartId,
          order: this.$route.query.order,
          goodsId: this.goodsId,
          goodsAttrId: goodsAttrId,
          goodsNum:goodsNum
        }
      })
    },
    // 如果是从确认订单列表进入则点击返回确认订单
    rebackOrder(address) {
      if (!this.$route.query.order) {
        return
      }
     
        let backAddressID = address.id;
      let goodsAttrId = this.$route.query.goodsAttrId;
      let cartId = this.$route.query.cartId;
      let  goodsNum =this.$route.query.goodsNum;
      this.$router.push({
        name: 'surorder',
        params: {
          cartId: cartId,
          backAddressID: backAddressID,
          goodsId: this.goodsId,
          goodsAttrId: goodsAttrId,
          goodsNum:goodsNum
        }
      })
    
      
    }
  }
 }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

.mint-checkbox-input:checked + .mint-checkbox-core {
    background-color: #FF7300;
    border-color: #FF7300;
}



.list-content{
  li.adressBge{
    border-bottom: 1px solid #000;
  }
  height: calc(100% - 1.173333rem);
  overflow-y:scroll;
  background-color: #eee;
  ul{
    list-style: none;
    margin:0;
    padding:0;
    li{
      height: 1.466667rem;
      background-color: #FFF;
      margin-top: 0.213333rem;
      position:relative;
      label{
        float: left;
        padding:0;
        margin:0;
        margin-top: 0.493333rem;
        margin-left: 0.32rem;
      }
      .modify{
        height: 0.44rem;
        width: 0.44rem;
        position:absolute;
        right: 0.8rem;
        top: 0.546667rem;
      }
      .list-content-div{
        height: 100%;
        margin-left: 1.613333rem;
        .userinfo{
          font-family: PingFangSC-Regular;
          font-size: 0.32rem;
          color: #222222;
          letter-spacing: 0;
          padding-top:0.146667rem;
        }
        .address-con{
          font-family: PingFangSC-Regular;
          font-size: 0.32rem;
          color: #999999;
          letter-spacing: 0;
          line-height: 0.506667rem;
          margin-top: 0.146667rem;
        }
      }
    }
    li:nth-child(1){
      margin-top: 0;
    }
  }
}
.adress-footer{
  position: fixed;
  bottom:0;
  width: 10rem;
  height: 1.173333rem;
  background-color: #FF7300;
  text-align: center;
  line-height: 1.173333rem;
  font-size: 0.426667rem;
  color:#fff;
}
</style>
