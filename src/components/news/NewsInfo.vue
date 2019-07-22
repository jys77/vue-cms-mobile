<template>
    <div>
       <h3>News Title --- {{ id }}</h3>
    </div>
</template>

<script>
export default {
    data(){
        return{
            id: this.$route.params.id
        }
    }
    
}
</script>

<style lang="scss" scoped>

</style>
