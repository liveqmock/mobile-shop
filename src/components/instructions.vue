<template>
 <div class="wrap-page">
     <toptitle  msg='关于银票和点券'></toptitle>
     <div class="sliver-info" v-html="info">

     </div>
     <div class="btn-box__in">
        <span class="rindex__in" @click="go_index">返回首页</span>
     </div>
 </div>
</template>

<script>
import Toptitle from './Toptitle.vue'
export default {
  data () {
    return {
      showInfoUrl:'index/showInfo',
      info:''
    }
  },
  methods:{
    go_index:function (argument) {
      this.$router.push('/')
    }
  },
  components:{
    Toptitle
  },
  created(){
    const ERRCODE=0;
    this.$http.get(this.showInfoUrl)
            .then((res) => {
             if(res.body.error===ERRCODE) {
                let data = res.body.data;
                   this.info = data.info
                }

            })
            .catch(function(err) {
                console.log(err)
            })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" >
.sliver-info{
  padding: 0.46875rem 0.46875rem 2.5rem 0.625rem;

}
.btn-box__in{
   background-color: #fff;
   width: 100%;
   text-align: center;
   position: fixed;
   bottom: 0;
   height: 2.34375rem;
}
.rindex__in{
   position: relative;
    top: 0.625rem;
     display: inline-block;
    width: 3.90625rem;
   width: 3.90625rem;
     padding: 0.125rem 0;
       font-size: 0.390625rem;
    color: #fff;
    text-align: center;
    margin: 0 auto;
    border-radius: 0.078125rem;
    background-color: #77bc1f;
}
img{
   max-width: 100%;
   height: auto;
}
</style>
