<template>
    <div>
       <div class='news-container'>
           <h1 class='header'>{{news.title}}</h1>
           <div class="flex-box">
               <p class="add-time">Post Time: {{news.add_time | DateFormat}}</p>
               <p class="clicked">{{news.clicked}} Clicked</p>
           </div>
           <div class="content" v-html="news.content"></div>
       </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
    data(){
        return{
            id: this.$route.params.newsId,
            news:''
        }
    },
    created(){
        this.getNewsinfo()
    },
    methods:{
        getNewsinfo(){
            this.$http.get("http://localhost:3030/api/getnewsinfo?newsId=" + this.id).then(res => {
                if(!res.body.status == 0) {
                    Toast('Failed loading the article!')
                return
                }
                let news = res.body.news
                this.news = news
            })
        }
    }
    
}
</script>

<style lang="scss" scoped>
.news-container {
    padding: 10px;
    .header{
        color:#26a2ff;
        font-size: 20px;
    }
    .flex-box {
        display: flex;
        justify-content: space-between;
    }
}
// .news-container {
//   padding: 10px;
// }
// h1 {
//   color: #333;
// }
// ul,
// li {
//   list-style: none;
//   margin: 0;
//   padding: 0;
// }
// .header {
//   font-size: 26px;
//   color: #26a2ff;
// }
// .flex-box {
//   display: flex;
//   justify-content: space-between;
// }
// .comment-head {
//   margin-top: 10px;
//   font-size: 16px;
//   color: #111;
// }
// textarea {
//   margin: 0;
// }
// .footer {
//   text-align: right;
//   margin-bottom: 10px;
// }
</style>
