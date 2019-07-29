<template>
<div>
    <ul class="mui-table-view">
        <li class="mui-table-view-cell mui-media" v-for='(item,index) in newslist' :key='index'>
            <router-link :to="'newsinfo/' + item._id ">
                <img class="mui-media-object mui-pull-left" :src="item.img_url">
                <div class="mui-media-body">
                    <h3>{{ item.title }}</h3>
                    <p class='mui-ellipsis'>
                        <span>{{ item.add_time | DateFormat }}</span>
                        <span>{{ item.clicked }} clicked</span>
                    </p>
                </div>
            </router-link>
        </li>
    </ul>
</div>    
</template>

<script>

import { Toast } from 'mint-ui'

export default {
    data(){
        return {
            newslist: []
        }
    },
    created(){
        this.getNewsList()
    },
    methods: {
        getNewsList(){
            this.$http.get('http://localhost:3030/api/getnews').then(result => {
                if(result.body.status === 0){
                    this.newslist = result.body.news
                }else {
                    Toast('Failed to load news list.')
                }
            })
        }
    },
    
}
</script>

<style lang="scss" scoped>
.mui-media-body {
    h3 {
        font-size: 14px
    }
    .mui-ellipsis {
        font-size: 12px;
        color :rgb(54, 50, 50);
        display: flex;
        justify-content: space-between;
    }
}
</style>
