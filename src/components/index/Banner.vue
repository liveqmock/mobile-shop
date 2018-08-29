<template>
 <mt-swipe :auto="autoTime" :showIndicators="showInd">
   <mt-swipe-item v-for="item in swiperSlides"><a   :href="item.banner_url||'javascript:void(0)'"><img  :src="item.banner_pic?item.banner_pic:item.pic" alt=""></a></mt-swipe-item>
</mt-swipe>
</template>

<script>
export default {
  data() {
      return { }
 },
props:{
  swiperSlides:{
    type:Array
  },

  autoTime:{
    type:Number,
    default:5000
  },
  showInd:{
    type:Boolean
  }
 }
}
</script>

<style lang="scss"  rel="stylesheet/scss" scoped>
 
 
 
</style>
