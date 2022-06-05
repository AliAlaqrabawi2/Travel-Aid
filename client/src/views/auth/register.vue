<template>
  <div class="container-auth">
    <notification-error v-if="showError" :error="showError" @hideNotification="hideNotification" />
    <h2 class="title">Register</h2>
    <form class="register-form" @submit.prevent="register">
      <div class="input-field">
        <input v-model="username" type="text" placeholder="Enter User Name" />
        <i class="fa fa-envelope"></i>
      </div>
      <div class="input-field">
        <input v-model="email" type="email" placeholder="Enter Your Email" />
        <i class="fa fa-lock"></i>
      </div>
      <div class="input-field">
        <input
          v-model="password"
          type="password"
          placeholder="Create Password"
        />
        <i class="fa fa-key"></i>
      </div>

      <div class="input-field">
        <input
          v-model="confirmPassword"
          type="password"
          placeholder="Confirm Password"
        />
        <i class="fa fa-key"></i>
      </div>

      <router-link class="write-page-link" to="/login"
        >Have An Acount ? <span>Login</span></router-link
      >
      <button type="submit" class="btn submit">Register</button>
    </form>
  </div>
</template>

<script>
import "./auth.css";
import { mapState ,mapMutations } from "vuex";
import axios from "axios";
import NotificationError from '../../components/NotificationError.vue';
export default { 
  components:{
NotificationError

  } , 
  data() {
    return {
      username: null,
      email: null,
      password: null,
      confirmPassword: null,
      showError :null ,
    };
  },
  methods: { 
    async register() {
      this.passwordValidate(this.password); 
        this.username?.length>0 ? this.usernameValidate(this.username) :this.showError = "please fill All Filed";
       
      if (this.username===null || this.password===null|| this.confirmPassword===null ||this.email===null){
        this.showError="Please Fill All Filed"; 
        this.notificationTime();

      }
     else if (this.username?.length<3 ){
        this.showError = "Username Must be at least 3char "; 
        this.notificationTime();
      
      } 
      else if ( !this.usernameValid){
        this.showError = "Username Must Lowercase Letters (a-z) , Numbers ,(.) , (_)"
        this.notificationTime();
      
      }  
      else if (this.password!==this.confirmPassword){
        this.showError = "Password Doesn't Match";
        this.notificationTime();
      
      }
    
      else if (!this.passwordValid) {
        this.showError = "Weak Password";
        this.notificationTime();
      
      }
      else {
        try {
          const res = await axios.post(
            "http://localhost:4000/api/auth/register",
            {
              username: this.username,
              email: this.email,
              password: this.password,
            },
            { withCredentials: true }
          );
          console.log(res.data);
          document.location.href = "/";
        } catch (err) {
          console.log(err.response); 
            this.showError= "This email is already exist"; 
        this.notificationTime(); 
        }
      } 
    
    },
    notificationTime() {
      this.t = window.setTimeout(() => {
        this.showError = null;
      }, 5000);
    }, 
    hideNotification(){
        this.showError= false; 
    } , 

    ...mapMutations(["usernameValidate" , "passwordValidate"])
  },
  computed: {
    ...mapState(["showNotificationError" ,"passwordValid" , "usernameValid"]), 
  },
  created() {
  },
};
</script>
