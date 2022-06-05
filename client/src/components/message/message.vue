<template>
  <div class="message " :class="{own:message?.sender===user._id}" >
 <div class="messageTop " >
          <img src = "../../assets/img/profilepic.png" class="small-pic">
          <p class="messageText">{{message?.text}}</p>
      </div>
      <div class="messageBottom">
          <span class="time">{{timeage(message?.createdAt)}}</span>
      </div>    
  </div>
</template>

<script>
import {mapState} from "vuex"; 
import * as timeago from 'timeago.js';

export default {
    props:["own" , "message"] , 
    //:class="{own:message.sender==user._id}" , 
    methods:{
 timeage(date){
      return  timeago.format(date)
    }    ,  
    } , 
    computed:{
        ...mapState(["user"])
    } ,  

}
</script>

<style scoped>
.message{
    display:flex; 
    flex-direction: column; 
    justify-content: center;
    max-width: 100%;

}
.message.own{
    align-items: flex-end; 
    margin-right: 20px;
}
.message.own img {
    display: none;
}
.message.own .messageText {
    background-color:lightgray; 
    color:#000;
}
.messageTop{
    display:flex;
} 

.messageText{
    margin-left:5px;
    background:#1877f2 ;
    padding:10px;
    color:#fff;
    font-size:13px;
    max-width:300px;
    border-radius: 10px;

}
.messageBottom .time {
    font-size:9px;
    color:gray;
    margin-left:10px;
    margin-bottom:10px ;
    display: inline-block;
}
</style>