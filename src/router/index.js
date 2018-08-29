 import Vue from 'vue'
 import Router from 'vue-router'
 import index from 'components/index'

 Vue.use(Router)
 export default new Router({
     routes: [{
         path: '/',
         name: 'index',
         meta: {
             title: '首页'
         },
         component: index
     }, {
         path: '/classify/:catId?/:active?',
         name: 'classify',
         meta: {
             title: '分类'
         },
         component: resolve => require(['components/classify'], resolve)
     }, {
         path: '/brand',
         name: 'brand',
          meta: {
             title: '分类'
         },
         component: resolve => require(['components/brand'], resolve)
     }, {
         path: '/shopcar',
         name: 'shopcar',
            meta: {
             title: '购物车'
         },
         component: resolve => require(['components/schopcar'], resolve)
     }, {
         path: '/my',
         name: 'my',
             meta: {
             title: '个人中心'
         },
         component: resolve => require(['components/my'], resolve)
     }, {
         path: '/slivert',
         name: 'slivert',
         meta: {
             title: '开始当家'
         },
         component: resolve => require(['components/slivert/slivert'], resolve)
     }, {
         path: '/commodityList/:keyword?/:cat_id?/:brandId?',
         name: 'commodityList',
             meta: {
             title: '搜索结果'
         },
         component: resolve => require(['components/commodity'], resolve)
     }, {
         path: '/guestSever',
         name: 'guestSever',
             meta: {
             title: '联系客服'
         },
         component: resolve => require(['components/guestSever'], resolve)
     }, {
         path: '/suggest',
         name: 'suggest',
             meta: {
             title: '帮助反馈'
         },
         component: resolve => require(['components/suggest'], resolve)
     }, {
         path: '/orderContent/:orderSn/:type',
         name: 'orderContent',
             meta: {
             title: '订单列表'
         },
         component: resolve => require(['components/orderContent/orderContent'], resolve)
     }, {
         path: '/prodetail/:prodetailId/:goodsAttrId',
         name: 'prodetail',
             meta: {
             title: '商品详情'
         },
         component: resolve => require(['components/prodetail'], resolve)
     }, {
         path: '/newaddress',
          name: 'newaddress',
             meta: {
             title: '新增地址'
         },
         component: resolve => require(['components/newaddress'], resolve)
     }, {
         path: '/addresslist/:cartId?/:AddressID?/:goodsId?/:order?/:goodsAttrId?/:goodsNum?',
         name: 'addresslist',
             meta: {
             title: '地址列表'
         },
         component: resolve => require(['components/addresslist'], resolve)
     }, {
         path: '/comment/:goodsId:/isGood',
         name: 'comment',
             meta: {
             title: '评论列表'
         },
         component: resolve => require(['components/comment'], resolve)
     }, {
         path: '/surorder/:cartId/:goodsAttrId?/:goodsNum?/:goodsId?',
         name: 'surorder',
             meta: {
             title: '确认订单'
         },
         component: resolve => require(['components/surorder'], resolve)
     }, {
         path: '/couponList',
         name: 'couponList',
             meta: {
             title: '优惠券列表'
         },
         component: resolve => require(['components/couponList'], resolve)
     }, {
         path: '/silverTicketList',
         name: 'silverTicketList',
             meta: {
             title: '银票明细'
         },
         component: resolve => require(['components/yinpiaorecord'], resolve)
     }, {
         path: '/addressedit',
         name: 'addressedit',
        
         component: resolve => require(['components/addressedit'], resolve)
     }, {
         path: '/feedback',
         name: 'feedback',
             meta: {
             title: '帮助反馈'
         },
         component: resolve => require(['components/feedback'], resolve)
     }, {
         path: '/releasecomment/:orderSon',
         name: 'releasecomment',
             meta: {
             title: '发表评论'
         },
         component: resolve => require(['components/releasecomment'], resolve)
     }, {
         path: '/instructions',
         name: 'instructions',
             meta: {
             title: '银票说明'
         },
         component: resolve => require(['components/instructions'], resolve)
     }, {
         path: '/myCashCoupon/:type',
         name: 'myCashCoupon',
             meta: {
             title: '现金券'
         },
         component: resolve => require(['components/myCashCoupon'], resolve)
     }, {
         path: '/afterSalesService/:orderSn/:goodsId/:goodsAttrId',
         name: 'afterSalesService',
            
             meta: {
             title: '申请售后'
         },
         component: resolve => require(['components/afterSalesService'], resolve)
     }, {
         path: '/service/:servicetype/:orderSn/:goodsId/:goodsAttrId',
         name: 'service',
           
             meta: {
             title: '售后选择'
         },
         component: resolve => require(['components/service/service'], resolve)

     }, {
         path: '/serviceinfo/:orderSn/:goodsId/:goodsAttrId',
         name: 'serviceinfo',
            
             meta: {
             title: '售后详情'
         },
         component: resolve => require(['components/serviceinfo/serviceinfo'], resolve)
     }, {
         path: '/phonefare',
         name: 'phonefare',
             meta: {
             title: '话费充值'
         },
         component: resolve => require(['components/phonefare/phonefare'], resolve)
     }, {
         path: '/telhisList',
         name: 'telhisList',
             meta: {
             title: '充值记录'
         },
         component: resolve => require(['components/telhisList'], resolve)
     }, {
         path: '/selectServerGood',
         name: 'selectServerGood',
             meta: {
             title: '售后商品列表'
         },
         component: resolve => require(['components/selectServerGood'], resolve)
     }, {
         path: '/unpaidorderList',
         name: 'unpaidorderList',
             meta: {
             title: '我的订单'
         },
         component: resolve => require(['components/orderlist/UnpaidOrderList'], resolve)
     }, {
         path: '/ReceiveOrderlist',
         name: 'ReceiveOrderlist',
              meta: {
             title: '我的订单'
         },
         component: resolve => require(['components/orderlist/ReceiveOrderlist'], resolve)
     }, {
         path: '/evaluateOrderlist',
         name: 'evaluateOrderlist',
              meta: {
             title: '我的订单'
         },
         component: resolve => require(['components/orderlist/evaluateOrderlist'], resolve)
     }, {
         path: '/aftersaleOrderlist',
         name: 'aftersaleOrderlist',
              meta: {
             title: '我的订单'
         },
         component: resolve => require(['components/orderlist/aftersaleOrderlist'], resolve)
     }, {
         path: '/doneOrderlist',
         name: 'doneOrderlist',
        meta: {
             title: '我的订单'
         },
         component: resolve => require(['components/orderlist/doneOrderlist'], resolve)
     },
      {
         path: '/searchAdress',
         name: 'searchAdress',
              meta: {
             title: '商品搜索'
         },
         component: resolve => require(['components/searchAdress'], resolve)
     },
      {
         path: '/exchargecoupon',
         name: 'exchargecoupon',
          meta: {
             title: '开始当家'
         },
         component: resolve => require(['components/exchargecoupon'], resolve)
     },
      {
         path: '/onecoupon',
         name: 'onecoupon',
              meta: {
             title: '开始当家'
         },
         component: resolve => require(['components/onecoupon'], resolve)
     },
      {
         path: '/searchGoods',
         name: 'searchGoods',
              meta: {
             title: '商品搜索'
         },
         component: resolve => require(['components/searchGoods/searchGoods'], resolve)
     }]
 })