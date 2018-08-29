<template>
<div>
  <div class="slivert-head">
    <p class="slive-leave-text fz14">银票余额</p>
    <p class="slive-leave-text fz70 pt25">{{silver_ticket}} 
      <span class="fz34">（张）</span>
    </p>   
    <p class="slive-leave-text fz26 pt50">今日返还</p>
    <p class="slive-leave-text mzero fz34 pt16">{{current}}
      <span class="fz">（张）</span>
     </p>
    <p class="slive-leave-text fz24 bom-text">任意现金消费均可返还对应银票</p>
    <span class="recharge-icon"  @click="showRecharge">银票充值</span>
  </div>
  <div class="sliver-subnav">
    <span @click="toSilverTicketList" >银票明细</span>
    <span @click="goCouponList">点券明细</span>
  </div>
  <!-- 以上是头部 -->
    <div class="bigmark" @click="showmark=false" v-show="showmark" ></div>
    <div class="mark" v-show="showmark">
    <div class="mark-content">
        <p  class="mark-text">请输入你的兑换码</p>
        <input v-model="stCode" class="shuruinput" placeholder="" type="text">

         <div  class="mark-btns" >
          <span @click="Recharge">确定</span>
          <span @click.stop="showmark=false">取消</span>
         </div>
      </div>
    </div>
   
 </div>
 </div>
</template>

<script >
import { MessageBox,Indicator  } from 'mint-ui';
import {mapGetters,mapActions,mapState} from 'vuex'
import Toptitle from './../Toptitle.vue'
  export default {
       data(){
        return{
          userInfoUrl:'index/userInfo',
              inSTCodeUrl:'index/inSTCode',
              headers: {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        },
          headerimg:'',
          silver:'',
          showmark:false,
          stCode:''
        }
     },
  created(){
        this.resetsliver()
     },

   computed: {
     ...mapState({
      silver_ticket: state => state.slivert,
      current:state => state.current
    })
},
  components:{
    Toptitle
  },
  methods:{
     ...mapActions([
      'resetsliver' 
      ]),
      backtoprv(){
        this.$router.go(-1)
     },
     showRecharge(){
       this.showmark =true;
     },
     Recharge(){
           if(this.stCode==''){
            MessageBox.alert('输入值不能为空')
            return
          }
         // 充值
       this.$http.post(this.inSTCodeUrl,{stCode:this.stCode},this.headers).then((res) => {

                 MessageBox.alert(res.data.msg).then(()=>{
                     this.stCode='';
                 });

                 this.showmark=false;

           })
            .catch(function(err) {
                console.log(err)
            })
    },
    // 银票明细
    toSilverTicketList(){
      this.$router.push('/silverTicketList')
    },
    // 点券明细
     goCouponList(){
         this.$router.push({name:'couponList'})
      },
       // 去介绍页面
       gotoinstructions(){
         this.$router.push({name:'instructions'})

       }

  }


  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.fz14{
  font-size: 0.373333rem;
}
.fz70{
 font-size: 0.933333rem;
}

.fz26{
  font-size: 0.333333rem;
}
.fz34{
  font-size: 0.453333rem;
}
.fz24{
  font-size: 0.32rem;
}
.slive-leave-text{
  padding-top: 0.426667rem;
  margin-left: 0.666667rem;
  color: #fff;
  &.mzero{
    padding-top: 0;
  } 
  &.pt25{
    padding-top: 0.333333rem;
  }
   &.pt50{
    padding-top: 0.666667rem;
  }
 &.pt16{
    padding-top: 0.213333rem;
  }
  &.bom-text{
    position: absolute;
    bottom: 0.293333rem;
    left: 0;
  }
}
.recharge-icon{
  position: absolute;
  bottom: 0.293333rem;
  right: 0.32rem;
}
.sliver-subnav{
  background-color: #fff;
  display: flex;
  align-item:center;
      justify-content: center;

  span{
    flex:1;
    text-align: center;
     padding: 0.4rem 0;
     font-size: 0.4rem;
  }
}
.recharge-icon{
  box-sizing:border-box;
  text-align: center;
  line-height: 0.64rem;
  display: block;
  width: 1.84rem;
  height: 0.64rem;
  border: 1px solid #fff;
  border-radius: 0.32rem;
  background-color:rgba(0,0,0,0.2);
  color:#fff;
  font-size: 0.16rem;
}
.close-button{
  position: absolute;
  right: 0.15625rem;
  top:0.125rem;
  display: inline-block;
  width: 0.484375rem;
  height: 0.484375rem;
}

  .slivert-head{
     position: relative;
     width: 10rem;
   overflow: hidden;
    background: url(../../images/sliverbg.jpg) no-repeat;
    background-size: 100% 100%;
    height: 6.28125rem;
  }
  .slivert-balance{
    text-align: center;
    padding-top: 0.71875rem;
    font-size: 0.46875rem;
  }
  // 这里是充值的c's's

.bigmark{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top:0;
  left: 0;
  z-index: 99;
}
.mark-content{
  width: 100%;
  height: 100%;
  
   background-color: #fff;
   border-radius: 0.266667rem;
   overflow: hidden;
}
.mark-text{
  padding: 0.533333rem 0;
  text-align: center;
  font-size: 0.453333rem;
  color: #222;
}
.mark{
  width:8.293333rem;
 position: fixed;

  top: 50%;
  left: 50%;
 transform:translate(-50%,-50%);

  z-index: 1008;
}
.mark-btns{
   height: 1.226667rem;
  margin-top: 0.506667rem;
  display: flex;
  span{
     flex:1;
     text-align: center;
      line-height: 1.226667rem;
      font-size: 0.453333rem;
     &:nth-child(1){
       background-color: #ddd;
       color: #888;
      }
      &:nth-child(2){
       background-color: #ff7300;
       color: #fff;
      }
  }
}

.shuru{

  text-align: center;

}
.shuruinput{

   display: block;
   margin: 0 auto;
   width: 7.12rem;
   height: 1.066667rem;
   line-height: 1.066667rem;
   outline:none;
   border:none;
   border-radius:0.533333rem;
   background-color: #ddd;
   color: #444;
   font-size: 0.426667rem;
    padding-left: 20px;
 
  margin-top: 0.15625rem;


}

</style>
