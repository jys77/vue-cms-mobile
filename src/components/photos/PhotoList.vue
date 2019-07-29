<template>
    <div>
        <div id="slider" class="mui-slider ">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
                <div class="mui-scroll">
                    <a :class="['mui-control-item', type == 'All' ? 'mui-active':'']" v-for="type in types" :key="type" @click="getPhotosByType(type)">{{type}}</a>
                </div>
            </div> 
        </div>

        <!-- Photos Stream-->
        <ul class="photo-list">
            <li v-for="item in photos" :key="item._id">
                <router-link :to="'/home/photodetail/' + item._id">
                    <img v-lazy="item.phos[parseInt(Math.random() * item.phos.length || 0)]">
                    <div class="info">
                        <div class=" info-title">{{item.intro}}</div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
import mui from '../../lib/MUI/js/mui.min.js'
import { Toast } from "mint-ui"

export default {
    data() {
        return {
            types: [],
            photos: []
        }
    },
    created(){
        this.getAllTypes()
        this.getPhotosByType('All')
    },
    mounted(){
        mui('.mui-scroll-wrapper').scroll({
	        deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
        });
    },
    methods: {
        getAllTypes(){
            this.$http.get('http://localhost:3030/api/getphotypes').then(result => {
                if(result.body.status === 0) {
                    this.types = result.body.types
                    this.types.unshift("All")
                }
            })
        },
        getPhotosByType(type){
            if(type != undefined) this.type = type
            this.$http.get('http://localhost:3030/api/getphos?type=' + this.type).then(result => {
                if(result.body.status != 0) {
                    return Toast('No photos!')
                }
                this.photos = result.body.phos
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
    // touch-action: pan-x;
    touch-action: pan-y;
}
</style>


