<template >
  <div class="searchResult"> 
      <div class="top">
      <h3 class="title">Search results for <span>{{search}}</span></h3>
      <span class="close" @click="closeSearch">&times;</span>

      </div>
      <post v-for="post in posts" :key="post.id" :post="post" /> 
      <h2 v-if="posts.length===0" class="noResult">No Result To Show</h2>

      

  </div>
</template>

<script>
import post from "../components/feed/post/post.vue"
export default {
    components:{
        post
    }  ,
    props:["posts"  ,"search"] ,  
    methods:{
        closeSearch(){
            this.$emit("closeSearch" ,false)
        }
    }
}
</script>

<style scoped>
.searchResult{
    height: 70vh;
    background: #fff;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding:10px;
  overflow-y: scroll; 
  z-index:100;    
  max-width:500px;
  position: absolute;
  top:50%; 
  left:50%;
  transform: translate(-50%,-50%);


 } 
 .title {
     text-align: center;
     color:#888;
 }
 .title span {
     text-decoration: underline; 
     color:#000;
 }
.noResult{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    color:var(--error-color) ; 
} 
.top{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
.top .close{
    cursor: pointer;
}

</style>