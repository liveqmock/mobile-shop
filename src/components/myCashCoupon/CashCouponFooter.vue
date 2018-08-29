<template>
  <footer class="CashFooter">
     <span class="CashFooter-span" @click="backtoindex">返回首页</span>
  </footer>
</template>

<script>

export default {
  components: {
  },
  data () {
    return {
    }
  },
  methods:{
    backtoindex () {
     this.$router.push('/')
   }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.CashFooter{
  height: 3.125rem;
  width: 10rem;
  position: fixed;
  bottom:0;
  z-index: 99;
  background-color: #FFF;
  .CashFooter-span{
     display: block;
    height: 0.78125rem;
    width: 3.90625rem;
 background:#77bc1f;
    margin: 0 auto;
    border-radius:0.078125rem;
    color: #fff;
    font-size: 0.40625rem;
    line-height: 0.78125rem;
    text-align: center;
    margin-top: 1.5625rem - 0.390625rem;
  }
}
</style>
