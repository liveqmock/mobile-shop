<template>
  <div class="content-brand" v-if="listIsTrue">
    <ul v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="0">
      <li v-for="(val,key) in list"  @click = "go_content(val)">
        <div class="list-img">
          <img :src="val.thumb">
        </div>
        <div class="list-info">
          <p class="info-name">{{val.name}}</p>
          <p class="info-text">{{val.desc}}</p>
          <p class="info-money">¥&nbsp;<span>{{val.price}}</span></p>
          <p class="info-piao">返银票&nbsp;¥&nbsp;<span>{{val.return_silver_ticket}}</span></p>
          <img @click.stop="addcar(val)" class="add-car" src="../../images/addcar.png">
        </div>
      </li>
    </ul>
    <img class="souNo" v-if="imgIsTrue" src="../../images/souNo.png">  
  </div>
</template>

<script >
import { Indicator } from 'mint-ui';
import {mapGetters,mapActions} from 'vuex'
export default {
    data: function () {
      return{
        brandIsTrue:false,
        imgIsTrue:false,
        num:1
      }
    },
     props:{
        list:{
          type:Array
          },
        listIsTrue:{
          type:Boolean
        },
        catId:{
          type:String
        },
        types:{
          type:Number
        },
        scorll:{
          type:Boolean
        }
        },
  created: function () {
  
  },
  mounted:function(){

  },
  methods: {
     ...mapActions([
      'addcar'
      ]),
      go_content:function(a){
         this.$el.scrollTop = 0;
        this.$router.push({'name':'prodetail',params:{
          prodetailId:a.id,
          goodsAttrId:a.goods_attr_id
         }})
      },
      loadMore(){
        console.log(this.scorll)
        if(this.scorll == false){
         
        }else{
          this.$emit("scorllBottom",this)
        }
      }
  },
  watch:{
    list:function(){
      if(this.list.length === 0){
        this.imgIsTrue = true;
       
      }else{
        this.imgIsTrue = false;
      }
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.souNo{
  position:absolute;
  left: 50%;
  top: 30%;
  transform: translate(-50%,-50%);
}
.content-brand{
  position: fixed;
  left: 2.253333rem;
  width: calc(100% - 2.253333rem);
  height: calc(100% - 2.840625rem);
  top: 1.44rem;
  background-color: #f3f3f3;
  overflow-y: scroll;
  ul{
    list-style: none;
    margin: 0;
    padding:0;
    padding-left:0.133333rem;
    padding-right:0.133333rem;
    padding-bottom:0.133333rem;
    overflow: hidden;
    li{
      width: 100%;
      height: 3.066667rem;
      background-color: #FFF;
      margin-top: 0.133333rem;
      padding-left:0.133333rem;
      padding-right:0.36rem;
      div{
        float: left;
      }
      .list-img{
        padding:0.6rem 0;
        width: 1.866667rem;
        height: 100%;
        img{
          height: 100%;
          width: 100%;
        }
      }
      .list-info{
        margin-left: 0.266667rem;
        width: calc(100% - 2.133333rem);
        height: 100%;
        position: relative;
        .info-name{
          padding-top:0.3rem;
          font-size: 0.373333rem;
          color: #1c1c1c;
          overflow: hidden;
          text-overflow:ellipsis;
          white-space: nowrap;
        }
        .info-text{
          
          font-size: 0.346667rem;
          color: #555;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          height: 1rem;
        }
        .info-money{
          font-size: 0.4rem;
          color: #ff4700;
        }
        .info-piao{
          font-size: 0.266667rem;
          color: #999;
        }
        .add-car{
          position: absolute;
          right: 0.04rem;
          bottom:0.7rem;
          width: 0.533333rem;
          height: 0.533333rem;
        }
      }
    }
  }
}
</style>
