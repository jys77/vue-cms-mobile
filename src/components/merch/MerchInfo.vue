<template>
    <div class="merch-container">

        <div class="mui-card">
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <mt-swipe :auto="4000">
                        <mt-swipe-item v-for="photo in merchinfo.photos" :key='photo'>
                        <img :src="photo" alt="" >
                        </mt-swipe-item>
                    </mt-swipe>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">{{merchinfo.title}}</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <div class="price">
                        <span class="new">${{merchinfo.new_price}}</span>
                        <span class="old">${{merchinfo.old_price}}</span>
                    </div>
                    <div>
                        <div>
                            <span>Qty:</span>  
                            <div class="mui-numbox" data-numbox-min='1' data-numbox-max='9'>
					            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                                <input id="test" class="mui-input-numbox" type="number" value="1" />
                                <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				            </div>
                        </div>
                        <p class="button">
                            <mt-button plain type="default" size="small">Add to Cart</mt-button>
                            <mt-button plain type="default" size="small">Buy Now</mt-button>
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mui-card">
            <div class="mui-card-header">About this item</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>Stock: {{merchinfo.stock}}</p>
                    <p>Added Time: {{merchinfo.add_Date | DateFormat }}</p>
                </div>
            </div>
        </div>

    </div>

    
</template>

<script>
export default {
    data(){
        return {
            merchId: this.$route.params.merchId,
            merchinfo: []
        }
    },
    created(){
        this.getmerchinfo()
    },
    mounted(){
        mui('.mui-numbox').numbox()
    },
    methods: {
        getmerchinfo(){
            this.$http.get('http://localhost:3030/api/getmerchinfo?merchId=' + this.merchId).then(result =>{
                if(result.body.status === 0) {
                    this.merchinfo = result.body.merch
                }
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.merch-container {
    background-color: #eee;
    overflow: hidden;
    .mint-swipe {
        text-align: center;
        height: 200px;
        .mint-swipe-item {
            img {
            height: 100%;
                }
        }   
    }
    .mui-card-content-inner{
        .new {
            font-size: 20px;
        }
        .old {
            font-size: 18px;
            color:gray;
            margin-left: 10px;
            text-decoration: line-through;
        }
        
    }
}

p.button {
    margin-top: 8px;
}

div.price {
    margin-bottom: 8px;
}
</style>
