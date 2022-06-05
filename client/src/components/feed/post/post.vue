<template >
  <div class="post" >
    <div class="userInfo" @click.self="ellipsis = false">
      <span class="time">{{ timePost(post.createdAt) }}</span>
      <div class="left">
        <router-link :to="{ name:'profile' , params: {id:post.User._id} }">
        <img :src="showImg(post.User.profilePicture)" class="med-pic" />

        </router-link>
                <h3 class="userName">{{ post.User.username }}</h3>
      </div>
      <div class="right">
        <i class="fa fa-ellipsis-v" @click="toggleEllipsis"></i>
        <div class="menu" v-if="ellipsis">
          <ul>
            <li value="al" id="myInput" @click="copy">Copy link</li>
            <li v-if="post.User._id === user._id" @click="deletePost(post._id)">
              Delete Post
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="center">
      <span class="details">{{post.User.username}} {{post.takeAnItem ? "can take item":"  from want to send item from "}} <span class="mark">{{post.currentCountry}}</span> to <span class="mark">{{post.travelingCountry}}</span> </span>
      <p class="postDesc">{{ post.desc }}</p>
      <img v-if="post.postImg"
        :src="`http://localhost:4000/images/${post.postImg}`"
        class="postImg"
      />
    </div>
    <div class="bottom">
      <button class="btn" @click="HelpBtn" v-if="post.User._id!==user._id" >
        <router-link to="/messenger" >{{post.takeAnItem ?  "Query":"Help"}}</router-link>
      </button>
      <button class="btn" @click="MoreDetails" >More Details</button>
    </div>
    <more-details v-if="showModal" @closeModal="closeModal" :post="post" class="moreDetails"/>
  </div>
</template>

<script>
import { mapState , mapMutations  } from "vuex";
import * as timeago from "timeago.js";
import axios from "axios";
import MoreDetails from './MoreDetails.vue';
export default {
  components: { MoreDetails , 
        },
  data() {
    return {
      ellipsis: false,
      showModal:false,
    };
  },
  watch:{
    showModal(){
      if (this.showModal===true) {
        document.querySelector("body").style.overflow="hidden"

      }
      else {
        document.querySelector("body").style.overflow="auto"

      }
    }
  } , 
  methods: {
    toggleEllipsis() {
      this.ellipsis = !this.ellipsis;
    },
    timePost(value) {
      return timeago.format(value);
    },
    async deletePost(id) {
      try {
         await axios.delete(`http://localhost:4000/api/post/${id}`, {
          data: { userId: this.user._id },
          withCredentials: true,
        });
        window.location.href="/"; 

      } catch (err) {
        console.log(err);
      }
    }, 
    MoreDetails(){
      this.showModal = true ;
    }   , 
    closeModal(){
      this.showModal=false;
    } , 
     showImg(pic){ 
      if ( pic) {
        return `http://localhost:4000/images/${pic}`;
      } else return require("@/assets/img/profilepic.png");
    } , 
    copy(){
      var copyLink = document.createElement("textarea");
      copyLink.value  =`http://localhost:8080/post/${this.post._id}` ;
      document.body.appendChild(copyLink);
      copyLink.select(); 
        navigator.clipboard.writeText(copyLink.value); 
        document.body.removeChild(copyLink);

    } , 
    HelpBtn(){
      this.$store.commit("setHelpBtn", this.post.User._id);
    } , 
    ...mapMutations(["setHelpBtn"])
  },
  computed: {
    ...mapState(["user"]), 
  }, 

  props: ["post"],
};
</script>

<style scoped>
.post {
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
  margin: 30px auto;
  text-align: left;
  z-index: 1;
  position: static;
}
.container {
  width: 100%;
  margin-top: 15px;
}
.post .userInfo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  position: relative;
}
.userInfo .time {
  position: absolute;
  font-size: 11px;
  opacity: 0.6;
  top: 68%;
  left: 90px;
}
.post .userInfo .left {
  display: flex;
  align-items: center;
  padding: 10px;
}
.userInfo .left .userName {
  margin-left: 20px;
}
.userInfo .right .fa {
  cursor: pointer;
  font-size: 20px;
  border-radius: 50%;
  padding: 10px;
}
.right {
  position: relative;
}
.right .menu {
  position: absolute;
  top: 25px;
  right: -10px;
  padding: 10px;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  z-index: 10;
  white-space: nowrap;
}
.right .menu li {
  cursor: pointer;
  font-size: 15px;
  margin: 4px 0;
  transition: 0.3s;
  z-index: 11;
  padding: 5px;
}
.right .menu li:hover {
  opacity: 0.8;
}
.center {
  padding: 20px 0;
  width: 100%;
  position: relative;
}
.center .details {
  font-size: 13px;
  opacity: 0.5;
  position: absolute;
  top: 10px;
  text-align: center;
  width: 100%;
  color:#000;
}
.details::after {
  content: "";
  width: 70%;
  position: absolute;
  height: 1px;
  background: #ccc;
  top: 100%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.center .postDesc {
  padding: 10px;
  margin-bottom: 10px;
  font-size: 15px;
  font-weight: 700;
  margin-top: 10px;
}
.center .postImg {
  object-fit: contain;
  width: 100%;
  height: 450px;
  max-height: 100%;
}
.bottom {
  margin: 20px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
}
.bottom .btn {
  color: #fff;
  font-size: 17px;
  font-weight: bold;
  transition: 0.3s;
}
.btn a {
  color:#fff; 
}
.bottom .btn:first-child {
  margin-right: 20px;
  background: var(--main-color);
}
.bottom .btn:nth-child(2) {
  background: rgb(223, 13, 13);
}
.bottom .btn:hover {
  transform: scale(1.1);
  opacity: 0.9;
} 
.moreDetails{
  z-index:13121;
}
.mark{

padding:4px;
font-weight: bold;
font-size:16px;
opacity:1;
}
</style>
