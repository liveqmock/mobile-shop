<template>
 <div class="wrap-pag">
    <div class="commmet-container">
       <toptitle msg='评论'></toptitle>    
            <div class="txt-c" v-if="hascomments">
              暂无评论
          </div>
            <div v-else class="comment-list" >
                 <div class="item-content" v-for="comment in comments">
                <div class="comment-item" >

                    <div class="vcon-left">
                        <div class="commentl-imgbox">
                            <img :src="comment.hpic" alt="">
                        </div>


                    </div>
                    <div class="right">
                        <div class="commentl-title">
                          <span>{{comment.attr_value}}</span>
                        </div>
                        <div class="comment-imgbox">
                          <div v-for=" item in comment.pic">
                             <img @click="showbigimg(item)" :src="item.pic" >
                          </div>
                        </div>
                    </div>
                </div>
                 <p :class="{hide:comment.showEllipsis}" class="commentl-container">{{comment.content}} </p>
                        <div class="comment-bt">
                           <div class="star-content"  :class="comment.star_rating">
                            <span   v-for="itemClass in new Array(Number(comment.star_rating))"  class="star-item2"></span><span   v-for="itemClass in new Array(5-Number(comment.star_rating))"  class="star-item"></span>

                          </div>
                          <div class="right" @click="pulltext(comment)">
                                {{comment.showeltext}}
                          <i :class="{jiantou:!comment.setJ,jiantoua:comment.setJ}"></i>
                          </div>
                 </div>

              </div>

            </div>
            <!--  -->
             </div>

                 <div class="btn-box">
                    <span class="indexbtn" @click="toindex">返回首页</span>
                 </div>
                 <div class="bigmark" @click="showmark=false" v-show="showmark" >
                   <img class="bigimg" :src="bigimg">
                 </div>
        </div>

  </div>

</template>

<script >
import Toptitle from './Toptitle.vue'
import Vue from 'vue'
  export default {
   data(){
     return{
      listflag:false,
      showrecomment:false,
       commmentUrl:'Shop/index/evaluationList',
       releaseCommentURL:'Shop/index/addEvaluation',
       comments:[],
       hascomments:false,
       
       showmark:false,
       bigimg:'',
      }
   },
    components: {
        Toptitle
    },
   methods:{
     // 显示大图
    showbigimg(item){
      this.showmark= true;
      this.bigimg = item.pic;
     

    },
    // 展开文字列表
    pulltext(item){
         if (item.showEllipsis) {
           this.comments.forEach((item, index) => {
                    this.$set(item, 'showEllipsis', true);
                    this.$set(item, 'showeltext', '展开');
                  });
            item.showEllipsis =false;
            item.showeltext='收起';
            item.setJ = true;
         }else{
          
           item.showEllipsis =true;
           item.showeltext='展开';
           item.setJ = false;
         }



    },
 
    toindex(){
      this.$router.push('/')
    },
     backtoprv(){
        this.$router.go(-1)
     },
   },
   created(){
     // 获得评价
       var  goodsId = this.$route.params.goodsId;
        this.$http.get(this.commmentUrl,{params:{goodsId:goodsId}})
            .then((res) => {

               if(res.body.error==0){

                 this.comments =res.data.data;

                 console.log(this.comments)
                  this.comments.forEach((item, index) => {
                    this.$set(item, 'showEllipsis', true);
                    this.$set(item, 'showeltext', '展开');
                    this.$set(item, 'setA',true);
                  });
              }else {
                this.hascomments =true;

              }

            })
            .catch(function(err) {
                console.log(err)
            })
   } 
}
 

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.txt-c{
  text-align: center;
  margin-top: 0.625rem;
}
.bigmark{
  width: 100%;
  height: 100%;
  background-color: rgba(0,0,0,0.5);
  position: fixed;
  top:0;
  left: 0;
  z-index: 99;
  text-align:center;
}
.bigimg{

  display: inline-block;
   margin-top:50%;

  width: 7.8125rem;
  height: 7.8125rem;
}
.wrap-pag{
  height: 100%;
    width: 10rem;
    margin: 0 auto;
    background-color: #eee;
}
.star-content{
  float:left;
  margin-right: 0.21875rem;

}
.star-bigitem{
  margin-left: 0.09375rem;
  margin-right: 0;
  display: inline-block;
  width: 0.546875rem;
  height:0.625rem;
  background-image: url(../images/bigemptyheart.png);
  background-size: 100% 100%;
}

.star-item{
  margin-left: 0.09375rem;
  margin-right: 0;
  display: inline-block;
  width: 0.3125rem;
  height:0.28125rem;
  background-image: url(../images/emptyheart.png);
  background-size: 100% 100%;
}
.star-item2{
    margin-left: 0.09375rem;
  display: inline-block;
 width: 0.3125rem;
  height:0.28125rem;
  background-image: url(../images/allheart.png);
  background-size: 100% 100%;
}
.commmet-container {

  background-color: #eee;
  width: 100%;



}
.commmet-title {
  background-color: #FFF;
  padding-bottom: 0.625rem;
}
.item-content{
   width:9.375rem;
  background-color: #FFF;
  margin: 0 auto;
}

.comment-item {

  display: flex;

     margin-top: 0.3125rem;
     padding-bottom: 0.15625rem;

  .vcon-left {
    display: flex;
    flex-direction: column;
    align-content: center;
    align-items: center;
    flex: 1
  }
  .right {
    flex: 3;
    margin-left: 0.15625rem;
    margin-right: 0.078125rem;
  }
}
.commentl-imgbox {
  margin-top: 0.4375rem;
  width: 1.71875rem;

  height: 1.71875rem;
  border: 1px solid #cecece;
  text-align:center;
  overflow: hidden;
  img{
    display: inline-block;
  	width: 100%;
  	height: 100%;
  }
}
.commentl-text{
  font-size: 0.25rem;
  margin-top: 0.28125rem;
   color: #666464;
}
.commentl-title{
   height: 0.9375rem;
   line-height:  0.9375rem;
  display: flex;
  justify-content:space-between;
 font-size:0.3125rem;
 color:#666464;
   span:nth-child(1){
    font-size: 0.375rem;
    margin-top: 0.09375rem;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    width: 6rem;
   }

}
.commentl-container{
  padding-top: 0.3125rem;
  margin: 0 0.28125rem;
  color: #868686;
  font-size: 0.3125rem;
  border-bottom: 1px solid #c9caca;
  &.hide{
   white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;

  }
}
.commet-select{

  position: relative;
  width:9.375rem;
   height: 0.625rem;
  margin: 0 auto;
  margin-top: 1.84375rem;
}
.comment-textarea{
   width:9.375rem;
  margin: 0 auto;
  margin-top: 0.3125rem;
}

.comment-textarea textarea{
  padding-top: 0.3125rem;
  font-size: 0.375rem;
  text-indent: 0.3125rem;
  display: block;
  width: 100%;
  height: 4.375rem;
  border-radius: 0.15625rem;
  outline: none;
}
.commet-inputbox{
  float: right;
  width: 2.34375rem;
  height: 0.625rem;
 }
.commet-select input{
  font-size: 0.375rem;
  float: right;
  width: 2.34375rem;
  height: 0.625rem;
  border: 1px solid #8d8d8d;
  outline: none;
  border-radius: 0.078125rem;
  text-align: center;
}
.comment-list-sl{
  z-index: 110;
  position: absolute;
  background-color: #FFF;
  width: 1.875rem;
  border: 1px solid #8d8d8d;
  right: 0.23438rem;;
  top: 0.625rem;
  span{
    width: 90%;
    text-align: center;
    display: block;
    margin: 0 auto;
    border-bottom: 1px solid #8d8d8d;
    height: 0.625rem;
  }
  span:nth-last-child{
     border:none;
  }
}
.comment-list{
  padding-bottom: 1.5rem;
}
.btn-box{
  width: 100%;
   position: fixed;
   bottom: 0;
 
   background-color: #eee;
   padding-bottom: 0.3125rem
}

  span.indexbtn{
    display:block;

    width: 3.90625rem;
    height: 0.65625rem;
    line-height: 0.65625rem;
    color: #fff;
    margin: 0 auto;

    text-align: center;
    border-radius: 0.078125rem;
    background:#77bc1f;
 }

.comment-bt{
  padding: 0.546875rem 0.28125rem 0.46875rem;
  overflow: hidden;
  .right{
    float: right;
    color:#646464;
  }
}
.comment-imgbox{
  margin-left: 0.15625rem;
  padding-top: 0.375rem;
  div{
    float: left;
    margin-left: 0.125rem;
    width:1.390625rem;
    height: 1.390625rem;
     line-height: 1.390625rem;
     text-align: center;
    img{
      display:inline-block;
      max-width: 100%;
      height:100%;
      vertical-align:middle;
    }
  }
}
.jiantou{
  display:inline-block;
  width:0.234375rem;
  height: 0.12rem;
  background-size: 100%;
  background-repeat:no-repeat;
  background-image: url(../images/btn-xiangxia.png)
}
.jiantoua{
  display:inline-block;
  width:0.234375rem;
  height: 0.12rem;
  background-size: 100%;
  background-repeat:no-repeat;
  background-image: url(../images/btn-xiangshang.png)
}
</style>
