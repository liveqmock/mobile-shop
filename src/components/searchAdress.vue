<template>
  <div class="wrap-page">
    <searchHeader></searchHeader>
  </div>
</template>

<script type="text/ecmascript-6">
import searchHeader from './search/search-header.vue'
export default {
  components: {
    "searchHeader":searchHeader
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrap-page{
  background-color: #eee;
}
</style>
