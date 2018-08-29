<template>
  <div class="hahah">
    <div class="letter">
      <ul>
        <img src="../../images/02b.png" alt="">
        <li v-for="(key,val) in arr"  @click="goAnchor(val)"><a href="javascript:void()" >{{val}}</a></li>
      </ul>
    </div>
    <div class="classify">
      <ul>
        <li v-for="(key,val) in content" :id="key.initials" class="item" @click="go_classify(key)" >
          <img :src="key.brand_thumb" alt="">
        </li>
      </ul>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { Indicator, Toast } from 'mint-ui'
export default {
  name: 'contents',
  data: function () {
      return{
      gridColumns: ['customerId', 'companyName', 'contactName', 'phone'],
        gridData: {},
         apiUrl: 'index/brandList',
         headers: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
        content: '',
        arr:{
          A: '',
          B:  '',
          C:'',
          D: '',
          E: '',
          F: '',
          G: '',
          H: '',
          I: '',
          J: '',
          K: '',
          L: '',
          M: '',
          N: '',
          O: '',
          P: '',
          Q: '',
          R: '',
          S: '',
          T: '',
          U: '',
          V: '',
          W: '',
          X: '',
          Y: '',
          Z: ''
        }
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
       Indicator.close()
      })
      .catch(function(err) {
        console.log(err)
      })
  },
  methods: {
    go_classify:function (a) {
      this.$router.push({name:'commodityList',params:{keyword:"undefind",cat_id:'undefind',brandId:a.brand_id}})
    },
    goAnchor:function(selector) {
      console.log(selector);

      console.log(this.$el.querySelector);
      var anchor = this.$el.querySelector('#'+selector)
      if(anchor == null){
        return ""
      }else{
        Toast({
          message: selector,
          duration: 600
        })
        document.body.scrollTop = anchor.offsetTop - 200
      };
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.hahah{
  position: absolute;
  top: 0;
  height: 100%;
  overflow-y: scroll;
}
.letter{
  position: absolute;
  right: 0.3125rem;
  top: 2.55rem;
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
    text-align: center;
    img{
      width: 0.1875rem;
      height: 0.1875rem;
    }
    li{
      font-size: 0.309375rem;
      text-align: center;
      margin: 0;
      a{
        text-decoration: none;
        color: black;
      }
    }
  }
}

  .classify{
    width: 10rem;
    padding: 0 0.3125rem 0 0.3125rem;
    padding-bottom: 1.6125rem;
    overflow: hidden;
    padding-top: 0.5rem;
    ul{
      list-style: none;
      margin: 0;
      padding: 0;
      margin-top: 2.1125rem;
      overflow: hidden;
      margin-left: 1.09375rem;
      li{
        width: 3.125rem;
        height: 3.125rem;
        text-align: center;
        float: left;
        img{
          width:100%;
          height:auto;
        }
      }
      li:nth-child(odd){

      }
      li:nth-child(even){
        margin-left: 0.55625rem;
      }
    }
  }
</style>
