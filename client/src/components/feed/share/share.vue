<template>
  <div id="share">
      <div class="top">
          <input type="text" :placeholder="placeholder" class="inputShare" @click="takeItem">
          <img :src = "showImg()" class="med-pic">
      </div>
      <div class="bottom">
          <button class="btn" @click="takeItem">Take An Item?</button>
          <button class="btn" @click="sendItem">Send An Items?</button>
      </div> 
      <form-post v-if="showFormPost" :takeAnItem="takeAnItem" @closeForm="close"/>
      
  </div>
</template>

<script>
import formPost from '../post/formPost.vue';
import { mapGetters, mapState } from 'vuex';
export default {
  components: { formPost }, 
    data(){
        return {
            showFormPost:false, 
            takeAnItem:false ,
        } 
    } ,  
    watch:{
    showFormPost(){
      if (this.showFormPost===true) {
        document.querySelector("body").style.overflow="hidden"

      }
      else {
        document.querySelector("body").style.overflow="auto"

      }
    }
  } , 
    methods:{ 


        ...mapGetters(["showImg"]) , 
        close(value){
            this.showFormPost = value; 

        }  , 
            takeItem(){
      this.showFormPost=!this.showFormPost ;
      this.takeAnItem=true; 

    }  , 
    sendItem(){
        this.showFormPost=!this.showFormPost ; 
        this.takeAnItem=false; 
    }

    
    } , 
    computed :{
        ...mapState(["user"]) ,
        placeholder(){
            return `What Do You Want To Do ${this.user.username}`
        }
    }

}
</script>

<style scoped> 
#share {
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
    padding:10px;
    width:80%; 
    margin: auto;
} 
.top {
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.top .inputShare{
    padding:10px; 
    border:none; 
    outline:none; 
    width:80%;
    cursor: pointer; 
    font-size:18px;
}
#share .bottom {
    display: flex;
    align-items: center;
    justify-content: space-around;
}
.bottom .btn {
    font-size:17px;
    font-weight:bold;
    transition: 0.3s; 
    background: #fff;
    color:#222; 
    position: relative;
} 
.btn::after{
    content: "";
    position: absolute;
    top:75%; 
    left:10px ;
    background: #999;
    width:85%;
    height: 2px; 
    transform:scale(0); 
    transition: 0.3s;
    transform-origin: left;
} 
.btn:hover::after{
    transform: scale(1);
}


</style>