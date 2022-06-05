<template>
    <NotifiicationError :error="error" v-if="error" />

  <div class="container-auth"> 

    <h2 class="title">Login</h2>
    <form class="register-form" @submit.prevent="login">
      <div class="input-field">
        <input type="email" placeholder="Enter Your Email" v-model="email" />
        <i class="fa fa-lock"></i>
      </div>
      <div class="input-field">
        <input type="password" placeholder="Your Password" v-model="password" />
        <i class="fa fa-key"></i>
      </div>

      <router-link class="write-page-link" to="/register"
        >Don't Have Account? <span>Register</span></router-link
      >
      <button type="submit" class="btn submit">Login</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
import NotifiicationError from "../../components/NotificationError.vue"
import "./auth.css";
export default {
  data() {
    return {
      email: "",
      password: "", 
      error:null
    };
  }, 
  components:{
    NotifiicationError , 
  } , 

  methods: {
    async login() {
      this.error=null;
      try {
         await axios.post("http://localhost:4000/api/auth/login", {
          email: this.email,
          password: this.password,
        } , { withCredentials: true });  
       document.location.href="/"
        
      } catch (err) {
        console.log(err.response.data.msg);
        this.error = err.response.data.msg; 
      }
    },
  },
};
</script>
