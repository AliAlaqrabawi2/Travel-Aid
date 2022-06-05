<template>
  <nav v-if="!user">
    <div class="container">
      <div class="left">
        <router-link to="/" class="logo">
          <h2>Travel <span class="active">Aid</span></h2>
        </router-link>
      </div>
      <div class="right">
        <ul class="list-auth">
          <li>
            <router-link to="/login">Login</router-link>
          </li>
          <li>
            <router-link to="/register">Register</router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <nav v-if="user"> 
      <div @click="closeSearch" class="overlay" v-if="showSearchResult"></div>

    <div class="container">
      <div class="left">
          <search-result @closeSearch="closeSearch" class="searchResult" v-if= "showSearchResult" :posts="searchResult" :search="search" />
        <router-link to="/" class="logo">
          <h2>Travel <span class="active">Aid</span></h2>
        </router-link>
        <div class="search">
          <input type="search" @keyup.enter="searchPost"  class="searchCountry" v-model="search" placeholder="Search for travelling country" />
          <i class="fa fa-search" @click="searchPost" ></i> 
        </div>

      </div>
      <div class="center">
        <ul>
          <li>
            <router-link to="/">
              <i class="fa fa-home"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/messenger">
              <i class="fa fa-comment"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/notification">
              <i class="fa fa-bell"></i>
            </router-link>
          </li>
          <li>
            <router-link to="/setting">
              <i class="fa fa-cog"></i>
            </router-link>
          </li>
        </ul>
      </div>
      <div class="right">
        <div class="user-info">
          <img :src="showImg" class="med-pic" />
          <h4>{{ user.username }}</h4>
        </div>
        <div class="right-model">
          <i
            class="fa fa-caret-down arrow"
            @click="toggleMenu = !toggleMenu"
          ></i>
          <ul class="right-model-menu" v-if="toggleMenu">
            <li>
              <router-link to="/login" @click="logout">logout</router-link>
            </li>
            <li>
              <router-link :to="{ name:'profile' , params: {id:user._id} }">Profile Page</router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import axios from "axios";
import "./header.css";
import searchResult from '../searchResult.vue';
export default {
  components: { searchResult },
  name: "navigation",
  data() {
    return { 
      toggleMenu: false,
      search:"" , 
      showSearchResult:false, 
      searchResult:[]
    };
  },
  methods: {
    async logout() {
      try {
        await axios.get("http://localhost:4000/api/auth/logout", {
          withCredentials: true,
        });
        document.location.href = "/";
      } catch (err) {
        console.log(err.response.data);
      }
    }, 
   async searchPost(){
     if (this.search!==""){
       try {
         const res = await axios.post("http://localhost:4000/api/post/searchPost" ,{search:this.search})
         console.log(res.data);
         this.searchResult=res.data; 
         this.showSearchResult=true;
       } 
       catch(err){
          console.log(err);
       }
     }
    } , 
    closeSearch(){
      this.showSearchResult = false ;
    }
  },
  computed: {
    ...mapGetters(["showImg"]),
    ...mapState(["user", "test"]),
  },
  watch:{
    showSearchResult(){
    }
  }
};
</script>
<style scoped>
.logo {
  color: #000;
}
.logo .active {
  color: var(--main-color);
}
.searchResult{
  z-index:101; 
position: fixed;
  top:50%; 
  left:50%;
  transform: translate(-50%,-50%); 
  width:100vw;  
  height: 80vh;  
}
.overlay{
  position:fixed ;
  top:0;
  left:0 ;
  height: 100%;
  width:100%; 
  background:rgba(0,0,0,0.1); 
  z-index:9;
}


</style>