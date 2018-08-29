// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import store from './vuex/store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import "babel-polyfill";
Vue.use(MintUI);
/* eslint-disable no-new */
Vue.use(VueResource)
Vue.use(require('vue-wechat-title'))
Vue.http.options.root = 'http://dx.xddtech.com/';
new Vue({
  el: '#app',
  router,
  VueResource,
  store,

  template: '<App/>',
  components: {
    App
  },
})

export {
  router,
  store,
  VueResource
}

var jsApiList = ['checkJsApi', 'onMenuShareTimeline',
  'onMenuShareAppMessage', 'onMenuShareQQ',
  'onMenuShareWeibo', 'hideMenuItems', 'showMenuItems',
  'hideAllNonBaseMenuItem', 'showAllNonBaseMenuItem',
  'getNetworkType', 'hideOptionMenu', 'showOptionMenu',
  'closeWindow', 'chooseImage', 'previewImage', 'uploadImage', 'downloadImage', 'scanQRCode', 'getLocation'
];
var jsticket = {
  appId:'', //suik
  timestamp: '',
  nonceStr: '',
  signature: ''
};
Vue.http.get('index/signature?currentUrl=' + location.href).then((res) => {
    var data = res.body;
    if (200 == res.status) {
        jsticket.timestamp = data.timestamp;
        jsticket.nonceStr = data.noncestr;
        jsticket.signature = data.signature;
        jsticket.appId = data.appid;
        wx.config({
            debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
            appId: jsticket.appId, // 必填，公众号的唯一标识
            timestamp: jsticket.timestamp, // 必填，生成签名的时间戳
            nonceStr: jsticket.nonceStr, // 必填，生成签名的随机串
            signature: jsticket.signature, // 必填，签名，见附录1

            // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            jsApiList: jsApiList
        });
    }
});
Vue.filter('shijian', function(val) {
    var timestamp = val
    var d = new Date(timestamp * 1000);
    var date = (d.getFullYear()) + "-" +
        (d.getMonth() + 1) + "-" +
        (d.getDate())
    return date
})

if (document.getElementById('loading')) {
   document.getElementById('loading').style.display="none"
}



// var obj = {"A":[{
// "title":"阿三",

// },
// {
// "title":"阿五",

// }],
// "B":[{
// "title":"本色",
// "title":"本色",
// },
// {
// "title":"不是",

// }],
// }
// var  all;
// var str ='a'
// var  reg = new RegExp(""+str+"",'img')
// console.log(reg)
// for (var a in obj) {
//   console.log(a)
//    if (reg.test(a)) {
//       all = obj[a];
//    }
// }
//  console.log(all)
//  for (var i  of all) {
//     console.log(i.title )
//  }


