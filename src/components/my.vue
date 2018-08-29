<template>
  <div class="wrap-pag">
    <my-content></my-content>
    <bottom></bottom>
  </div>
</template>

<script>
import myContent from './my/mycontent.vue'
import bottom from './index/Footer.vue'
import { InfiniteScroll } from 'mint-ui'
 import { MessageBox } from 'mint-ui';
export default {
  components: {
    myContent,
    bottom
  },
  data(){
    return{}
  },
  methods:{}
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>

  .head-portrait{
    height: 5.9375rem;
    overflow:hidden;
    .portrait{
      height: 3.125rem;
      width: 3.125rem;
      border-radius: 50%;
      background-color: #cecece;
      margin: 0.625rem auto 0;
    }
    .head-text{
      margin-top: 0.578125rem;
      width: 100%;
      text-align: center;
      .text{
        font-size: 0.453125rem;
      }
      p{
        font-size: 0.515625rem;
      }
    }
  }
  .my-order{
    padding: 0 0.3125rem;
    height: 0.78125rem;
    div{
      background-color: #efefef;
      height: 100%;
      line-height: 0.78125rem;
      position: relative;
      span{
        margin-left: 0.3125rem;
        font-size: 0.34375rem;
        color: black;
      }
      img{
        width: 0.21875rem;
        height: 0.1875rem;
        position: absolute;
        right: 0.9375rem;
        top: 50%;
        margin-top: -0.09375rem;
      }
    }
  }
  .my-nav{
    height: 0.88125rem;
    padding: 0 0.3125rem;
    ul{
      height: 100%;
      width: 100%;
      display: flex;
      list-style: none;
      margin: 0;
      padding: 0;
      margin-top: 0.125rem;
      li{
        flex:1;
        text-align: center;
        span{
          font-size: 0.21875rem;
        }
        img{
          display: block;
          width: 0.4375rem;
          height: 0.390625rem;
          margin: 0 auto;
        }
      }
    }
  }
  .my-nav-list{
    padding: 0 0.3125rem;
    ul{
      height: 100%;
      width: 100%;
      list-style: none;
      margin: 0;
      padding: 0;
      li{
        height: 1.234375rem;
        width: 100%;
        border-top: 1px solid #efefef;
        line-height: 1.234375rem;
        position: relative;
        span{
          margin-left: 0.3125rem;
        }
        img{
          width: 0.21875rem;
          height: 0.1875rem;
          position: absolute;
          right: 0.9375rem;
          top: 50%;
          margin-top: -0.09375rem;
        }
      }
      li:last-child(){
        border-bottom: 1px solid #efefef;
      }
    }
  }
</style>
