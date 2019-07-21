import VueRouter from 'vue-router'
import HomeContainer from './components/tabbar/HomeContainer.vue'
import CartContainer from './components/tabbar/CartContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsList from './components/news/NewsList.vue'
import NewsInfo from './components/news/NewsInfo.vue'

var router = new VueRouter({
    routes: [
        {path:'/', redirect: '/home'},
        {path: '/home', component: HomeContainer},
        {path: '/cart', component: CartContainer},
        {path: '/member', component: MemberContainer},
        {path: '/search', component: SearchContainer},
        {path: '/home/newslist', component: NewsList},
        {path: '/home/newsInfo/:id', component: NewsInfo}
    ],
    linkActiveClass: 'mui-active'
})

export default router