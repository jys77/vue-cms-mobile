<template>
    <div class="cart-container">

      <div class="merch-list">

        <div class="mui-card" v-for="(item, i) in cartlist" :key="item._id">
          <div class="mui-card-content">
            <div class="mui-card-content-inner">
              <mt-switch @change="selectedChanged(item._id, $store.getters.getMerchSelected[item._id])" v-model="$store.getters.getMerchSelected[item._id]"></mt-switch>
              <img :src="item.photos[0]" >
              <div class="info">
                <h1>{{item.title}}</h1>
                <div class="detail">
                  <span class="price">${{item.new_price}}</span>
                  <div class="mui-numbox" data-numbox-min='1' style="height:25px">
                    <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
                    <input id="test" class="mui-input-numbox" type="number" :value="$store.getters.getMerchCount[item._id]" @change="countChanged" ref="numbox" readonly />
                    <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
                  </div>
                  <a href="#" @click.prevent="remove(item._id, i)">Delete</a>
                </div>
              </div>
            </div>
          </div>
			</div>

      </div>

      <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner checkout">
						<div class="left">
              <p><span class="number">{{$store.getters.getMerchCountAndAmount.count}}</span> items selected</p>
              <p>Total: <span class="number">${{$store.getters.getMerchCountAndAmount.amount}}</span></p>
            </div>
            <mt-button plain type="primary">Checkout</mt-button>
					</div>
				</div>
			</div>
    </div>
</template>

<script>
export default {
  data(){
    return{
      cartlist: []
    }
  },
  mounted(){
    this.muiJS('.mui-numbox').numbox()
  },
  watch: {
    // item() {
    //   this.muiJS(".mui-numbox")
    //     .numbox()
    //     .setOption("max", this.item.stock);
    // }
  },
  created(){
    this.getcartlist()
  },
  methods:{
    countChanged(){
      console.log(this.$refs.numbox.value)
    },
    getcartlist(){
      let idArr = []
      this.$store.state.cart.forEach(item => idArr.push(item.id));

      if(idArr.length <= 0) {
        return
      }
      this.$http.get('getcartlist/' + idArr.join(',')).then(result => {
        if(result.body.status === 0) {
          this.cartlist = result.body.cart
        }
      })
    },
    remove(id, index){
      this.cartlist.splice(index, 1);
      this.$store.commit('removeFromCart', id)
    },
    selectedChanged(id, val) {
      this.$store.commit('updateMerchSelected', {id, selected: val})
    }
  }
}
</script>

<style lang="scss" scoped>
.cart-container {
  background-color: #eee;
  overflow: hidden;
  .merch-list {
    .mui-card-content-inner{
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
      margin-bottom: 10px;
      height: 13px;
      overflow: hidden;
      color: rgb(99, 99, 99)
    }
    .price{color: rgb(99, 99, 99); font-weight: bold;}


  }
  .detail {
    display: flex;
    justify-content: space-between;
  }
  .checkout {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .number {
      color: black;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>