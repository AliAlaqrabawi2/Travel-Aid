<template>
  <div class="infoChat">
    <img :src="showImg" class="big-pic" />
    <p class="userName">{{ filterConversation[0].username }}</p>
    <button class="btn viewProfileBtn"><router-link :to="{ name:'profile' , params: {id:filterConversation[0]._id} }">View Proile Page</router-link></button>
  </div>
</template>

<script>
import { mapState } from "vuex";
export default {
  props: ["currentConversation"],
  computed: {
    ...mapState(["user"]),
    filterConversation() {
      return this.currentConversation.members.filter(
        (member) => member._id !== this.user._id
      );
    },
    showImg() {
      const profilePicture = this.filterConversation[0].profilePicture;
      if (profilePicture) {
        return `http://localhost:4000/images/${profilePicture}`;
      } else {
        return require("@/assets/img/profilepic.png");
      }
    },
  },

  watch: {
    currentConversation() {
      console.log(this.filterConversation);
    },
  },
};
</script>

<style scoped>
.infoChat {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 50%;
  width: 100%;
}

.userName {
  font-weight: bold;
  margin: 10px 0;
  font-size: 18px;
}
.viewProfileBtn {
  background: none;
  color: gray;
  position: relative;
  padding: 0;
  margin: 5px 0;
  transition: 0.3s;
  transform-origin: right;
}
.viewProfileBtn::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  height: 3px;
  background: var(--main-color);
  margin-top: 4px;
  transform: scaleX(0);
  transform-origin: right;
  transition: transform 0.4s;
}
.viewProfileBtn:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}
.big-pic{
    border:1px solid #000;
}
</style>