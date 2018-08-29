<template>
    <div class="footer">
        <ul>
          <router-link to='/' tag='li' class='router1 routerx'  active-class="u-link--Active" exact>
             <div class="bnav1 mt"></div>
             <div class="text-nav center">首页</div>

          </router-link>
          <router-link to="/classify"  tag='li' class='router2  routerx' active-class="v-link--Active"  :class="{a:showsel}">
            <div class="bnav2 mt"></div>
             <div class="text-nav center">分类</div>
          </router-link>
          <router-link to='/slivert'  tag='li' class='router3 routerx' active-class="w-link--Active" :class="{a:showsel1}">
             <div class="bnav3 mt"></div>
             <div class="text-nav center">开始当家</div>
          </router-link>
          <router-link to='/shopcar'  tag='li' class='router4 routerx carnumbox' active-class="x-link--Active">
             <div class="bnav4 mt"></div>
             <div class="text-nav center">购物车</div>
            <span class="carnum" v-if="!carnum==0" :class="{bigclass:changeToBig}">{{carnum}}</span>
          </router-link>  
          <router-link to='/my'  tag='li' class='router5 routerx' active-class="y-link--Active">
             <div class="bnav5 mt"></div>
             <div class="text-nav center">我的</div>
          </router-link>  
        </ul>
    </div>
</template>

<script >
import {mapGetters,mapActions,mapState} from 'vuex'
  export default {
  data () {
    return {
      changeToBig: false,
      cartNumUrl: 'index/cartNum',
      showsel:false,
      showsel1:false
    }
  },
  computed: {
    ...mapState({
         carnum:function(state) {
        
           if (state.carnum > 9||state.carnum=='99+') {

               this.changeToBig = true;
           }else {
             this.changeToBig = false;
           }
             return state.carnum
         }
    })
  
  },
  created () {
    this.path = this.$route.path;
    this.restCarnum();

   if( this.path=='/brand'||/commodityList\.{0,}/.test(this.path)){
    this.showsel =true;
   }
   if (/exchargecoupon/.test(this.path)||/onecoupon/.test(this.path)) {
    this.showsel1 =true;
   }
     
  },
  methods:{
     ...mapActions(['restCarnum']),

  }
}
</script>

<style lang="scss" rel="stylesheet/scss" >
.routerx{
  width: 2rem;
  height: 1.390625rem;
  float: left;
  text-align: center;
  position: relative;
 
}
.center{
  text-align: center;
}
.text-nav{
  position: absolute;
  bottom: 0;
  text-align: center;
  width: 100%;
  font-size: 0.32rem;
  margin-top: 0.13333333333333333rem;
  bottom: 0.106667rem;
}

.bnav1{
 
  margin:0 auto;
  width: 0.6rem;
  height: 0.533333rem;
  background-image: url(../../images/bnav1s.png);
  background-size: 100% 100%;
  background-position:top center;
}
.u-link--Active{
  .bnav1{
    background-image: url(../../images/bnav1.png);
    
  }
  .text-nav{
    color:#ff7300
  }
}

.bnav2{
   margin:0 auto;
    width: 0.506667rem;
    height: 0.506667rem;
   background-image: url(../../images/bnav2s.png);
  background-size: 100% 100%;
}
.v-link--Active,.router2.a{
  .bnav2{
    background-image: url(../../images/bnav2.png);
  }
  .text-nav{
    color:#ff7300
  }
}
.bnav3{
   margin:0 auto;
   width: 0.640625rem;
   height: 0.5625rem;
   background-image: url(../../images/bnav3s.png);
  background-size: 100% 100%;
}
.w-link--Active,.router3.a{
  .bnav3{
   background-image: url(../../images/bnav3.png);
  }
  .text-nav{
    color:#ff7300
  }
}
.bnav4{
   margin:0 auto;
   width: 0.52rem;
   height: 0.506667rem;
   background-image: url(../../images/bnav4.png);
   background-size: 100% 100%;
}
.x-link--Active{
  .bnav4{
  background-image: url(../../images/bnav4s.png);}
  .text-nav{
    color:#ff7300
  }
}
.bnav5{
     margin:0 auto;
   width: 0.533333rem;
   height: 0.533333rem;
   background-image: url(../../images/bnav5s.png);
   background-size: 100% 100%;
}
.y-link--Active{
  .bnav5{
      background-image: url(../../images/bnav5.png);
  }
  .text-nav{
    color:#ff7300
  }
 
}
.mt{
  margin-top: 0.15625rem;
  
}
.carnumbox{
  position: relative;
}
.carnum{
    position: absolute;
     width: 0.390625rem;
    height: 0.390625rem;
        line-height:0.390625rem ;
        text-align: center;
        top: 0.0625rem;
        left: 1.125rem;
        background: #77bc1f;
        color: #fff;
        text-align: center;
        line-height: 0.390625rem;
        border-radius: 50%;
       
        text-decoration: none;
        font-size: 12px;
        &.bigclass{
          width: 0.65rem;
           border-radius: 0.3125rem;
        }
}
   .footer{
    z-index: 99;
    position: fixed;
    bottom:0;
    left: 0;
   
    height: 1.390625rem;
   box-shadow:0px 0px 10px #e3e3e3;

  
    background-color: #FFF;
    ul{
      list-style: none;
      padding: 0;
      margin:0;
      li{
       
        img{
          width: 100%;
          height: auto;
        }
      }
    }
   }
</style>
