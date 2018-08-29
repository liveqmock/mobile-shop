<template>
<div id="list">
  <div class="classify">
    <ul>
      <li @click.stop="greet(key)" v-for="(key,val) in content">
        <img :src="key.cat_thumb" alt="">
      </li>
    </ul>
  </div>
</div>
  
</template>

<script >
import { Indicator } from 'mint-ui';
export default {
    name:'contents',
    data: function () {
      return{
        gridColumns: ['customerId', 'companyName', 'contactName', 'phone'],
        gridData: {},
        apiUrl: 'index/catThree',
        headers: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
        content:'',
      }
    },
  created: function () {
    var vm = this;
    Indicator.open({
  text: '加载中...',
  spinnerType: 'fading-circle'
});
    this.$http.get(this.apiUrl)
      .then((data) => {
        console.log(data.data.data)
       this.content = data.data.data
      
       Indicator.close();
      })
      .catch(function(err) {
        console.log(err)
      })
  },
  methods: {
    greet: function (attr) {
      this.$router.push({name:'commodityList' ,params:{keyword:"undefind",cat_id:attr.cat_id,brandId:'undefind'}})
    },
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
#list{
  position: absolute;
  top: 0;
 
  height: 100%;
  overflow-y:scroll; 
}
  .classify{
    width: 10rem;
    padding-bottom: 1.6125rem;
    overflow: hidden;
    margin: 0 auto;
    margin-top: 1.3rem; 
    ul{
      list-style: none;
      margin: 0;
      padding: 0 0.3125rem;
      margin-top: 1.3125rem;
      overflow: hidden;
      li{
        width: 3.125rem;
        height: 3.125rem;
        float: left;
        img{
          width:100%;
          height:100%;
        }
      }
      li:nth-child(odd){

      }
     
    }
  }
</style>
