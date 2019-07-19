<template>
    <div>
    <mt-swipe :auto="4000">
        <mt-swipe-item v-for="item in swipelist" :key='item.img'>
            <img :src="item.img" alt="">
        </mt-swipe-item>
    </mt-swipe>

    <ul class="mui-table-view mui-grid-view mui-grid-9">
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu1.png" alt="">
                <div class="mui-media-body">News</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu2.png" alt="">
                <div class="mui-media-body">Pictures</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">Shopping</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">Comments</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">Videos</div></a></li>
        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">Contact Us</div></a></li>
    </ul> 

    </div>
</template>

<script>
import { Toast } from 'mint-ui' 

export default {
    data(){
        return {
            swipelist: []
        }    
    },
    created(){
        this.getSwipe()
    },
    methods: {
        getSwipe(){
            this.$http.get('http://localhost:3000/getswipe').then(result => {
                // console.log(result.body)
                if (result.body.status == 0) {
                    this.swipelist = result.body.message
                    // Toast('Fetched!')
                } else {
                    Toast('Failed to fetch!')
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.mint-swipe {
    height: 200px;
    .mint-swipe-item {
        img {
            width: 100%;
            height: 100%;
        }
    }
}
.mui-grid-view.mui-grid-9 {
    background-color: #fff;
    border: none;
    img {
        height: 60px;
        width: 60px;
    }
    .mui-media-body {
        font-size: 13px;
    }
}
.mui-grid-view.mui-grid-9 .mui-table-view-cell {
    border: 0
}
</style>
