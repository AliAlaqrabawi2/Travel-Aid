<template>
  <div class="conversation" >
<img :src="showImg" class="conversationImg small-pic">
<span class="conversationName">{{filterConversation[0]?.username}}</span>


  </div>
</template>

<script>
import {mapState  } from "vuex";
export default {
  props:["conversation"] ,
  data(){
return {
}
  }  , 

    computed:{

      ...mapState(["user" ]),
      filterConversation(){ 
        this.conversation.members.filter(m=>{console.log(m._id!==this.user._id)})       
        return this.conversation.members.filter(member=>member._id!==this.user._id)
      } , 
      showImg(){ 
        const profilePic = this.filterConversation[0].profilePicture ; 
        console.log(profilePic)
        if (profilePic){
          return `http://localhost:4000/images/${profilePic}`
    } 
    else 
    {
      return require("@/assets/img/profilepic.png");
    }
    }
    },  

}
</script>

<style scoped>
.conversation{
    display: flex;
    align-items: center;
cursor: pointer;
width:60%;
padding:5px;
margin: 10px;

    
}  
.conversation:hover{
    background: #ddd;
}
.conversation .conversationName{
    margin-left:15px;
}

</style>