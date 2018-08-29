<template>
<div class="wrap-page">
    <div class="content">
        <mt-field  placeholder="收货人姓名" v-model="user.consignee" ></mt-field>
       <mt-field  placeholder="联系方式" v-model="user.tel" ></mt-field>
       <div @click="showChose=true">
       <mt-field  placeholder="所在地区" v-model="address"></mt-field>
       </div>
       <mt-field  placeholder="详细地址" v-model="user.address"></mt-field>
       <div class="default">
           <span>设为默认地址</span>
           <label class="mint-switch">
            <input type="checkbox" v-model="isDefault" class="mint-switch-input"> 
                <span class="mint-switch-core"></span> <div class="mint-switch-label">
            </div>
            </label>
       </div>
        <div class="saveAddress" @click="saveAddress">
        <span >保存地址</span>
      </div>
      <div style="background:#fff">
      </div>
    </div>
    
        <!--居住地址三级联动选项-->
    <section class="showChose" v-show="showChose">
      <section class="address">
        <section class="title">
          <h4>居住地址</h4>
          <span @click="closeAdd()">×</span>
        </section>
        <section class="title">

          <div class="area" @click="provinceSelected()">{{selprovinces}}</div>
          <div class="area" @click="citySelected()" :class="City?'':'active'">{{City?City:'请选择'}}</div>
          <div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</div>
        </section>
        <ul>
          <li class="addList" v-for="(v,k) in provinces" @click="getProvinceId(v.area_id, v.area_name, k)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.area_name}}</li>
          <li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.area_id, v.area_name, k)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.area_name}}</li>
          <li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.area_id, v.area_name, k)" v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.area_name}}</li>
        </ul>
      </section>
    </section>
 </div>

</template>

<script>
import { MessageBox } from 'mint-ui';

export default {
  data() {
    return {
      user: {
        province: '',
        city: '',
        area: '',
        address: '',
        consignee: '',
        tel: '',
        isDefault: 0
      },
      apiUrl: 'index/addAddress',
      provinceUrl: 'index/areas',
      cityUrl: 'index/areas/areaId/2/areaType/2',
      areaUrl: 'index/areas/areaId/87/areaType/3',
      provinces: null,
      citys: null,
      areas: null,
      selected: null,
      cityselected: null,
      areaselected: null,
      showareaselect: false,
      provincesid: null,
      cityid: null,
      areaid: null,
      goodsId: null,
      backAddressID: null,
      currentCity: '北京',
      provinceId: '',
      showChose: false,
      showProvince: true,
      showCity: false,
      showDistrict: false,
      showCityList: false,
      showDistrictList: false,
      province: 1,
      city: 3,
      district: 57,
      GetProvinceId: 2,
      District: false,
      Province: false,
      City: false,
      // v-for循环判断是否为当前
      selected: false,
      selprovinces:'',
      provinces:null,
      address:'',
      isDefault:''
    }
  },
 
  methods: {
    backtoprv() {
      this.$router.go(-1)
    },
 getCitylist(provinceid){
        this.$http.get(this.cityUrl, {
                params: {
                    areaId:provinceid,
                    areaType: 2
                }
            })
            .then((res) => {
                this.showCityList = res.data.data;

                
            })
            .catch(function(err) {
                console.log(err)
            })
      },
      // 获取区县
     getDistrictList(cityid){
      this.$http.get(this.areaUrl, {
                        params: {
                            areaId:cityid ,
                            areaType: 3
                        }
                    })
                    .then((res) => {
                        this.showDistrictList = res.data.data;
                        
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
     },
      
    choseAdd: function() {
      this.showChose = true;
    },
    closeAdd: function() {
      this.showChose = false;
    },
    _filter(add,name,code) {
      let result = [];
      for(let i=0;i<add.length;i++) {
        if(code == add[i].id){
          result = add[i][name];
        }
      }
      return result;
    },
    getProvinceId: function(code,input,index) {
     
      this.province = code;
      this.Province = input;
      this.showProvince=false;
      this.showCity=true;
      this.showDistrict = false;
       this.selprovinces = ''+input
       this.getCitylist(code)
     
     
      
    },
    provinceSelected: function() {
      // 清除市级和区级列表
      this.showCityList = false;
      this.showDistrictList = false;
      // 清除市级和区级选项
      this.City = false;
      this.District = false;
      // 选项页面的切换
      this.showProvince = true;
      this.showCity = false;
      this.showDistrict = false;
    },
    getCityId: function(code, input, index) {
      this.city = code;
      this.City = input;
      this.showProvince=false;
      this.showCity=false;
      this.showDistrict = true;
      this.getDistrictList(code)
      console.log(111111)
    },
    citySelected: function() {
      this.showProvince=false;
      this.showCity=true;
      this.showDistrict = false;
    },
    getDistrictId: function(code, input, index) {
      this.district = code;
      this.District = input;
      // 选择当前添加active
      this.showDistrictList.map( a => a.selected = false );
      this.showDistrictList[index].selected = true;
      this.address = ''+this.Province +this.City+this.District 
      console.log(this.Province +this.City+this.District)
    

      // 保存省市区的id 
      this.user.province = this.province;
      this.user.city = this.city;
      this.user.area = this.district;
      // 选取市区选项之后关闭弹层
      this.showChose = false;
    },
    districtSelected: function() {
      this.showProvince=false;
      this.showCity=false;
      this.showDistrict = true;
    },
   // 保存地址
    saveAddress() {
     this.user.isDefault = +!this.isDefault;

          
            var myreg = /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
            if (this.user.consignee == '') {
                MessageBox.alert('收货人不能为空')
                return
            }
            if (this.user.tel == '') {
                MessageBox.alert('手机号码不能为空')
                return
            }
            if (!(myreg.test(this.user.tel))) {
                MessageBox.alert('手机号码不正确')
                return
            }
            if (this.address == '') {
                MessageBox.alert('请选择所在地区')
                return
            }
            
            if (this.user.address == '') {
                MessageBox.alert('请填写详细地址')
                return
            }
           console.log(this.user);
          
      this.$http.get(this.apiUrl, {
          params: this.user
        })
        .then((res) => {
          console.log(res)
          if (res.data.error == 0) {
            MessageBox.alert('操作成功')
          } else {
            MessageBox.alert(res.data.msg)
            return;
          }
          this.backAddressID = res.data.data;
          setTimeout(() => {
            // 如果是从确认订单过来则增加地址后跳转到确认订单
            if (this.$route.query.order) {

              this.$router.push({
                name: 'surorder',
                params: {
                  cartId: this.cartId,
                  goodsId: this.goodsId,
                  backAddressID: this.backAddressID,
                  goodsAttrId: this.goodsAttrId,
                  goodsNum: this.goodsNum
                }
              })
              
            } else {
              this.$router.push('addresslist')
            }
          }, 2000)


        })
        .catch(function(err) {
          console.log(err)
        })

    },
   
   
  

  },
  created() {

    this.goodsId = this.$route.query.goodsId;
    this.goodsAttrId = this.$route.query.goodsAttrId;
    this.cartId = this.$route.query.cartId;
    this.goodsNum = this.$route.query.goodsNum;
      this.$http.get(this.provinceUrl)
            .then((res) => {
                this.provinces = res.data.data;
               
            })
            .catch(function(err) {
                console.log(err)
            })
        }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.wrap-page{
    background-color: #eee;

    .content{
         padding-left:0.373333rem;
         background-color: #FFF;
    }
    .default{
        height: 1.2rem;
        line-height: 1.2rem;
        border-top: 1px solid #F0F0F0;
        span{
            font-family: PingFangSC-Regular;
            font-size: 0.346667rem;
            color: #333333;
            letter-spacing: 0;
            margin-left: 0.2rem;
        }
        label{
            float: right;
               margin-top: 0.106667rem;
            margin-right:0.133333rem;
            .mint-switch-input:checked + .mint-switch-core {
                border-color: rgb(255, 116, 0);
                background-color: rgb(255, 116, 0);
            }
        }
    }
}
.saveAddress{
  position: fixed;
  left: 0;
  bottom:0;
  width: 10rem;
  height: 1.173333rem;
  background-color: #FF7300;
  text-align: center;
  line-height: 1.173333rem;
  font-size: 0.426667rem;
  color:#fff;
}
.myAddress{
  width: 100%;
  background-color: white;
  border-top: 4px solid rgba(245,245,245,1);
  color:#333;
}
.myAddress .cont{
  border-bottom: 1px solid rgba(245,245,245,0.8);
}
.myAddress .cont span{
  display: inline-block;
  font-size: 0.28rem;
  color: #333;
  line-height: 0.88rem;
  margin-left: 0.32rem;
}
.myAddress .cont section{
  float:left;
}
.myAddress .cont p{
  display: inline-block;
  font-size: 0.28rem;
  color: #333333;
  line-height: 0.88rem;
  margin-left: 1rem;
}
.myAddress .cont .pic2{
  float: right;
  width: 0.14rem;
  height: 0.24rem;
  margin: 0.32rem 0.32rem 0.32rem 0;
}
.myAddress .cont p.text{
  margin-left: 0.72rem;
}
.showChose{
  width:100%;
  height:100%;
  position:fixed;
  top:0;
  left:0;
  z-index:120;
  background:rgba(77,82,113,0.8);
}
.address{
  position:absolute;
  bottom:0;
  left:0;
  z-index:121;
  background:#fff;
  width:100%;
}
.title h4{
  display:inline-block;
  margin-left:3.2rem;
  font-size:0.32rem;
  line-height:0.88rem;
  font-weight:normal;
  color:#999;
}
.title span{
  margin:0.42rem 0 0 2.2rem;
  font-size:0.45rem;
  line-height:0.34rem;
  color:#D8D8D8;
}
.area{
  display:inline-block;
  font-size:0.24rem;
  line-height:0.88rem;
  margin-left:0.42rem;
  color:#333;
}
.addList{
  width:100%;
  padding-left:0.32rem;
  font-size:0.34rem;
  line-height:0.88rem;
  color:#333;
}
/* 修改的格式 */
.address ul{
    list-style: none;
  width:95%;
  height:100%;
  max-height: 4.4rem;
  overflow:auto;
}
.address ul li{
  margin-left:5%;
}
.address .title .active{
  color:#0071B8;
  border-bottom:0.02rem solid #0071B8;
}
.address ul .active{
  color:#0071B8;
}


</style>
