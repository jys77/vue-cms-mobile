<template>
    <div>
        <div id="slider" class="mui-slider ">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', item.id == 0 ? 'mui-active': '']" v-for="item in categories" :key='item.id'>
                        {{item.title}}
                    </a>
                </div>
            </div> 
        </div>

        <!-- Photos Stream-->
        <ul class="photo-list">
            <li v-for="item in imageslist" :key="item.url">
                <img v-lazy="item.img_url">
                <div class="info">
                    <h1 class="info-title">{{item.title}}</h1>
                    <div id="info-abstract">{{item.abstract}}</div>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
import mui from '../../lib/MUI/js/mui.min.js'

export default {
    data() {
        return {
            categories: [],
            // TODO:
            // Simulated list
            imageslist: [
                {cat: 1,
                title:'Lorem ipsum dolor sit amet',
                img_url: 'https://ps.ssl.qhmsg.com/sdr/400__/t010b3b6bf8f83e1627.jpg',
                abstract: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '},
                {cat: 2,
                title:'Lorem ipsum dolor sit amet',
                img_url: 'https://ps.ssl.qhmsg.com/sdr/400__/t01226dc17e16d728a8.jpg',
                abstract: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '},
                {cat: 3,
                title:'Lorem ipsum dolor sit amet',
                img_url: 'https://p2.ssl.qhimgs1.com/sdr/400__/t0123fe8d82d2ed9212.jpg',
                abstract: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '},
                {cat: 1,
                title:'Lorem ipsum dolor sit amet',
                img_url: 'https://ps.ssl.qhmsg.com/sdr/400__/t017f2c961bcc527456.jpg',
                abstract: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '},
                {cat: 2,
                title:'Lorem ipsum dolor sit amet',
                img_url: 'https://p2.ssl.qhimgs1.com/sdr/400__/t01a84ff852ee87c63e.jpg',
                abstract: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '},
                {cat: 3,
                title:'Lorem ipsum dolor sit amet',
                img_url: 'https://ps.ssl.qhmsg.com/sdr/400__/t0114097632bf53551f.jpg',
                abstract: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '},
                {cat: 1,
                title:'Lorem ipsum dolor sit amet',
                img_url: 'https://p1.ssl.qhimgs1.com/sdr/400__/t015efe2715634266b1.jpg',
                abstract: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '},
                {cat: 2,
                title:'Lorem ipsum dolor sit amet',
                img_url: 'https://ps.ssl.qhmsg.com/sdr/400__/t0135f64ac322208e48.jpg',
                abstract: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '},
                {cat: 3,
                title:'Lorem ipsum dolor sit amet',
                img_url: 'https://p0.ssl.qhimgs1.com/sdr/400__/t01c92aa6ad4689b604.jpg',
                abstract: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '},
                {cat: 1,
                title:'Lorem ipsum dolor sit amet',
                img_url: 'https://p0.ssl.qhimgs1.com/sdr/400__/t01f9eb4362fab0106a.jpg',
                abstract: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '},
                {cat: 2,
                title:'Lorem ipsum dolor sit amet',
                img_url: 'https://p0.ssl.qhimgs1.com/sdr/400__/t01caea0ac026bfba10.jpg',
                abstract: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '},
                {cat: 3,
                title:'Lorem ipsum dolor sit amet',
                img_url: 'https://p2.ssl.qhimgs1.com/sdr/400__/t01081b55df950869ee.jpg',
                abstract: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '},
                {cat: 1,
                title:'Lorem ipsum dolor sit amet',
                img_url: 'https://p2.ssl.qhimgs1.com/sdr/400__/t014b43d9e0062bf042.jpg',
                abstract: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '},
                {cat: 2,
                title:'Lorem ipsum dolor sit amet',
                img_url: 'https://ps.ssl.qhmsg.com/sdr/400__/t0184c244e241eb10cf.jpg',
                abstract: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '},
                {cat: 3,
                title:'Lorem ipsum dolor sit amet',
                img_url: 'https://ps.ssl.qhmsg.com/sdr/400__/t017429cd502a577d4f.jpg',
                abstract: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. '},
            ]
        }
    },
    created(){
        this.getAllCategories()
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
	        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods: {
        getAllCategories(){
            this.$http.get('http://localhost:3000/getallcategories').then(result => {
                if(result.body.status === 0) {
                    this.categories = result.body.message
                    this.categories.unshift({ title: 'All', id: '0'})
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>

.photo-list {
    list-style: none;
    margin: 0;
    padding: 10px;
    padding-bottom: 0;
    li{
        background-color: #ccc;
        text-align: center;
        margin-bottom: 20px;
        box-shadow: 0 0 9px #999;
        position: relative;
        img {
            width: 100%;
            vertical-align: middle;
        } 
        img[lazy=loading] {
            width: 40px;
            height: 300px;
            margin: auto;
        }
    }
}

.info {
    color: white;
    text-align: left;
    position: absolute;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.4);
    max-height: 84px;
    .info-title {
        font-size: 14px;
        
    }
    .info-abstract {
        font-size: 13px;
        
    }
}

* {
    touch-action: pan-y;
}
</style>


