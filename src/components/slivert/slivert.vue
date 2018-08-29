<template>
 <div class="wrap-page">
   <slivert-head></slivert-head>
   
   <sliver-list></sliver-list>
 
   <bottom-footer></bottom-footer>
 </div>
</template>

<script >
  import slivertHead from './slivertHead.vue'
  import sliverList from './sliverList.vue'
  import bottomFooter from '../index/Footer.vue'
  export default {
    components: {
      slivertHead,
      sliverList,
      bottomFooter
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.wrap-page{
  background-color: #f3f3f3;
}
</style>