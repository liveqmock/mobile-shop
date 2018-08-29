<template>
 <div>
  <div class="bigmark" @click="showmark=false" v-show="showmark" ></div>
    <div class="mark" v-show="showmark">
    <div class="mark-content">
        <div class="icon-box"><img src="../../images/zhifubao.png" alt=""></div>
        <input v-model="stCode" class="shuruinput" placeholder="输入充值券码" type="text">
         <div class="duihuan-btn" @click="Recharge">确定</div>
      </div>
    </div>
 </div>
</template>

<script >
import {mapGetters,mapActions} from 'vuex'
  export default {
       data(){
        return{
          showmark:false,
          stCode:''
        }
     },
     created(){
           this.$http.get(this.userInfoUrl)
            .then((res) => {
               let data = res.data.data;
               this.headerimg= data.head_pic;
                this.silver = data.silver_ticket;
               })
            .catch(function(err) {
                console.log(err)
            })
          
           
     },
     methods:{
          Recharge(){}
     },
   computed: {
      silver_ticket () {
          this.$store.state.slivert = this.silver;
          return this.$store.state.slivert;
    }
  }


  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
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
   border-radius: 0.234375rem;
   background-color: #fff;
}
.mark{
  width: 8.75rem;
  height: 4.375rem;
  position: fixed;
  top: 50%;
  left: 50%;
  margin-top:(-4.375rem/2) ;
    margin-left:(-8.75rem/2) ;
  
  z-index: 100;
  border-radius: 0.234375rem;
  border: 8px solid rgba(0, 0, 0, 0.4);

}
.icon-box{
  padding-top: 0.28125rem;
  text-align: center;
  img{
    display: inline-block;
    width: 1.21875rem;
    height: 1.21875rem;
  }
}
.shuru{
  text-align: center;

}
.shuruinput{

   display: block;
   margin: 0 auto;
   width: 6.25rem;
   height: 0.6875rem;
   line-height: 0.6875rem;
   outline:none;
   border-radius:0.078125rem;
   border: 1px solid #8d8d8d;
  text-align: center;
  background-color: #e6fffe;
  margin-top: 0.15625rem;
   

}
.duihuan-btn{

  width: 3.90625rem;
  height: 0.78125rem;

  background-image:  url(../../images/navbg.png);
         background-size: 1px 0.78125rem;
        background-repeat: repeat-x;
  margin: 0 auto;
  margin-top: 0.3125rem;
  background-color: #ff0000;
  color: #fff;
  text-align: center;
  line-height:0.78125rem ;
  border-radius:0.078125rem;
 
}
</style>
