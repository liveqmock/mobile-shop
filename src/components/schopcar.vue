<template>
  <div class="wrap-page">
  
    <shop-content></shop-content>
      <bottom></bottom>
  </div>
</template>

<script type="text/ecmascript-6">
import bottom from './index/Footer.vue'
import shopContent from './shopcar/shop-content.vue'
import ToTal from './shopcar/shoptatal.vue'
export default {
  components: {
    bottom,
    shopContent,
    ToTal
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrap-page{
  background-color: #f3f3fe;
}
</style>
