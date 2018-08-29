<template>
<div class="wrap-page">
     <v-header></v-header>
      <v-content></v-content>
      <v-footer></v-footer>
</div>
</template>

<script type="text/ecmascript-6">
import Top from './classify/classfiy-new-header.vue'
import Bottom from './index/Footer.vue'
import ClassfiyContent from './classify/classfiy-new-contentLeft.vue'
export default {
  components: {
    "v-header":Top,
    "v-footer":Bottom,
    "v-content":ClassfiyContent
  },
  data(){
    return{
      a:false
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.index-header{
  top:1.175rem;
  background:#efefef;
}
</style>
