import Vue from 'vue'
import app from './App.vue'
import './lib/MUI/css/mui.min.css'
import 'mint-ui/lib/style.css'
import './lib/MUI/css/icons-extra.css'
import { Header, Swipe, SwipeItem } from 'mint-ui'
import VueRouter from 'vue-router'
import router from './router.js'
import VueResource from 'vue-resource'
Vue.use(VueRouter)
Vue.use(VueResource)
Vue.component(Header.name, Header)
Vue.component(Swipe.name, Swipe)
Vue.component(SwipeItem.name, SwipeItem)

var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router
})