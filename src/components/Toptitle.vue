<template>
  <header>
    <section :style="{ color: activeColor}"  class="top-title" >
    <h1 class="title">
    <a href="" :style="{ color: activeColor}"   @click.stop="backtoprv"><i class="mintui mintui-back"></i> </a>{{msg}}</h1>
</section>
</header>
</template>
<script >
 export default {
    props:{
      msg:{
        type:String

      },
      activeColor:{
         type:String,
         default:'#909090'
      }

    },
    methods:{
    	 backtoprv(){
        this.$router.go(-1)
     }
    }
  }
</script>
<style>
.top-title {
  padding: 0 0.3125rem;
  background-color: #fff;
}
.title {
  color: #909090;
  position: relative;
  text-align: center;
  height: 1.1785rem;
  line-height:1.1785rem;
  font-size: 0.4375rem;
  border-bottom: 1px solid #cacaca;
  font-weight: normal; }
.title a {
  color: #909090;
  text-decoration: none;
  float: left; }
</style>
