<template>
 <div class="wrap-page bgggray" >
       <div v-wechat-title="$route.meta.title"></div>
 
     <top ></top>
     <index-list ref="profile"></index-list>
     <bottom v-if="showfooter"></bottom>
 </div>
</template>

<script>
import Top from './index/header.vue'
import IndexList from './index/IndexList.vue'
import Bottom from './index/Footer.vue'
export default {
  data () {
    return {
      showfooter:true,
      loading:true
    }
  },
  components: {
    Top,
    IndexList,
    Bottom,
   
  },
 mounted(){
      this.$el.querySelector('input').onfocus=()=>{
          this.showfooter=false;
      };
       this.$el.querySelector('input').onblur=()=>{
          this.showfooter=true;
      };



     this.$el.querySelector('.scroll-item').onscroll=()=> {
       
        
           this.$el.querySelector('input').blur();
           this.showfooter=true; 
          
      }
      
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss">
.bgggray{
  background-color: #f3f3f3;
}
</style>
