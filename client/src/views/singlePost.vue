<template>
  <div id="singlePost">
      <post  :post="post" v-if="post" class="post" />

  </div>
</template>

<script>
import post from '../components/feed/post/post.vue' ; 
import axios from "axios" ;
export default {
  components: { post } ,
  data(){
      return {
          post:[], 
      }
  }  ,
  methods:{
     async getSinglePost(){
          const singlePostId = this.$route.params.id ; 
          const res = await axios.get(`http://localhost:4000/api/post/${singlePostId}`); 
          this.post= res.data ; 
            console.log(this.post);

      }
  } , 
  created(){
      this.getSinglePost();
  }
   
}

</script>

<style scoped>
    .post{
        width:50%;
    }

</style>