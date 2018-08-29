<template>
  <div class="listContent" >
    <ul v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10">
      <li v-for="img in list">
        <img :src="img.thumb" alt="" @click = 'go_content(img)'>
        <p class="nametile" @click = 'go_content(img)'>{{img.name}}</p>
        <div class="list-pric">
           <span class="left">￥{{img.price}}</span><br>
            <p class="r-sliver"><span class="bgn" ><img src="../../images/rfan.png" alt=""></span>{{img.return_silver_ticket}}<span>银票</span></p>
        </div>
        <span class="right" @click='addcar(img)'>
          <img src="../../images/gouwuLogo.png" alt="">
        </span>
      </li>
    </ul>
    <div class="no"  v-if='isTrue'>
     <img  src="../../images/souNo.png" alt="">
    </div>
  </div>

</template>

<script>
import {mapGetters,mapActions} from 'vuex'
import {Toast} from 'mint-ui'
import { InfiniteScroll } from 'mint-ui'
  export default {
    created  () {
      var cat_id = this.$route.params.cat_id
      console.log(cat_id +"catid")
      var InputVal = this.$route.params.keyword
      this.sousuo = this.$route.params.keyword
      this.brandId = this.$route.params.brandId
      console.log(this.brandId == 'undefind' )
      if(this.brandId == 'undefind'){
        if(cat_id == 'undefind'){
          this.$http.get(this.apiUrl,{params:{
          keyword: InputVal
        }})
          .then((data) => {
       
             if(data.data.error == 99){
              this.isTrue = true
             return
            }else {
              this.isTrue = false
              this.list = data.body.data;
            }
          })
          .catch(function(err) {
          })
        }else{
         this.$http.get(this.apiUrl,{params:{
          type: 1,
          catId: cat_id
        }})
          .then((data) => {

             if(data.data.error == 99){
              this.isTrue = true
             return
            }else {
              this.isTrue = false
               this.list = data.body.data;
            }
          })
          .catch(function(err) {
          })
        }
      }else{
        this.$http.get(this.apiUrl,{params:{
          brandId: this.brandId,
          page: 1
        }})
          .then((data) => {
             if(data.data.error == 99){
              this.isTrue = true
             return
            }else {
              this.isTrue = false
              this.list = data.body.data;
            }
          })
          .catch(function(err) {
          })
      }
    },
    props: {
    // 只检测类型
    InputValS: String,
  },
    data: function () {
      return {
        gridColumns: ['customerId', 'companyName', 'contactName', 'phone'],
        gridData: {},
        keyword:'',
        apiUrl: 'index/productList',
        headers: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
        list: '',
        isTrue:false,
        sousuo:'',
        return_silver_ticket:'',
        page:1,
        brandId:''
      }
    },
    methods:{
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
      loadMore() {
        var cat_id = this.$route.params.cat_id
        var InputVal = this.$route.params.keyword
        this.sousuo = this.$route.params.keyword
        this.brandId = this.$route.params.brandId
        this.page++
        console.log(this.page)
        if(this.brandId == 'undefind'){
        if(cat_id == 'undefind'){
          this.$http.get(this.apiUrl,{params:{
          keyword: InputVal,
          page:this.page
        }})
          .then((data) => {
             if(data.data.error == 99){
               return
            }else {
              this.isTrue = false
              
            }
            this.list = this.list.concat(data.body.data)
          })
          .catch(function(err) {
          })
        }else{
         this.$http.get(this.apiUrl,{params:{
          type: 1,
          catId: cat_id,
          page:this.page
        }})
          .then((data) => {
             if(data.data.error == 99){
              return
            }else {
              this.isTrue = false
               
            }
            this.list = this.list.concat(data.body.data)
          })
          .catch(function(err) {
          })
        }
      }else{
        this.$http.get(this.apiUrl,{params:{
          brandId: this.brandId,
          page:this.page
        }})
          .then((data) => {
           
             if(data.data.error == 99){
             return
            }else {
              this.isTrue = false
            
            }
             this.list = this.list.concat(data.body.data)
          })
          .catch(function(err) {
          })
      }
   
       }
    },
    computed:mapGetters([
          'InputVal'
      ]),
    watch: {
      InputVal:function  (val, oldVal) {
        this.$http.get(this.apiUrl,{params:{
          keyword: val
        }})
          .then((data) => {
            this.$el.scrollTop = 0;
            if(data.data.error == 99){
              return
            }else {
              this.isTrue = false
            }
            this.list = data.body.data;
          })
          .catch(function(err) {
          })
      },
      InputValS:function(a,b){
        if(a == ''){
           var cat_id = this.$route.params.cat_id
          if(cat_id == 'undefined'){
        this.$http.get(this.apiUrl,{params:{
          keyword: this.sousuo
        }})
          .then((data) => {
           this.$el.scrollTop = 0;
             if(data.data.error == 99){
             return
            }else {
              this.isTrue = false
            }
            this.list = data.body.data;
          })
          .catch(function(err) {
          })
          }else {
          this.$http.get(this.apiUrl,{params:{
          type: 1,
          catId: cat_id
        }})
          .then((data) => {
             this.$el.scrollTop = 0;
             if(data.data.error == 99){
             this.isTrue = true

            }else {
              this.isTrue = false
            }
            this.list = data.body.data;
          })
          .catch(function(err) {
          })
          }
        }else {
          this.$http.get(this.apiUrl,{params:{
          keyword: a
        }})
          .then((data) => {
             this.$el.scrollTop = 0;
            if(data.data.error == 99){
             this.isTrue = true

            }else {
              this.isTrue = false
            }
            this.list = data.body.data;
          })
          .catch(function(err) {
          })
        }
      }
    }
  }
</script>

<style lang="scss" rel="stylesheet/scss" >

.r-sliver{
  margin-left: 0.234375rem;

  float: right;
  color:#ff0000;
   clear: both;
  font-size: 0.375rem;
   overflow: hidden;
   height: 0.46875rem;
   line-height:0.46875rem;
  span:nth-child(1){
      display: inline-block;
    width: 0.296875rem;
    margin-right: 4px;

    img{
         position: relative;
         top: 0.03125rem;
         display: inline-block;
         max-width: 100%;
         height: auto;
       }
  }
  span:nth-child(2){

       display: inline-block;
       height: 0.46875rem;
       line-height:0.46875rem ;
       vertical-align: top;
    font-size:0.3125rem ;
  }
}
.list-pric{
  float: left;
}
.listContent{
  width: 10rem;
  margin-left: 0.15625rem;
  background-color: #efefef;
  position: absolute;
  top: 1.134375rem;
  height: 100%;
  padding-bottom:30%;
  overflow-y: scroll;
   -webkit-overflow-scrolling:touch;
  ul{
    list-style: none;
    margin: 0;
    padding:0;
    overflow: hidden;
    padding-top:0.3125rem;
     -webkit-overflow-scrolling:touch;
    li{
   
      width: 4.6875rem;
      display: inline-block;
      padding-bottom: 0.28125rem;
      background-color:#fff;
      margin-top: 0.15625rem;
      border:1px solid #aaabab;
      img{

        width:100%;
        height:4.6875rem;
      }
      .nametile{
        font-size: 0.375rem;
        padding: 0.46875rem 0.234375rem;
        overflow: hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
      }
      .left{
        font-size: 0.375rem;
        padding-left:0.234375rem;
        color: #666464;
      }
      .right{
        display: block;
        float: right;
        width: 1.25rem;
        margin-right: 0.234375rem;
        text-align: right;
        img{
          width: 0.625rem;
          height: auto;
        }
      }
    }
    li:nth-child(even){
      margin-left: 0.15625rem;
    }
  }
}
.no{
  width: 100%;
  line-height: 3.125rem;
  text-align: center;
  img{
    display: inline-block;
    width: 100%;
    height: auto;
  }
}
</style>
