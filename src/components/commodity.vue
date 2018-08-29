<template>
  <div class="wrap-page">
    <topheader></topheader>
    <bottomfooter></bottomfooter>
  </div>
</template>

<script type="text/ecmascript-6">
  import goodsList from './list/commodity-list.vue'
  import topheader from './list/commodity-header.vue'
  import bottomfooter from './index/Footer.vue'
  export default {
    components:{
      topheader,
      bottomfooter
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrap-page{
  background-color: #efefef;
}
</style>
