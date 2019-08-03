<template>
    <div class="merch-container">
        <transition
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>  
        </transition>
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
                            <div class="mui-numbox" data-numbox-min='1'>
					            <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                                <input id="test" class="mui-input-numbox" type="number" value="1" ref="numbox" @change="countChanged"/>
                                <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
				            </div>
                        </div>
                        <p class="button">
                            <mt-button plain type="default" size="small" @click="addToCart">Add to Cart</mt-button>
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
            merchinfo: [],
            ballFlag: false,
            count: 1
        }
    },
    created(){
        this.getmerchinfo()
    },
    mounted(){
        this.muiJS('.mui-numbox').numbox()
    },
    watch: {
    merchinfo() {
      this.muiJS(".mui-numbox")
        .numbox()
        .setOption("max", this.merchinfo.stock);
    }
  },
    methods: {
        getmerchinfo(){
            this.$http.get('getmerchinfo?merchId=' + this.merchId).then(result =>{
                if(result.body.status === 0) {
                    this.merchinfo = result.body.merch
                }
            })
        },
        addToCart(){
            this.ballFlag = !this.ballFlag;

            const merchinfo = {
                id: this.merchId,
                count: this.count,
                price: this.merchinfo.new_price,
                selected: true
            }

            this.$store.commit('addToCart', merchinfo)
        },
        beforeEnter(el) {
            el.style.transform = "translate(0, 0)"
        },
        enter(el,done) {
            const ballPosition = this.$refs.ball.getBoundingClientRect();
            const cartPosition = document.getElementById('badge').getBoundingClientRect();
            const xDist = cartPosition.left - ballPosition.left;
            const yDist = cartPosition.top - ballPosition.top;
            el.offsetWidth;
            el.style.transform = `translate(${xDist}px, ${yDist}px)`;
            el.style.transition ="all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done()
        },
        afterEnter(el) {
            this.ballFlag = !this.ballFlag
        },
        countChanged(){
            let count = parseInt(window.event.target.value);
            if (count > this.merchinfo.stock) count = this.merchinfo.stock;
            this.count = count;
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

    
    div.ball {
        height: 15px;
        width: 15px;
        border-radius: 50%;
        background-color: red;
        position:absolute;
        z-index: 99;
        top:408px;
        left:108px;
    }
}

p.button {
    margin-top: 8px;
}

div.price {
    margin-bottom: 8px;
}
</style>
