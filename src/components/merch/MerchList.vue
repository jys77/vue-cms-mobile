<template>
    <div>
        <!-- Merch List -->
        <div class="merch-list">
            <div class="merch" v-for="merch in merchList" :key="merch._id">
                <router-link :to="'merchinfo/' + merch._id" tag="div">
                    <div class="thumbnail">
                        <img :src="merch.photos[0]">
                        <h1 class="title">{{ merch.title }}</h1>
                    </div>
                    <div class="info">
                        <div class="price">
                            <span class="now">${{merch.new_price}}</span>
                            <span class="old">${{merch.old_price}}</span>
                        </div>
                        <div class="sell">
                            <span>Stock: {{merch.stock}}</span>
                        </div>
                    </div>
                </router-link>
            </div>
        </div>
        <!-- Load More -->
        <mt-button plain type="default" size="large" @click="loadMore">Load More</mt-button>
    </div>
</template>

<script>
export default {
    data(){
        return {
            page: 1,
            merchList: []
        }
    },
    created(){
        this.getMerchList()
    },
    methods: {
        getMerchList(){
            this.$http.get('getmerch?page=' + this.page).then(result => {
                if(result.body.status === 0) {
                    this.merchList = this.merchList.concat(result.body.merch)
                }
            })
        },
        loadMore(){
            this.page ++;
            this.getMerchList()
        }
    }
}
</script>

<style lang="scss" scoped>
.merch-list {
    display: flex;
    flex-wrap: wrap;
    padding: 8px;
    justify-content: space-between;
    .merch {
        width: 49%;
        border: 1px solid #ccc;
        box-shadow: 0 0 7px #ddd;
        margin: 4px 0;
        padding: 2px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 300px;
        .thumbnail {
            img {
                width: 100%;
            }
            .title {
                font-size: 14px;
                padding: 5px;
                overflow: hidden
            }
        }
        .info {
            background-color: #eee;
            padding: 5px;
            .price {
                display: flex;
                .now {
                    font-weight: bold;
                    font-size: 16px;
                }
                .old {
                    text-decoration: line-through;
                    font-size: 14px;
                    margin-left: 10px;
                }
            }
            .sell {
                font-size: 13px;
            }
        }
    }
}
</style>
