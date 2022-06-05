<template>
  <div id="feed"> 
     <share/> 
      <post v-for="post in Posts" :key="post.id" :post="post" />
  </div>
</template>

<script>
import post from './post/post.vue'  ;
import share from './share/share.vue' ;
import axios from "axios" ;
export default {
  data(){
      return {
        Posts:[]  , 
      }
  } ,
  components: { post  ,
    share,
  },  
  

methods:{
  async GetTmeLine(){
    try {
          const res = await axios.get("http://localhost:4000/api/post/GetAllPost") ;
          this.Posts =  res.data.sort((p1,p2)=>{
            return new Date(p2.createdAt) - new Date(p1.createdAt) ;
          })

 
    } 
    catch(err){
      console.log(err);
    }
  } 

} , 
  created(){
    this.GetTmeLine(); 

  }




}
</script>

<style scoped>
#feed {
    flex:6; 
    padding-top:20px ;
} 
</style>