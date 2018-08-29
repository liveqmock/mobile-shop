<template>
<div class="wrap-page">
      <v-header></v-header>
      <v-content></v-content>
      <v-footer></v-footer>
</div>
</template>

<script type="text/ecmascript-6">
import Top from './brand/input.vue'
import Bottom from './index/Footer.vue'
import ClassifyHeader from './brand/classify-header.vue'
export default {
  components: {
    "v-header":Top,
    "v-footer":Bottom,
    "v-content":ClassifyHeader
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
