<template>
 <div class="wrap-page">
    <div class="the-title">
                <h1 ><a @click="backtoprv" href="javascript:void(0)"><i class="mintui mintui-back" style="color:#909090"></i></a>发表评论</h1>
        </div>
        <div class="list-cn">
        <div class="r-list">

          <div class="relist-m" v-if="item.is_evaluation==0"  v-for="item in goodsList">
           <div class="list-top">
              <div class="left-img">
                <img :src="item.thumb"  alt="">
              </div>
              <p>{{item.name}}{{item.localIds.length<4}}</p>
              <div class="cameral" >
                <img v-for="phsimg in item.localIds"  :src="phsimg" >
                <img @click="setphoto(item)" v-if="item.localIds.length<4"  src="../images/photo.png"   alt="">
              </div>
            </div>
            <div class="inputbox-r">
              <textarea @keyup ="changeHeight"  v-model="item.comvalue" placeholder="输入评价：" class="textarea"></textarea>
            </div>
            <div class="rs-boottom">
              <div class="star-list">
                      <span @click="setCommentvalue(item,star,index)" v-for="(star,index) in item.starlist" :class="star"></span>
                     </div>
                     <span class="com-button" @click="releaseComment(item)">发表评价</span>

            </div>
          </div>


           </div>
           <div class="comment-btnbox">
          <span @click="toindex">返回首页</span>

        </div>
        </div>
        
 </div>
</template>

<script >
import Vue from 'vue'
import { MessageBox } from 'mint-ui'
export default {
  data () {
    return {
      apiUrl: 'index/orderInfo',
      releaseCommentURL: 'Shop/index/addEvaluation',
      comments: null,
      comvalue: null,

      itemClasses: ['star-item2', 'star-item2', 'star-item2', 'star-item2', 'star-item2'],
      headers: {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      },
      goodsList: []
    }
  },
  methods: {
  // 上传照片
    setphoto (item) {
     
      item.serverId = []
      var vm = this
      wx.chooseImage({
        count: 4, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          var localIds = res.localIds
          vm.uploadimg(item, localIds)
        }
      })
    },
    // 上传图片
    uploadimg (item, localIds) {
      var vm  =this;
      var localId = localIds.pop()
          item.localIds.push(localId)
      wx.uploadImage({
            localId: localId,
        isShowProgressTips: 1,
            success: function(res) {
             var  serverId = res.serverId
              item.serverId.push(serverId)
              if(localIds.length > 0){
                vm.uploadimg(item, localIds)
              }
            }
          });
    },
    // 点击星星设置评论值
    setCommentvalue(item, star, index) {
      let nlenth = index + 1;

      if (nlenth == 1) {
        item.starlist = ['star-item2', 'star-item', 'star-item', 'star-item', 'star-item'];
        item.star = 1;
      }
      if (nlenth == 2) {
        item.starlist = ['star-item2', 'star-item2', 'star-item', 'star-item', 'star-item'];
        item.star = 2;
      }
      if (nlenth == 3) {
        item.starlist = ['star-item2', 'star-item2', 'star-item2', 'star-item', 'star-item']
        item.star = 3;
      }
      if (nlenth == 4) {
        item.starlist = ['star-item2', 'star-item2', 'star-item2', 'star-item2', 'star-item'];
        item.star = 4;
      }
      if (nlenth == 5) {
        item.starlist = ['star-item2', 'star-item2', 'star-item2', 'star-item2', 'star-item2'];

        item.star = 5;
      }



    },
    // 返回上一个路由
    backtoprv() {
      this.$router.go(-1)
    },

    toindex() {
      this.$router.push('/')
    },
    // 发表评论
    releaseComment(item) {

      var addEvaluationParams = {
        orderId: this.$route.params.orderSon,
        goodsId: item.goods_id,
        goodsAttrId: item.goods_attr_id,
        content: item.comvalue,
        starRating: item.star,
        picId: item.serverId
      }
     
      if (item.comvalue == '') {
        MessageBox.alert('评价内容不能为空')
      } else  if (item.comvalue.length < 5) {
        MessageBox.alert('评价内容不能少于5个字')
      }else {
         this.$http.post(this.releaseCommentURL,addEvaluationParams
        ,this.headers)
        .then((res) => {
          if (res.body.error == 0) {
            MessageBox.alert('评价成功').then(()=>{
              this.$router.push('/evaluateOrderlist')
            });
             
            
          } else {
            MessageBox.alert('发表评价失败，请稍后再试')
          }
        })
        .catch(function(err) {
          console.log(err)
        })
      }
    },
    // 改变输入框的高度
    changeHeight(event){


    var autoTextarea = function (elem, extra, maxHeight) {

        extra = extra || 0;
        var isFirefox = !!document.getBoxObjectFor || 'mozInnerScreenX' in window,
          isOpera = !!window.opera && !!window.opera.toString().indexOf('Opera'),
          addEvent = function(type, callback) {

            elem.addEventListener(type, callback, false)
          },
          getStyle = elem.currentStyle ? function(name) {
            var val = elem.currentStyle[name];

            if (name === 'height' && val.search(/px/i) !== 1) {
              var rect = elem.getBoundingClientRect();
              return rect.bottom - rect.top -
                parseFloat(getStyle('paddingTop')) -
                parseFloat(getStyle('paddingBottom')) + 'px';
            };

            return val;
          } : function(name) {
            return getComputedStyle(elem, null)[name];
          },
          minHeight = parseFloat(getStyle('height'));

        elem.style.resize = 'none';

        var change = function() {
          var scrollTop, height,
            padding = 0,
            style = elem.style;

          if (elem._length === elem.value.length) return;
          elem._length = elem.value.length;

          if (!isFirefox && !isOpera) {
            padding = parseInt(getStyle('paddingTop')) + parseInt(getStyle('paddingBottom'));
          };
          scrollTop = document.body.scrollTop || document.documentElement.scrollTop;

          elem.style.height = minHeight + 'px';
          if (elem.scrollHeight > minHeight) {
            if (maxHeight && elem.scrollHeight > maxHeight) {
              height = maxHeight - padding;
              style.overflowY = 'auto';
            } else {
              height = elem.scrollHeight - padding;
              style.overflowY = 'hidden';
            };
            style.height = height + extra + 'px';
            scrollTop += parseInt(style.height) - elem.currHeight;
            document.body.scrollTop = scrollTop;
            document.documentElement.scrollTop = scrollTop;
            elem.currHeight = parseInt(style.height);
          };
        };

      addEvent('propertychange', change);
      addEvent('input', change);
      addEvent('focus', change);
      change();
    };
      autoTextarea(event.target)


    }
  },

  created() {

    this.$http.post(this.apiUrl, {
        orderSn: this.$route.params.orderSon
      }, this.headers)
      .then((res) => {

        if (res.body.error == 0) {
          this.goodsList = res.body.data.goods;
          this.goodsList.forEach((item, index) => {
            this.$set(item, 'starlist', this.itemClasses);
            this.$set(item, 'star', 5);
            this.$set(item, 'comvalue', '');
            this.$set(item, 'cammeral', [this.photoImg]);
             this.$set(item, 'localIds', []);
             this.$set(item, 'serverId', [])

          });



        }
})
      .catch(function (err) {
        console.log(err)
      })
  }
}

</script>
<style lang="scss" rel="stylesheet/scss" scoped>
.list-cn{
  width: 100%;
  padding-bottom: 1rem;
  background: #efeff0;
}
.cameral{

  img{
    width: 1.578125rem;

    float: left;
    margin-right: 0.15625rem;
  }
}
.wrap-page{
  background: #efeff0;

}
.list-top{
  overflow: hidden;
  height: 2.53125rem;

}

.the-title{
  background-color: #fff;
  height: 1.15625rem;
  font-size: 0.4375rem;
  color: #909090;
  padding: 0 0.3125rem;

  a{
    float: left;
    color: #909090;
    text-decoration: none;
  }

  h1{
    text-align: center;
    font-size: 0.4375rem;
    font-weight: 400;
    height: 1.15625rem;
    line-height:  1.15625rem;
    border-bottom:1px solid #c9caca;
  }
}

.relist-m{
  margin: 0.3125rem auto 0;
  padding-top: 0.3125rem;
  width: 9.375rem;
  overflow: hidden;
  padding-bottom: 0.375rem;
  background-color: #fff;
  p{
    width: 6rem;
   white-space: nowrap;
   text-overflow: ellipsis;
    overflow: hidden;
    margin-left: 0.3125rem;
    float: left;
    color: #666464;
  }
}
.left-img{
  margin-left: 0.3125rem;
   float: left;
  width: 1.71875rem;
  height: 1.71875rem;
  line-height:1.71875rem ;
  border: 1px solid #cecece;
  text-align: center;
  img{



    width: 100%;
    height: 100%;
  }

}
.cameral{
  float: right;
  margin-right: 0.3125rem;
  margin-top: 0.4375rem;

  height: 1.578125rem;
  img{

    height: 100%;
  }
}
.inputbox-r{
  width: 8.75rem;
  min-height: 0.5625rem;
  margin: 0 auto;
  margin-top: 18px;
  textarea{
    overflow-y:visible;
    outline:none;
    display: inline-block;
    width: 100%;
    height: 0.46875rem;
    border: none;
    border-bottom: 1px solid #c9caca;
    text-align: left;
    border-radius: none;
  }
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
.rs-boottom{
  padding-top: 0.3125rem;
  overflow: hidden;
}
.star-list{
  padding-top: 0.25rem;
  float: left;
  margin-left: 0.3125rem;
}
.com-button{
  float: right;
  margin-right: 0.3125rem;
  display: inline-block;
  width: 2.34375rem;
  height: 0.6875rem;
  text-align: center;
  line-height:0.6875rem ;
  background-color: #77bc1f;
  color: #fff;
  border-radius: 0.125rem;
  font-size: 0.4375rem;
}
.comment-btnbox{
  width: 100%;
 
    margin-top:20px;
  background-color: #efeff0;
 text-align: center;
  span{

    display: inline-block;

    width: 3.90625rem;
    height: 0.65625rem;
    line-height: 0.65625rem;
    color: #fff;
    border-radius: 0.078125rem;
    background:#77bc1f
 }
}
</style>
