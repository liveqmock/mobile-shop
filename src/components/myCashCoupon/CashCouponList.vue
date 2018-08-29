<template>
  <div class="Cash-list">
      <ul>
        <li v-for="list in content">
          <div class="list-left">
            <p>{{list.use_cash_coupons_name}}</p>
            <p>订单号：{{list.order_id}}</p>
          </div>
          <div class="list-right">
            <p>{{list.cash_coupons_num}}</p>
            <p>{{list.create_time | shijian}}</p>
          </div>
        </li>
      </ul>
  </div>
</template>

<script>

export default {
  components: {},
  created () {
    this.types = this.$route.params.type;
    if (this.types == 0) {
      this.$http.get(this.apiUrl)
             .then((data) => {
              this.content = data.data.data
              for(let i = 0; i < this.content.length; i++){
                if (this.content[i].type == 2) {
                  this.content[i].cash_coupons_num = "-"+this.content[i].cash_coupons_num;
                }else  {
                  this.content[i].cash_coupons_num = "+"+this.content[i].cash_coupons_num;
                }
              }
             })
             .catch(function(err) {
                
             })
    }else{
       this.$http.get(this.apiUrl,{params:{
          type: this.types
       }})
        .then((data) => {
               this.content = data.data.data
              for(let i = 0;i<this.content.length;i++){
                if (this.content[i].type == 2) {
                  this.content[i].cash_coupons_num = "-"+this.content[i].cash_coupons_num;
                }else  {
                  this.content[i].cash_coupons_num = "+"+this.content[i].cash_coupons_num;
                }
              }
             })
        .catch(function(err) {
                
             })
    }
  },
  props: {
    // 只检测类型
    type: String,
  },
  data(){

    return{
      types:'',
      content:'',
      apiUrl: 'index/cashCouponsList',
        headers: {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
          }
        },
    }
  },
  methods:{
   
  },
  watch:{
    type:function  (val, oldVal) {
      if (val == 0 ) {
       this.$http.get(this.apiUrl)
             .then((data) => {
              this.content = data.data.data
              for(let i = 0;i<this.content.length;i++){
                if (this.content[i].type == 2) {
                  this.content[i].cash_coupons_num = "-"+this.content[i].cash_coupons_num;
                }else  {
                  this.content[i].cash_coupons_num = "+"+this.content[i].cash_coupons_num;
                }
              }
             })
             .catch(function (err) {
                
             })
      }else {
         this.$http.get(this.apiUrl,{params:{
          type: val
        }})
        .then((data) => {
          this.content = data.data.data
              for(let i = 0; i < this.content.length; i++){
                if (this.content[i].type == 2) {
                  this.content[i].cash_coupons_num = '-'+this.content[i].cash_coupons_num
                }else  {
                  this.content[i].cash_coupons_num = '+'+this.content[i].cash_coupons_num
                }
              }
             })
        .catch( function (err, data) {
        })
      }
    },
    content: function (val, oldVal) {
      this.content = val
    }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.Cash-list{
    overflow: scroll;
    -webkit-overflow-scrolling:touch;
    padding-bottom:  3.125rem;
  ul{
    padding:0 0.9375rem;
    list-style: none;
    margin:0;
    width: 100%;
    li{
      display: flex;
      height: 1.6875rem;
      border-bottom: 1px solid #dcdddd;
      div{
       
        padding-top:0.46875rem;
      }
      .list-left{
         flex:2;
        p:nth-child(1){
          font-size: 0.34375rem;
          padding-bottom:0.15625rem;
        }
        p:nth-child(2){
          font-size: 0.25rem;
          color: #9fa0a0;
        }
      }
      .list-right{
         flex:1;
        text-align: right;
        p:nth-child(2){
          font-size: 0.25rem;
          color: #9fa0a0;
        }
        p:nth-child(1){
          font-size: 0.34375rem;
          padding-bottom:0.15625rem;
        }
      }
    }
  }
}
</style>
