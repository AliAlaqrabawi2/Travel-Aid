<template>
 <div class="chatBox"  >
      <div class="chatBoxWrapper"  >
        <div  class="chatBoxTop" ref="scrollToMe"  >
          <message class="mss"  v-for="message in Messages" :key="message._id" :message="message"   /> 
          <span  v-if="Messages.length===0 ? true :false " class="startConversation">Start New Conversation</span>

        </div>
        <div class="chatBoxBottom">
          <textarea class="chatMessageInput" placeholder="Send Message" v-model="message" ></textarea>
          <button type="button"  class="chatMessageButton" @click="sendMessage"  v-if="message">Send</button>
        </div>
        
      </div> 
    </div>  
    </template>

<script>
import message from "../components/message/message.vue" ; 
import {mapState} from "vuex" ;
import axios from "axios";
export default {
    data(){
        return {
            message:"" , 
             

        }
    } , 
    components:{
        message
    } ,  
    props:["currentConversation" , "Messages"] , 
    computed:{
        ...mapState(["user"]),
    } , 
    methods:{
        async sendMessage(){
     const message = {
       sender :this.user._id , 
       text:this.message , 
       conversationId:this.currentConversation._id
     }  
     if (this.message!==""){
        try {
     await axios.post("http://localhost:4000/api/message", message) ; 
     this.$emit("pushMessage", message)
     this.message=""; 

     } 
     catch(err){
       console.log(err);
     }
     }  

   }  ,
   scroll(){
        const el = this.$refs.scrollToMe;
  el.scrollTop = el.scrollHeight ;
} 
    } , 

    updated(){ 
        this.scroll();
    }

}
</script>

<style scoped>
.startConversation{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%; 
  font-size:40px;
  color:gray
}
</style>
