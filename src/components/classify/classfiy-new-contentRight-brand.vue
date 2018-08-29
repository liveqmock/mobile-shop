  <template>
    <div class="content-brand">
      <ul>
        <li v-for="img in brand" @click = "brandClick(img)">
          <img :src="img.brand_thumb">
        </li>
      </ul>
    </div>
  </template>

  <script type="text/ecmascript-6">
  import { Indicator } from 'mint-ui';
  import goodlist from './classfiy-new-contentRight-list.vue'
  export default {
      data: function () {
        return{
          brandIsTrue:false,
          brandlistUrl: 'index/productList',
          list:[],
          path:'',
          listIsTrue:false
        }
      },
      props:{
        brand:{
          type:Array
          }
        },
    created: function () {
     
    },
    mounted:function(){
  
    },
    methods: {
      //点击品牌 进入 品牌商品列表
      brandClick(img){
        // this.$router.push('/classify/brand/'+img.brand_id)
        this.$http.get(this.brandlistUrl,{params:{
          brandId: img.brand_id,
          page: 1
        }})
          .then((data) => {
             if(data.data.error == 99){
              this.list = []
            }else {
              this.list = data.body.data;
            }
            this.$emit("brandClick",this.list)
          })
          .catch(function(err) {
            
          })
      }
    },
    components:{
      "goodlist":goodlist
    }
  }
  </script>

  <style lang="scss" rel="stylesheet/scss" scoped>
  .content-brand{
    position: fixed;
    left: 2.253333rem;
    width: calc(10rem - 2.253333rem);
    height: calc(100% - 2.840625rem);
    top: 1.44rem;
    background-color: #f3f3f3;
    overflow-y: scroll;
    ul{
      list-style: none;
      margin: 0;
      padding:0;
      padding-left:0.333333rem;
      padding-bottom:0.4rem;
      overflow: hidden;
      li{
        width: 3.333333rem;
        height: 3.333333rem;
        background-color: #FFF;
        float: left;
        margin-top: 0.4rem;
        img{
          width: 100%;
          height: 100%;
        }
      }
      li:nth-child(2n){
        margin-left: 0.4rem;
      }
    }
  }
  </style>
