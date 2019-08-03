<template>
    <div>
        <div class="pho-preview" v-viewer>
            <img v-for="(img, index) in pho" :src="pho[index]" :key="index">
        </div>
    </div>
</template>

<script>

export default {
    data(){
        return{
            pho: [],
            phoId: this.$route.params.phoId
        }
    },
    created(){
        this.getPhotoDetail()
    },
    methods:{
        getPhotoDetail(){
            this.$http.get('getphodetail?phoId=' + this.phoId).then(result => {
                if(result.body.status === 0) {
                    this.pho = result.body.pho.phos
                }
            })
        }
    },    
}
</script>

<style lang="scss" scoped>
.pho-preview {
    // max-height: 120px;
    margin-bottom: 15px;
    // overflow: hidden;
    img {
        width: 25%;
        margin: 10px;
        box-shadow: 0 0 7px gray;
    }
}
</style>
