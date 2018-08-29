import Vue from 'vue'
import Vuex from 'vuex'
import {router} from '../main'
import { Toast } from 'mint-ui';
import 'mint-ui/lib/style.css'
Vue.use(Vuex)
const state = {
  // TODO: 放置初始状态
  InputVal:'搜索',
  slivert:'',
  item:'',
  carnum:'',
  orderNum:{},
  current:0

}
// 创建一个对象存储一系列我们接下来要写的 mutation 函数
const mutations = {
  // TODO: 放置我们的状态变更函数
  seekFn(state){

  },
  slivert(state){

  },
  addcar(state){

  },
  restCarnum(state){

  },
  resetsliver(state){

  },
  getOrderNum(state){

  }
}
const actions = {
  // TODO: 放置我们的状态变更函数
  getOrderNum:({commit})=>{
     Vue.http.get("index/orderListTypNum")
      .then((res) => {
       
        
          state.orderNum = res.body.data;
        
     
      })
      .catch(function(err) {
        console.log(err)
      })
     commit('getOrderNum')
  },
  seekFn:({commit},InputVal)=>{
    console.log(InputVal)
    if(InputVal == ''){
      return ''
    }else {
      state.InputVal=InputVal
      router.push({name: 'commodityList',params: {keyword:InputVal,cat_id:"undefind",brandId:'undefind'}})
      commit('seekFn')
    }
  },
  addcar:({commit},item)=>{
    if (item.stock == 0) {
       Toast({
              message: '没有库存了',
              position: 'bottom',
              duration: 1000
           });
        return 
    }
  
Vue.http.get('index/setCart', {
      params: {
        goodsId: item.id,
        goodsNum: 1,
        goodsAttrId: item.goods_attr_id
      }
    })
      .then((res) => {
        
        if(res.body.error!=0){
          Toast({
            message: res.body.msg,

            duration: 500
          });
        }else{

          Toast({
            message: '添加成功',
            duration: 500,
          })
          // 添加成功更新数量
          Vue.http.get('index/cartNum')
            .then((res) => {
              if(res.body.error==0){
             
                state.carnum = res.body.data;
                state.carnum >100?state.carnum='99+':state.carnum;
                commit('addcar')
              }
            })
            .catch(function(err) {
              console.log(err)
            })



        }}).catch(function(err) {
      console.log(err)
    })
  },
  restCarnum:({commit})=>{
    Vue.http.get('index/cartNum')
      .then((res) => {
        if(res.body.error==0){

          state.carnum = res.body.data;
         
          state.carnum >99?state.carnum='99+':state.carnum;
          commit('restCarnum')
        }
      })
      .catch(function(err) {
        console.log(err)
      })
  },
  resetsliver:({commit})=>{
    Vue.http.get('index/userInfo')
      .then((res) => {
        if(res.body.error===0) {
          let data = res.data.data;
          state.slivert = data.silver_ticket;
          state.current = data.current
          
          commit('resetsliver')
        }

      })
      .catch(function(err) {
        console.log(err)
      })
  }

}
const getters = {
  // TODO: 放置我们的状态变更函数
  InputVal(state){
    return state.InputVal
  }

}
export default new Vuex.Store({
  actions,
  mutations,
  getters,
  state
})

