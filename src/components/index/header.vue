<template>
<div>
    <div class="index-header">
        <span class="cs" @click="showCityModel=!showCityModel"> <b>{{cityText}}</b></span>
        <div class="search-input-box">
        <form action="#" onsubmit="return false;">
        <input type="search" @focus="seekFn()"  >
        </form>
      </div>

        <img @click="seekFn()" class="search-icon" src="../../images/search_icon.png" alt="">
    </div>
        <!-- 地址 -->
        <div class="city-list" v-show="showCityModel" >
       <div class="current-city">当前城市：{{cityText}}</div>
          <p class="location-text"  v-if="youcityText" >定位城市</p>
          <div class="circle-first"  v-if="youcityText">
              <b @click="selectciity(youcityText)"  class="circle-cityname">{{youcityText}}</b>
          </div>
          <p class="location-text">热门城市</p>
          <div class="circle-list">
            <b v-for="city in hostcity"  @click="selectciity(city)" class="circle-cityname">{{city}}</b>
         
          </div>
           <div class="fist-word a">A</div>
           <div>
             <ul class="all-city">
               <li >安徽省</li>
             </ul>
           </div>
           <div class="fist-word">B</div>
           <div>
             <ul class="all-city">
               <li >北京</li>
             </ul>
           </div>
           <div class="fist-word">C</div>
           <div>
             <ul class="all-city">
               <li >重庆</li>
             </ul>
           </div> 
           <div class="fist-word">F</div>
           <div>
             <ul class="all-city">
               <li >福建省</li>
             </ul>
           </div> 
            <div class="fist-word">G</div>
           <div>
             <ul class="all-city">
               <li >广东省</li>
               <li >广西壮族自治区</li>
               <li >贵州省</li>
               <li >甘肃省</li>
             </ul>
           </div>
           <div class="fist-word">H</div>
           <div>
             <ul class="all-city">
               <li >河北省</li>
               <li >黑龙江</li>
               <li >河南省</li>
               <li >湖北省</li>
               <li >湖南省</li>
               <li >海南省</li>
             </ul>
           </div>  
            <div class="fist-word">J</div>
           <div>
             <ul class="all-city">
               <li >吉林省</li>
               <li >江苏</li>
               <li >江西</li>
             </ul>
           </div> 
           <div class="fist-word">L</div>
           <div>
             <ul class="all-city">
               <li >辽宁省</li>
             </ul>
           </div> 
           <div class="fist-word">N</div>
           <div>
             <ul class="all-city">
               <li >内蒙古自治区</li>
               <li >宁夏回族自治区</li>
             </ul>
           </div>  
          <div class="fist-word">Q</div>
           <div>
             <ul class="all-city">
               <li >青海省</li>
             </ul>
           </div>
          <div class="fist-word">S</div>
           <div>
             <ul class="all-city">
               <li >山西省</li>
               <li >上海</li>
               <li >山东省</li>
               <li >四川省</li>
               <li >陕西省</li>
             </ul>
           </div>
      </div>
    </div>
</div>


</template>

<script >


import {mapGetters, mapActions} from 'vuex'
import { MessageBox } from 'mint-ui';
export default {
  data() {

    return {
      
      showIcon: true,
      cityText: '',
      youcityText:'',
      showCityModel: false,
      showtip:true,
      hostcity:['北京','广东','上海','浙江']
    }
  },

  
  created(){
  // wx 获取经纬度
  var vm = this;

  wx.ready(function() {
      wx.getLocation({
         type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          success: function(res) {

            var latitude = res.latitude; // 纬度，浮点数，范围为90 ~ -90
            var longitude = res.longitude; // 经度，浮点数，范围为180 ~ -180。
            var speed = res.speed; // 速度，以米/每秒计
            var accuracy = res.accuracy; // 位置精度
            vm.wxGetCity(latitude,longitude);
        }
  });

});

},
mounted() {
  if (this.InputVal == '') {
      this.showIcon = true
    }
   var vm =this;
    var selectItem = this.$el.querySelectorAll('.city-list li');
    for (var i = selectItem.length - 1; i >= 0; i--) {
      selectItem[i].onclick = function(argument) {
        console.log(this.innerHTML)
        vm.cityText = this.innerHTML;
        vm.showCityModel = false
      }
    }
  },
  methods:{
     seekFn(){
      this.$router.push('/SearchGoods')
     },
     setcity(){
        console.log(1)
        this.cityText = this.youcityText;
     },
     selectciity(city){
      console.log(city)
      
      this.cityText = city;
      this.showCityModel =false;
     },
      wxGetCity(latitude,longitude) {

        this.$http.get('index/getCity', {params:{latitude:latitude,longitude:longitude}}).then((res)=>{
          console.log(res)
          if (res.body.error==0) {
              var  province = res.body.data.province;
                this.cityText =province.slice(0, province.length-1) ;
               this.youcityText =province.slice(0, province.length-1);
               if (this.cityText=='') {

                 this.youcityText=this.cityText='北京'
               }
           }
         })
   }
 }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

input[type="text"] {
-webkit-appearance: none;
}

// citylist
.city-list{
  position: fixed;
  width: 100%;
  height: 100%;
  top:0;
  left: 0;
  background-color: #f3f3f3;
  z-index: 100;
 font-size: 0.373333rem;
   -webkit-overflow-scrolling:touch;
  overflow-y: scroll;

}
.current-city{
  text-indent: 0.32rem;
  height: 1.2rem;
 line-height: 1.2rem;
 background-color: #fff;
}
.location-text{
  padding: 0.4rem 0;
  color: #666;
}
.circle-first{
  font-size: 0;
}
.circle-cityname{

   display: inline-block;
   width: 2.8rem;
   height: 1.04rem;
   line-height:1.04rem ;
   font-size: 0.373333rem;
   text-align: center;
   font-weight: 400;
   color: #666;
   border-radius: .52rem;
   background-color: #fff;
   margin-right: 0.32rem;
   margin-bottom: 0.4rem;
}
.circle-first,.location-text{
  margin-left: 0.32rem;

}
.circle-list{
  font-size: 0;
  padding: 0 0.32rem;

}

.fist-word{
  text-indent: 0.32rem;
  padding: 0.16rem 0;
  
  color: #666;
  &.a{
    border-top: 1px solid #d7d7d7;
  }
}
.all-city{
  background: #fff;
  li{
    box-sizing:border-box;
    height: 1.2rem;
    line-height: 1.2rem;
    border-bottom: 1px solid #d7d7d7; 
    text-indent: 0.32rem;
    font-size: 0.4rem;
    
  }
   
}
.city-input{
  position: relative;
  padding: 12px 0;
  background-color: #fff;
  text-align: center;
   input{
    display: inline-block;
    border: none;
    outline:none;
    width: 9.36rem;
    height: 0.773333rem;
    background-color: #e6e6e6;
    border-radius: 0.386667rem;
    text-align: center;

   }
}
.tip-input{
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%,-50%);
  color: #999;
  &:before{
    content:'';
    margin-right: 0.133333rem;
    display:inline-block;
    width: 0.36rem;
    height: 0.36rem;
    background-image: url(../../images/cityseatch.png);
    background-size: 100%;
  }
}

.index-header{
        z-index: 1;
        height: 1.234375rem;
        width: 100%;
        background: #fff;
        position: fixed;
        top: 0;
        padding: 0 0.1875rem 0 0.1875rem;
        span,input{
            display: inline-block;
        }
        span.cs{
       b{
        display: inline-block;
        width: 1.2rem;
         overflow-x: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
       }
        
     
          
          position: relative;
         
            float: left;
            width: 1.5625rem;
            margin-top: 0.3125rem;
            height: 0.6875rem;
            line-height: 0.6875rem ;
             position: relative;
             text-align: center;
           


              &:after{
                
                position: absolute;
                right: -0.15625rem;
                 top: ( 0.6875rem-0.17625rem)/2;
                 display: inline-block;
                 width: 0.296875rem;
                 height: 0.15625rem;
                 content:'';
                 background-image: url(../../images/bjiantou.png);
                 background-size: 100% 100%;
              }
        }
        .search-input-box{
              margin-top:(1.234375rem-0.765625rem)/2;
              width:6rem;
              position: relative;
             float: left;
             margin-left: 0.6125rem+0.2rem;
        }
        input{
              box-shadow:0px 0px 0px rgba(0,0,0,0); 
             -webkit-appearance:none;
            border:none;
             outline:none;
            width: 6rem;
            height: 0.765625rem;
            border-radius:(0.765625rem/2);
            background-color: #e6e6e6;
            padding-left: 0.546875rem;
            font-size: 0.359375rem;
            text-align: center;
            color: #999;
            font-size: 0.40625rem;
        }
        
    }
    .search-icon{
      width: 0.5rem;
      height: 0.5rem;
      float: right;
      position: relative;
      top:50%;
      transform:translate(0,-50%)
    }
</style>
