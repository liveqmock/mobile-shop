<template>
<div class="wrap-page">
 <div class="box">
       <div class="phone-numberbox">
            <div class="p-intbum">
              <input v-model='phonenNum' placeholder="请输入手机号码" type="text">
              <img src="../../images/userN.png" alt="">
            </div>
            <p class="p-intro">
              {{carrier}}
            </p>
           <div class="phone-numlist" v-show="showlist">
             <ul>
               <li @click="selctdefalnum(tel)" v-for="tel in telList">{{tel}}</li>
               
             </ul>
           </div> 
       </div>
       <!--  -->
       <div>
          <h4 class="ti-use">充话费<span class="use-green">使用银票充值</span></h4>
          <div class="fare-list">
             <ul>
               <li  :class="{selclass:active==index}" @click='rechargefare(phonefare,index)' v-for="(phonefare,index) in phonefarelsit">

                  <div class="numbox-mon">
                    <div class="green-text">{{phonefare.pack_name}}</div>
                    <div class="slier-tr">售价银票{{phonefare.pack_price}}元</div>
                 </div>
               </li>
              
               
               
             </ul>
          </div>
       </div>
       <!--  -->
        <div class="geliuliang">
          <h4 class="ti-use">充流量<span class="use-green">立即生效</span></h4>
          <div class="fare-list">
             <ul>
           
               <li :class="{selclass:active1==i}" @click='rechargefareX(flow,i)' v-for="(flow,i) in flowlist">
                  <div class="numbox-mon">
                    <div class="green-text">{{flow.pack_name}}</div>
                    <div class="slier-tr">售价银票{{flow.pack_price}}元</div>
                 </div>
               </li> 
            </ul>
          </div>
       </div>
       <!--  -->
       <div class="bottom-buy">
          <div class="phnb-l pull-left">
              <span class="ponafare-item">{{showfaretxt}}<br>
                  <b class="phorare-text">{{pack_remark}}<br>{{pack_valid}}</b>
              </span>
          </div> 
          <div disabled="flag" class="phnb-r" @click="chargefare">
             购买
          </div>
       </div>
       <p  @click = "gotelist" class="goto-tellist">充值记录</p>
   </div>
    <div class="bigmark" v-if="showbgmark">
    
 </div>
  
 </div>

</template>

<script>
import { MessageBox, Indicator } from 'mint-ui';
export default {
  data () {
    return {
      headers: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      getphone: 'https://tcc.taobao.com/cc/json/mobile_tel_segment.htm',
      phonenNum: '',
      carrier: '',
      phonefarelsit: [],
      slivert: '',
      flowlist: [],
      showfaretxt: '',
      pack_remark: '',
      pack_valid: '',
      rechargefaretext: false,
      catype: 1,
      pack_price: '',
      flag: 0,
      active: undefined,
      active1: undefined,
      showbgmark: false,
      telList: [],
      showlist: false
    }
  },
  components: {},
  created() {
    // 获取默认号码
    this.$http.get('Phone/get_default').then((res) => {
      console.log(res.body)
      if (res.body != 2) {
        this.telList = res.body;
        this.phonenNum = this.telList[0]
      }

    });
    this.getflowlist(this.catype)
      // 获取话费列表
    this.$http.get('Phone/get_package').then((res) => {
      this.phonefarelsit = res.body;
      this.phonefarelsit.forEach((item, index) => {

      })
    });
    // 获取用户银票余额
    this.$http.get('index/userInfo')
      .then((res) => {
        if (res.body.error == 0) {
          let data = res.data.data;
          this.slivert = data.silver_ticket;
        }
      })
      .catch(function(err) {
        console.log(err)
      })
  },
  watch: {
    phonenNum(val) {
      if (val.length == 0) {
        this.showlist = true;
      } else {
        this.showlist = false;
      }
      if (val.length == 11) {
        this.$http.jsonp(this.getphone, {
          params: {
            tel: val
          }
        }).then((res) => {
          var result = res.body;
          if (result.catName == '中国联通') {
            this.phonefarelsit.shift();
            this.catype = 1;
          } else if (result.catName == '中国移动') {
            this.catype = 2;
          } else if (result.catName == '中国电信') {
            this.catype = 3;
          }
          this.getflowlist(this.catype)
          this.carrier = result.carrier;
        })
      } else {
        this.carrier = '';
      }
    }
  },
  methods: {
    gotelist() {
      this.$router.push('/telhisList')
    },
    // 默认号码列表的点击事件
    selctdefalnum(tel) {
      this.phonenNum = tel;
    },
    // 充话费
    rechargefare(item, index) {
      this.active1 = undefined;
      this.active = index;
      this.showfaretxt = item.pack_name;
      this.pack_price = item.pack_price;
      this.rechargefaretext = true;
      this.pack_remark = '';
      this.pack_valid = '';
    },
    // 充流量
    rechargefareX(item, i) {
      this.active = undefined,
        this.active1 = i;
      this.rechargefaretext = false;
      this.pack_price = item.pack_price;
      this.showfaretxt = item.pack_name;
      this.pack_remark = item.pack_remark;
      this.pack_valid = item.pack_valid;
      console.log(this.pack_remark + this.pack_valid)
      this.pack_mb = item.pack_mb;
      this.pack_id = item.pack_id

    },
    // 获取流量列表
    getflowlist(type) {

      this.$http.post('Phone/get_flow_package', {
          "type": type
        }, this.headers)
        .then((res) => {
          this.flowlist = res.body
        })
        .catch(function(err) {
          console.log(err)
        })
    },
    chargefare() {
      if (this.phonenNum == '' || this.phonenNum.length < 11) {
        MessageBox.alert('请填写正确的手机号码');
        return;
      }
      if (this.pack_price == '') {
        MessageBox.alert('请选择你要充值的话费或者流量套餐');
        return;
      }
      MessageBox.confirm('确定执行此操作?').then(action => {

        this.flag++;
        if (this.flag > 1) {
          return;
        }
        Indicator.open('加载中...');
        this.showbgmark = true;
        if (this.rechargefaretext == true) {
          this.$http.post('Phone/charge', {
            price: this.pack_price,
            mobile: this.phonenNum
          }, this.headers).then((res) => {

            var errcode = res.body.status;
            if (errcode == 1) {
              setTimeout(() => {
                this.showbgmark = false;
                Indicator.close();
                MessageBox.alert('充值成功').then(action => {
                  this.$router.push('/slivert');
                });
              }, 2000)
            } else {
              this.showbgmark = false;
              Indicator.close();
              MessageBox.alert('充值失败，请稍后再试');
              this.flag = 0;
            }
          });
        } else {
          this.$http.post('Phone/flow_charge', {
            price: this.pack_price,
            mobile: this.phonenNum,
            mb: this.pack_mb,
            pack_id: this.pack_id
          }, this.headers).then((res) => {
            var errcode = res.body.status;
            if (errcode == 1) {
              this.showbgmark = false;
              Indicator.close();
              MessageBox.alert('充值成功').then(action => {
                this.$router.push('/slivert');
              })

            } else {
              this.showbgmark = false;
              Indicator.close();
              MessageBox.alert('充值失败，请稍后再试');
              this.flag = 0;
            }

          });
        }
      }).catch(action => {
        return
      });
    }
  }
}
</script>
<style lang="scss" rel="stylesheet/scss" scoped>
@charset "UTF-8";
/*清除设置默认*/
html {
  -webkit-tap-highlight-color: transparent;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  height: 100%;
  /*==在IE下body的百分高度需要在html设置此值==*/ }

html, body, div, h1, h2, h3, h4, h5, h6, ol, ul, li, dl, dt, dd, img, button, fieldset, form, hr, input, legend, li, ol, p, pre, table, th, td, textarea, th {
  margin: 0;
  padding: 0; }

body {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%; }

body, button, input, select, textarea {
  font: 12px/1.5 tahoma, arial, 'Hiragino Sans GB', \5FAE\8F6F\96C5\9ED1, \5b8b\4f53, sans-serif;
  /* 用 ascii 字符表示，使得在任何编码下都无问题  字体根据需要设置*/
  color: #666; }

h1, h2, h3, h4, h5, h6, input, i, b, em {
  font-weight: normal; }

ul, ol {
  list-style: none; }

a {
  cursor: pointer;
  text-decoration: none;
  outline: none;
  background-color: transparent; }

a:active, a:hover {
  outline: none; }

a:focus {
  outline: none;
  -moz-outline: none; }

button, input, optgroup, select, textarea {
  color: inherit;
  font: inherit;
  margin: 0; }

button {
  overflow: visible; }

button, select {
  text-transform: none; }

button::-moz-focus-inner, input::-moz-focus-inner {
  padding: 0;
  border: 0; }

button, input, select, textarea {
  font-size: 100%;
  /* 使得表单元素在 ie 下能继承字体大小 */ }

button, html input[type=button], input[type=reset], input[type=submit] {
  -webkit-appearance: none;
  cursor: pointer; }

/*-iE7.0中自带的-ms-interpolation-mode属性可以解决缩放失真问题*/
fieldset, img {
  border: none;
  max-width: 100% !important;
  -ms-interpolation-mode: bicubic;
  page-break-inside: avoid; }

svg:not(:root) {
  overflow: hidden; }

input, img, select {
  vertical-align: middle;
  border: none;
  outline: none; }

input {
  line-height: normal; }

input[type="checkbox"], input[type="radio"] {
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  padding: 0; }

input[type="number"]::-webkit-inner-spin-button, input[type="number"]::-webkit-outer-spin-button {
  height: auto; }

input[type="search"] {
  -webkit-appearance: none;
  -webkit-box-sizing: content-box;
  box-sizing: content-box; }

input[type="search"]::-webkit-search-cancel-button, input[type="search"]::-webkit-search-decoration {
  -webkit-appearance: none; }

textarea {
  overflow: auto;
  resize: none; }

table {
  border-spacing: 0;
  border-collapse: collapse;
  background-color: transparent; }

@-ms-viewport {
  width: device-width; }

.clearfix {
  *zoom: 1; }

.clearfix:after, .clearfix:before {
  display: table;
  content: " ";
  clear: both; }

.center-block {
  display: block;
  margin-right: auto;
  margin-left: auto; }

/*处理文字效果*/
.text-center {
  text-align: center;
  zoom: 1; }

.text-left {
  text-align: left; }

.text-right {
  text-align: right; }

.ellipsis {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis; }

.break {
  word-break: break-all;
  word-wrap: break-word; }

.inline-block {
  display: inline-block; }

.inline {
  display: inline; }

.pull-right {
  float: right !important; }

.pull-left {
  float: left !important; }

.hide {
  display: none !important; }

.show {
  display: block !important; }

.box {
  background-color: #f3f3f3;
  height: 100%; }

.phone-numberbox {
  position: relative;
  width: 10rem;
  height: 2.1875rem;
  background-color: #fff;
  border-bottom: 1px solid #e9e9e9; }

.p-intbum {
  overflow: hidden;
  padding: 0.625rem 0.375rem  0 0.5rem; }
  .p-intbum input {
    float: left;
    width: 7rem;
    height: 0.9375rem;
    font-size: 0.71875rem; }
  .p-intbum img {
    float: right;
    width: 0.625rem;
    height: 0.625rem;
    margin-top: 0.15625rem; }

.p-intro {
  text-indent: 0.5rem; }

.use-green {
  padding: 0 0.1875rem;
  font-size: 0.28125rem;
  display: inline-block;
  height: 0.4375rem;
  line-height: 0.4375rem;
  background-color: #77bc1f;
  color: #fff;
  border-radius: 0.21875rem;
  position: absolute;
  top: 50%;
  -webkit-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
  transform: translate(0, -50%);
  margin-left: 0.15625rem; }

.ti-use {
  color: #000;
  background-color: #FFF;
  font-size: 0.40625rem;
  height: 1.5rem;
  line-height: 1.5rem;
  padding-left: 0.375rem;
  position: relative; }

.fare-list {
  padding: 0 0.375rem;
  background-color: #fff;
  overflow: hidden;
  text-align: center; }
  .fare-list li {
    float: left;
    width: 2.875rem;
    height: 1.5625rem;
    border: 1px solid #77bc1f;
    border-radius: 3px;
    margin-right: 0.15625rem;
    margin-top: 0.15625rem;
    position: relative;
    
 }
 .fare-list li.selclass{
   border: 1px solid #ff0000;
 } 
.numbox-mon {
  width: 100%;
  position: absolute;
  top: 50%;
  -webkit-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
  transform: translate(0, -50%); }
  .numbox-mon div {
    text-align: center;
    width: 100%; }

.green-text {
  color: #77bc1f;
  font-size: 0.40625rem; }

.slier-tr {
  font-size: 0.28125rem; }

.geliuliang {
  padding-bottom: 0.59375rem;
  background-color: #FFF; }
.bottom-buy{
  background-color: #fff;
  border-top: 1px solid #ccc;
  position: relative;
  height: 2.34375rem;
}
.phnb-l{
position: absolute;
  top: 50%;
  left: 0.375rem;
   -webkit-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
  transform: translate(0, -50%);
}
.phnb-r{
  font-size: 0.46875rem;
  color: #77bc1f;
  width: 2.125rem;
  height: 0.9375rem;
  line-height: 0.9375rem;
  position: absolute;
  top: 50%;
  right: 0.375rem;
  text-align: center;
    border: 1px solid #77bc1f;
    border-radius: 3px;
  -webkit-transform: translate(0, -50%);
  -ms-transform: translate(0, -50%);
  transform: translate(0, -50%); 
}
.ponafare-item{
  font-size: 0.53125rem;
  color: #000;
}
.phorare-text{
 
  word-break: break-all;
  font-size: 0.375rem;
  color: #888;
}
.bigmark{
  position: fixed;
  top:0;
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.6);

}
.phone-numlist{
  width: 100%;
  background-color: #fff;
  position: absolute;
  top:2.1875rem;
  z-index: 100;
  li{
    height:1.8rem;
    line-height:1.8rem ;
    text-align: left;
    margin-left: 0.625rem;
     margin-right: 0.625rem;
    border-bottom: 1px solid #ccc;
  }
}
.goto-tellist{
  position: absolute;
  bottom: 20px;
  width: 100%;
  background-color: #f3f3f3;
  text-align: center;
  font-size: 0.375rem;
  
}

</style>

