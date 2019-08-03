import Vue from 'vue'
import app from './App.vue'
import './lib/MUI/css/mui.min.css'
import muiJS from './lib/MUI/js/mui.min.js'
Vue.prototype.muiJS = muiJS
import 'mint-ui/lib/style.css'
import './lib/MUI/css/icons-extra.css'
import VueRouter from 'vue-router'
import router from './router.js'
import VueResource from 'vue-resource'
import moment from 'moment'
Vue.use(VueRouter)
Vue.use(VueResource)

Vue.http.options.root = 'http://localhost:3030/api'



import Vuex from 'vuex'
Vue.use(Vuex)


const cart = JSON.parse(localStorage.getItem('cart') ||'[]')

const store = new Vuex.Store({
    state: {
      cart: cart
    },
    mutations: {
      addToCart(state, merchinfo){
        let flag = false
        state.cart.some(item => {
            if(item.id == merchinfo.id) {
                item.count += parseInt(merchinfo.count)
                flag = true;
                return true;
            }
        })
        if(!flag) state.cart.push(merchinfo)

        localStorage.setItem('cart', JSON.stringify(state.cart))
      },
      removeFromCart(state,id) {
        state.cart.some((item, i)=> {
          if(item.id == id) {
            state.cart.splice(i, 1)
            return true
          }
        })
        localStorage.setItem('cart', JSON.stringify(state.cart))
      },
      updateMerchSelected(state, info){
        state.cart.some(item => {
          if(item.id == info.id) {
            item.selected = info.selected
          }
        })
        localStorage.setItem('cart', JSON.stringify(state.cart))
      }
    },
    getters:{
        getAllCount(state){
            let c = 0;
            state.cart.forEach(item => {
                c  += item.count
            })
            return c
        },
        getMerchCount(state){
          var o = {};
          state.cart.forEach(item => {
            o[item.id] = item.count
          })
          return o
        },
        getMerchSelected(state){
          var o = {};
          state.cart.forEach(item => {
            o[item.id] = item.selected
          })
          return o
        },
        getMerchCountAndAmount(state){
          var o = {
            count: 0,
            amount: 0
          }
          state.cart.forEach(item => {
            if(item.selected) {
              o.count += item.count
              o.amount += item.price * item.count
              o.amount = parseFloat(o.amount.toFixed(2))
            }
          })
          return o
        }
    }
  })


// import { Header, Swipe, SwipeItem, Lazyload } from 'mint-ui'
// Vue.component(Header.name, Header)
// Vue.component(Swipe.name, Swipe)
// Vue.component(SwipeItem.name, SwipeItem)
// Vue.use(Lazyload);

import MintUI from 'mint-ui'
Vue.use(MintUI);

// import preview from 'vue-photo-preview'
// import 'vue-photo-preview/dist/skin.css'
// Vue.use(preview)
import VViewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
Vue.use(VViewer)

Vue.filter('DateFormat', function(DateStr, Format = ('YYYY/MM/DD HH:mm:ss')){
    return moment(DateStr).format(Format)
})

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})