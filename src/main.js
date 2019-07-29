import Vue from 'vue'
import app from './App.vue'
import './lib/MUI/css/mui.min.css'
import 'mint-ui/lib/style.css'
import './lib/MUI/css/icons-extra.css'
import VueRouter from 'vue-router'
import router from './router.js'
import VueResource from 'vue-resource'
import moment from 'moment'
Vue.use(VueRouter)
Vue.use(VueResource)
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
    router
})