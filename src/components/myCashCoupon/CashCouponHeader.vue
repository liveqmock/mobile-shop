<template>
  <div class="cashHeader">
    <header class="mint-header " style="padding-left:0">
      <h1 class="mint-header-title"><i @click="go_my" class="mintui mintui-back" style="color:#909090;float:left"></i>我的现金券</h1> 
     
    </header>
  </div>
</template>

<script>
import { Header } from 'mint-ui';
export default {
  components: {
 
  },
  data(){
    return{

    }
  },
  methods:{
    go_my:function () {
      this.$router.push('/my')
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
header{
  width: 100%;

}
.cashHeader{
  padding: 0 0.3125rem;
  position: fixed;
  width: 10rem;
  top: 0;
}
.mint-header{
  height: 1.171875rem;
  background-color: #fff;
  border-bottom:1px solid #aaabab;
  font-size: 0.375rem;
}
.mintui-back:before {
  color: #898989 !important;
}
.mint-header-title{
  width: 100%;
  height: 1.171875rem;
  line-height: 1.171875rem;
  color: #898989;
}
</style>
