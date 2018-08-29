<template>
<div>
  <div class="nav">
      <div class="left" v-for="(val,key) in nav" >
         <span v-html = 'val.text' :style = "val.border" @click = "go_nav(key)"></span>
      </div>
  </div>
  <CashCouponList :type = 'type'></CashCouponList>
  <CashCouponFooter></CashCouponFooter>
</div>
</template>

<script>
import CashCouponList from './CashCouponList.vue'
import CashCouponFooter from './CashCouponFooter'
export default {
  components: {
 
  },
  created(){
    this.types = this.$route.params.type
     for(let i in this.nav){
          this.nav[i].border = ''
        }
    this.nav[this.types].border="border-bottom: 0.125rem solid  #77bc1f;"    
  },
  data(){
    return{
      nav:{
        0:{
          text:'所有明细',
          border:'border-bottom: 0.125rem solid #77bc1f;'
        },
        1:{
          text:'收入记录',
          border:''
        },
        2:{
          text:'消费记录',
          border:''
        }
      },
      type:''
    }
  },
  methods:{
      go_nav: function (key) {
        for(let i in this.nav){
          this.nav[i].border = ''
        }
        this.nav[key].border="border-bottom: 0.125rem solid  #77bc1f;"
        this.type = key;
        this.$router.push({name:'myCashCoupon',params: { type: key }})
      }
  },
  components: {
    CashCouponList,
    CashCouponFooter
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.nav{
  height: 1.53125rem;
  width: 100%;
  background-color: #efefef;
  border-top: 1px solid  #77bc1f;
  border-bottom: 1px solid #77bc1f;
  display: flex;

  div{
    flex:1;
    span{
      display: block;
      height: 100%;
      width: 1.5625rem;
      text-align: center;
      line-height: 1.53125rem;
      margin:0 auto;
      font-size: 0.34375rem;
      color: #909090;
    }

  }

}
</style>
