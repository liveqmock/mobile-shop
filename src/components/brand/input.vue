<template>
    <div class="index-header">
        <span v-if='msg' class="cs" @click="showCityModel=!showCityModel">{{cityText}}</span>

        <div class="search-input-box">
        <form action="#" onsubmit="return false;">
        <input type="text" name=""  @focus="showIcon=false"  @blur="showIcon=true"  @keyup.enter="seekFn(InputVal)" v-model='InputVal' placeholder="">
        </form>
        <img v-show="showIcon" src="../../images/seekBtn.png" alt="">
        </div>


         <!-- 地址 -->
        <div  v-show="showCityModel" class="popup warehouse-win-pop" style="display: block; opacity: 1;">
             <a @click="showCityModel=false" href="javascript:void(0)" class="J-close-wh close-btn">
             x
            </a  >
        <div class="warehouse-win">
         <div class="modal-header">
            <h3 class="tit"><span class="hj icons-rocket"></span>选择收货地址，火速配送哦</h3>
            </div>
            <div class="modal-body J-modal-body">
            <div class="modal-message">
                <div class="ui-xx clearfix">
                    <h4>我们猜您在</h4>
                    <ul class="ui-list-li">
                        <li>
                            <a href="javascript:;" >{{cityText}}</a>
                        </li>
                    </ul>
                    <h4>华北地区</h4>
                    <ul class="ui-list-li">
                        <li>
                            <a href="javascript:;">北京</a>
                        </li>
                        <li>
                            <a href="javascript:;" >天津</a>
                        </li>
                        <li>
                            <a href="javascript:;" >河北</a>
                        </li>
                        <li>
                            <a href="javascript:;" >山西</a>
                        </li>
                        <li>
                            <a href="javascript:;">内蒙古</a>
                        </li>
                    </ul>
                    <h4>华南地区</h4>
                    <ul class="ui-list-li">
                        <li>
                            <a href="javascript:;" >广东</a>
                        </li>
                        <li>
                            <a href="javascript:;" >广西</a>
                        </li>
                        <li>
                            <a href="javascript:;" >河南</a>
                        </li>
                        <li>
                            <a href="javascript:;" >湖北</a>
                        </li>
                        <li>
                            <a href="javascript:;" >湖南</a>
                        </li>
                        <li>
                            <a href="javascript:;">海南</a>
                        </li>
                    </ul>
                    <h4>华东地区</h4>
                    <ul class="ui-list-li">
                        <li>
                            <a href="javascript:;" >上海</a>
                        </li>
                        <li>
                            <a href="javascript:;" >江苏</a>
                        </li>
                        <li>
                            <a href="javascript:;" >浙江</a>
                        </li>
                        <li>
                            <a href="javascript:;" >安徽</a>
                        </li>
                        <li>
                            <a href="javascript:;" >福建</a>
                        </li>
                        <li>
                            <a href="javascript:;">江西</a>
                        </li>
                        <li>
                            <a href="javascript:;" >山东</a>
                        </li>
                    </ul>
                    <h4>西南地区</h4>
                    <ul class="ui-list-li">
                        <li>
                            <a href="javascript:;" >重庆</a>
                        </li>
                        <li>
                            <a href="javascript:;" >四川</a>
                        </li>
                        <li>
                            <a href="javascript:;" >贵州</a>
                        </li>
                        <li>
                            <a href="javascript:;" >云南</a>
                        </li>
                        <li>
                            <a href="javascript:;" >西藏</a>
                        </li>
                    </ul>
                    <h4>东北地区</h4>
                    <ul class="ui-list-li">
                        <li>
                            <a href="javascript:;" >辽宁</a>
                        </li>
                        <li>
                            <a href="javascript:;" >吉林</a>
                        </li>
                        <li>
                            <a href="javascript:;" >黑龙江</a>
                        </li>
                    </ul>
                    <h4>西北地区</h4>
                    <ul class="ui-list-li">
                        <li>
                            <a href="javascript:;" >陕西</a>
                        </li>
                        <li>
                            <a href="javascript:;" >甘肃</a>
                        </li>
                        <li>
                            <a href="javascript:;" >青海</a>
                        </li>
                        <li>
                            <a href="javascript:;" >宁夏</a>
                        </li>
                        <li>
                            <a href="javascript:;">新疆</a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div class="modal-header">
            <h3 class="tit"><span class="hj"></span>选择最近收货地址，送货更快哦</h3>
        </div>
    </div>
</div>

</div>


</template>

<script >
import {mapGetters, mapActions} from 'vuex'
    export default {
      created(){
      },
        data(){
            return {
                  InputVal:'',
                  showIcon:true,
                  cityText:'北京',
                  showCityModel:false,
            }
        },
        props:['msg'],
    methods:mapActions([
      'seekFn'
    ]),
    mounted(){
         var vm = this;
          var selectItem = this.$el.querySelectorAll('.ui-list-li li a');
          for (var i = selectItem.length - 1; i >= 0; i--) {
              selectItem[i].onclick=function (argument) {
                  console.log(this.innerHTML)
                  vm.cityText = this.innerHTML;
                        vm.showCityModel=false
              }
          }
    }
    }
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
div.warehouse-win-pop {
    padding: 0;
    border: 4px solid rgba(0,0,0,.2);
      position: fixed;
      width: 9.375rem;
      z-index: 30;
       height: 90%;
       top: 5%;
      -webkit-overflow-scrolling: touch;

}

div.warehouse-win-pop a.close-btn {
    padding: .26667rem;
    font-size: .58667rem;
    line-height: .58667rem;
    position: absolute;
    right: 0;
    top: 0;
    color: #949595;
    z-index:100;
    text-decoration: none;
}

div.warehouse-win-pop a.close-btn i {
    font-weight: bolder
}

.warehouse-win {
    background-color: #fff;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
    width: 100%;
    height: 100%
}

.warehouse-win .modal-header {
    border-bottom: none;
    padding: .53333rem .4rem 0
}

.warehouse-win .modal-header h3.tit {
    font-size: .37333rem;
    color: #e4007e;
    font-weight: 400;
    text-align: center;
    margin: 0;
    line-height: .42667rem
}

.warehouse-win .modal-header .hj {
    display: inline-block;
    vertical-align: middle;
    margin-right: .21333rem;
    width: .77333rem;
    height: .77333rem;
    background: url(//ms2-m.vipstatic.com/static/base/img/2fef5020.rocket.png) no-repeat 50%;
    background-size: contain
}

.warehouse-win .modal-body {
    padding: 0;
    max-height: none;
    position: relative;
    overflow-y: auto
}

.warehouse-win .modal-body .modal-message {
    text-align: left;
    font-size: .42667rem;
    color: #000
}

.warehouse-win .modal-body h4 {
    padding: 0 .21333rem;
    font-size: .37333rem;
    font-weight: 400;
    line-height: .64rem;
    box-shadow: 0 1px 0 #eee;
    display: block;
    text-align: left;
    background-color: #ccc;
    color: #7c7c7c;
    text-indent: .32rem;
    position: relative
}

.warehouse-win .modal-body .ui-list-li li {
    border-top: 1px solid #f0f0f0;
    border-bottom: 1px solid #bdbdbd;
    color: #313131;
    text-align: left
}

.warehouse-win .modal-body .ui-list-li li a {
    color: #000;
    padding: .21333rem 0;
    display: block;
    margin: .13333rem .21333rem;
    text-indent: .32rem;
    font-size: .37333rem;
    font-style: normal;
      text-decoration: none;
}



    .index-header{
        z-index: 1000;
        height: 1.234375rem;
        
        background: #efefef;
        position: fixed;
        top: 1.175rem;
        padding: 0 0.3125rem 0 0.3125rem;
        span,input{
            display: inline-block;
        }
        span.cs{
            float: left;
            width: 2.03125rem;
            margin-top: 0.3125rem;
            height: 0.6875rem;
            line-height: 0.6875rem ;
            background-color: #e6fffe;
             border-radius: 0.15625rem;
              border:1px solid #b5b5b6;
              position: relative;
              text-indent: 0.5625rem;
              &:before{
                position: absolute;
                 left: 0.125rem;
                 top: ( 0.6875rem-0.390625rem)/2;
                 display: inline-block;
                 width: 0.296875rem;
                 height: 0.390625rem;
                 content:'';
                 background-image: url(../../images/dingwei.png);
                 background-size: 100% 100%;
              }
        }
        .search-input-box{
              margin-top: 0.3125rem;
              width:  9.375rem;
              position: relative;
             float: left;

        }
        input{
               box-shadow:0px 0px 0px rgba(0,0,0,0); 
            -webkit-appearance:none;
              background-color: #fff;
            border:1px solid #b5b5b6;
             outline:none;
            width: 9.375rem;
            height: 0.6875rem;
            border-radius: 0.15625rem;
            padding-left: 0.546875rem;
            font-size: 0.359375rem;
        }
        img{
            position: absolute;
            width: 1.0625rem;
            height: 0.359375rem;
            left: 50%;
            top:50%;
            margin-left:-(1.0625rem/2) ;
             margin-top:-(0.359375rem/2) ;
        }
    }
</style>
