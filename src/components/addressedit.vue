<template>
<div class="wrap-page">
    <div class="content">
        <mt-field  placeholder="收货人姓名" v-model="username" state="success"></mt-field>
       <mt-field  placeholder="联系方式" v-model="userphone" state="error"></mt-field>
       <mt-field  placeholder="所在地区" v-model="useraddress" state="warning"></mt-field>
       <mt-field  placeholder="详细地址" v-model="addresscontent" state="success"></mt-field>
       <div class="default">
           <span>设为默认地址</span>
           <label class="mint-switch">
            <input type="checkbox" class="mint-switch-input"> 
                <span class="mint-switch-core"></span> <div class="mint-switch-label">
            </div>
            </label>
       </div>
    </div>
<!-- <toptitle msg='编辑地址'></toptitle> -->
    <!--  <div class="inputbox">
            <label>收货人</label>
            <input v-model="user.consignee" placeholder="请输入收货人" type="text" name="">
        </div>
        <div class="inputbox">
            <label>手机号码</label>
            <input v-model.number="user.tel" placeholder="请输入手机号码" type="text" name="">
        </div>
        <div class="inputbox" @click="showarea($event)">
            <label>所在地区</label>
            <input style="border:none"  disabled="disabled"  v-once   placeholder="请选择省市区" type="text" name="">

            省份选择开始 
            <div class="controlgroup" >
             <div>
                <select  v-model="selected"  @change="chooseProvince(selected)">
                    <option v-for="province in provinces"  v-bind:value="province.area_id">{{province.area_name}}</option>
                </select>
                </div>
                <div>
                <select  v-model="cityselected"  @change="chooseCity(cityselected)">
    内联对象字面量 
                <option v-for="city in citys"  v-bind:value="city.area_id">{{city.area_name}}</option>
                </select>
                </div>
                <div>
                <select  v-model="areaselected" @change="chooseArea(areaselected)">
                     <option v-for="area in areas"  v-bind:value="area.area_id">{{area.area_name}}</option>
                </select>
                </div>
            </div> 
         end 
        </div>-->
        <!-- <div class="inputbox textarea">
            <textarea v-model="user.address"  placeholder="详细地址"></textarea>
        </div>
        <div class="set-deafault ">

            <span @click="isDefault=!isDefault" class="deafaut-check" :class="{activeadd:isDefault==0}"></span>
            <span>设为默认</span>
        </div>
        <div class="saveAddress">
            <span  class="save-add-btn" @click='saveAddress'>保存地址</span>
        </div> -->
       
 </div>

</template>

<script>


import Toptitle from './Toptitle.vue'
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
                isDefault: '',
                addressId: ''
            },
            isDefault: '',
            updateAddressUrl: 'index/updateAddress',
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
            backAddressID: null
        }
    },
    components: {
        Toptitle
    },
    methods: {

        saveAddress() {
            this.user.isDefault = this.isDefault;
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
            if (this.user.province == '') {
                MessageBox.alert('请选择省份')
                return
            }
            if (this.user.city == '') {
                MessageBox.alert('请选择市区')
                return
            }
            if (this.user.area == '') {
                MessageBox.alert('请选择小区或者县')
                return
            }
            if (this.user.address == '') {
                MessageBox.alert('请填写详细地址')
                return
            }

            // 请求更新地址的接口
            this.$http.get(this.updateAddressUrl, {
                    params: this.user
                })
                .then((res) => {

                    this.backAddressID = this.$route.query.address.id;
                    if (res.data.error == 0) {
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
                                MessageBox.alert('修改成功').then(action => {
                                    this.$router.push('/addresslist')
                                })
                            }
                        }, 1000)
                    } else {
                        MessageBox.alert('修改失败')
                        return;
                    }
                })
                .catch(function(err) {
                    console.log(err)
                })

        },
        // 省份改变加载市
        chooseProvince(select) {
            this.areaselected = null;
            this.areas = null;
            this.user.province = select;

            this.$http.get(this.cityUrl, {
                    params: {
                        areaId: select,
                        areaType: 2
                    }
                })
                .then((res) => {
                    this.citys = res.data.data;
                    this.cityselected = this.citys[0].area_id;
                    this.chooseCity(this.cityselected);
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        // 市区改变区
        chooseCity(select) {
            this.user.city = select;
            this.$http.get(this.areaUrl, {
                    params: {
                        areaId: select,
                        areaType: 3
                    }
                })
                .then((res) => {
                    this.areas = res.data.data;
                    this.areaselected = this.areas[0].area_id;
                    this.user.area = this.areas[0].area_id
                })
                .catch(function(err) {
                    console.log(err)
                })
        },
        // 改变区的时候获取区id
        chooseArea(select) {
            this.user.area = select;
        },
        // 显示隐藏选择省份地区
        showarea(event) {
            if (event.target.tagName.toLowerCase() != 'select') this.showareaselect = !this.showareaselect;
        }
    },
    created() {
        var params = this.$route.query;
        this.user.addressId = params.addressId;
        this.user.consignee = params.consignee;
        this.user.tel = params.tel;
        this.user.address = params.address;
        this.isDefault = params.isDefault;
        this.goodsId = params.goodsId;
        this.goodsAttrId = params.goodsAttrId;
        this.cartId = params.cartId;
        this.goodsNum = params.goodsNum;
        console.log(this.goodsNum)
        this.selected = params.provinceId;
        this.user.province = params.provinceId;
        //获取省级列表
        this.$http.get(this.provinceUrl)
            .then((res) => {
                this.provinces = res.data.data;
            })
            .catch(function(err) {
                console.log(err)
            })
            // 获取默认级联选择
        this.$http.get(this.cityUrl, {
                params: {
                    areaId: this.selected,
                    areaType: 2
                }
            })
            .then((res) => {
                this.citys = res.data.data;

                this.cityselected = this.citys[0].area_id;
                this.user.city = this.citys[0].area_id;
                // 获取区  
                this.$http.get(this.areaUrl, {
                        params: {
                            areaId: this.cityselected,
                            areaType: 3
                        }
                    })
                    .then((res) => {
                        this.areas = res.data.data;
                        this.areaselected = this.areas[0].area_id;
                        this.user.area = this.areas[0].area_id;
                        console.log(this.user.address)
                    })
                    .catch(function(err) {
                        console.log(err)
                    })
                    // 区end
            })
            .catch(function(err) {
                console.log(err)
            })
    }
}

</script>
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
            margin-top: 0.173333rem;
            margin-right:0.426667rem;
            .mint-switch-input:checked + .mint-switch-core {
                border-color: rgb(255, 116, 0);
                background-color: rgb(255, 116, 0);
            }
        }
    }
}
// .saveAddress{
//   height:0.9375rem;
// }
// .controlgroup{
//     display: flex;
//     width: 100%;
//      position: absolute;
//      top:0.8875rem;
//      left: 0;
//     padding: 0 0.3125rem;
//     height: 0.875rem;
//      z-index:100;
// }
// .controlgroup div{
//       position: relative;
//      flex:1;
//     height: 0.625rem;


// }

// select{
//     width: 100%;
//      height: 0.625rem;
//     border: 1px solid #000;
//     text-indent: 0.46875rem;
//     font-size: 0.375rem;
// }


//   .inputbox{

//     margin-top: 0.875rem;
//     position: relative;
//     padding: 0 0.3125rem;
//     &.textarea{
//         margin-top:1.34375rem;
//     }
//     input{
//         display: inline-block;
//       width: 100%;
//       height: 0.6875rem;
//       border-radius: 0.125rem;
//       font-size: 0.3125rem;
//       text-align: center;
//       border: 1px solid #d4d4d4;
//       outline: none;
//     }
//     label{
//     display: inline-block;
//       font-size: 0.3125rem;
//       font-weight: 700;
//       position: absolute;
//       top:50%;
//       margin-top: -0.34375rem;
//       left: 0.625rem;
//       height: 0.6875rem;
//       line-height: 0.6875rem;
//     }
//     textarea{

//       display: block;

//       width: 100%;
//       height: 3.09375rem;
//       outline: none;
//       font-size: 0.3125rem;
//       text-indent: 0.3125rem;
//       font-weight: 700;
//       padding: 0.25rem 0;
//       border-radius: 0.25rem;
//     }
//   }
// .set-deafault{
//    height:0.3125rem;
//    margin-top: 1.40625rem;
//    padding: 0 20px;
//    span{
//       display: inline-block;
//       line-height: 0.3125rem;
//       vertical-align: middle;
//       font-size: 0.3125rem;
//       color: #666;
//     }
//     .deafaut-check{
//       width: 0.28125rem;
//       height: 0.28125rem;
//       border-radius: 50%;
//       border: 1px solid #d4d4d4;
//       &.activeadd{
//         position: relative;
//        }

//     }
//   }
//   .activeadd:after{
//     position: absolute;
//     display: inline-block;
//     content:"";
//     background-color: #666;
//       left: 50%;
//       margin-left: -40%;
//       top: 50%;
//       margin-top: -40%;
//       width: 80%;
//       height: 80%;
//       border-radius: 50%;
//   }
//   .save-add-btn{
//    display: block;
//     background: #77bc1f;
//     padding: 0.125rem 0;
//     color: #fff;
//     margin: 0 auto;
//     margin-top: 0.9375rem;
//     text-align: center;
//     width: 3.9375rem;
 
//     border-radius: 0.078125rem
//   }

</style>

