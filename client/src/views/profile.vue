<template >
  <div class="profile">
    <page-not-found v-if="userNotFound" />
    <div v-if="!userNotFound" class="container" >
       <div class="top" >
      <div class="left"> 
        <img :src="profileImg" class="profileImg" /> 
        <div class="usernameBio">
          <h2 class="username">{{profileData.username}}</h2>
          <p class="bio" >{{profileData.bio}}</p>
        </div>
      </div>
      <div class="right">
        <p>Email  : <span>{{profileData.email}}</span></p>
        <p>phoneNumber  : <span>{{profileData.phoneNumber ? profileData.phoneNumber: "Not Available"}}</span></p>
        <p>country :<span>{{profileData.country ? profileData.country: "Not Available"}}</span></p>
        <p>city :<span>{{profileData.city ? profileData.city: "Not Available"}}</span></p>


      </div>
    </div>
    <div class="bottom">
      <Post class="post" v-for = "post in posts" :post="post" :key="post._id" />
    </div>
    </div> 
  </div>
</template>

<script>
import axios from "axios" ;
import Post from "../components/feed/post/post.vue";
import {mapState } from "vuex";
import PageNotFound from './PageNotFound.vue';
export default {
  components:{
    Post,
    PageNotFound ,

  } , 
  data(){
    return {
      profileId: ""  , 
      profileData:[] ,  
      posts:[] , 
      userNotFound: false, 
    }  
  
  } , 

  methods: { 

    async getProfileData(){
      this.profileId = this.$route.params.id ;
      try {
       const res = await axios.get(`http://localhost:4000/api/users/profile/${this.profileId}`)
      this.profileData = res.data;   
      this.$store.commit("showProfileImg", this.profileData.profilePicture); 
      this.getPostProfile();
 
      } 
      catch(err){ 
        this.userNotFound = true; 

      }


     }  ,  
     async getPostProfile(){
        try {
            const res = await axios.get(`http://localhost:4000/api/post/profile/${this.profileId}`);  
            console.log(res);
            this.posts=res.data;
        } 
        catch(err){
          console.log(err); 
        }

     }

  } , 
  computed:{
        ...mapState(["profileImg"])
  }  ,  
  created(){
    this.getProfileData();
  }

}
</script>

<style scoped>
.profile{
  display:flex; 
  flex-direction: column;
  padding:20px;

}
.top{
  display:flex; 
  align-items:Center; 
  justify-content: space-around;
} 
.left .usernameBio{
  margin-left:20px;
  text-align: center;
}
.left .bio{
  text-align: center;
  color:gray;
  font-size:14px;
  width:250px;
}
.right{
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  padding:10px;
  display: flex; 
  flex-direction: column; 
  align-items: flex-start;
  justify-content: center;
}
.right p {
  padding:8px;
}

.profileImg{
  width:300px; 
  height: 250px; 
  object-fit:cover;
  border:2px solid #444;
}
.bottom{
  display: flex;
  align-items: center;
  justify-content: center;  
  flex-direction: column;
}
.bottom .post {
    max-width:60%;
}


</style>