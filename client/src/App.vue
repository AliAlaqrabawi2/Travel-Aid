<template>
  <div id="app"  >
      <Navbar />
      

  </div>
  <router-view :key="$route.fullPath" />
</template>

<style>
</style>


<script>
import Navbar from "./components/header/header.vue";
import {mapActions ,mapState  } from "vuex"; 
import { io } from "socket.io-client";


  export default{  
    data(){
      return {
            socket: io("http://localhost:4001"),

      }

    } ,  
   

    

    components:{
    Navbar
  } ,  
  computed:{
    ...mapState(["user"])
  } ,
  methods:{ 
    ...mapActions(["isLogin"]),   
    

  } , 

   created ()  {  
     this.isLogin()  ; 
  }  , 
  
  
  }


</script>


<style>

</style>