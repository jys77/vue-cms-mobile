import VueRouter from 'vue-router'
import HomeContainer from './components/tabbar/HomeContainer.vue'
import CartContainer from './components/tabbar/CartContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'

var router = new VueRouter({
    routes: [
        {path:'/', redirect: '/home'},
        {path: '/home', component: HomeContainer},
        {path: '/cart', component: CartContainer},
        {path: '/member', component: MemberContainer},
        {path: '/search', component: SearchContainer}
    ],
    linkActiveClass: 'mui-active'
})

export default router