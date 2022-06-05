<template>
  <div class="messenger">
    <div class="chatMenu">
      <div class="chatMenuWrapper" v-if="conversations">
        <input
          type="text"
          placeholder="Search For Friends"
          class="srchFrindes"
        />
        <conversation
          @click="getMessage(conversation)"
          class="conversation"
          v-for="conversation in conversations"
          :key="conversation._id"
          :conversation="conversation"
        />
      </div>
    </div>
    <chat-box
      @pushMessage="pushMessage"
      :currentConversation="currentConversation"
      :Messages="Messages"
      class="chatBox"
      v-if="currentConversation"
    />
    <span class="noConversation" v-if="!currentConversation"
      >Open A Conversation</span
    >

    <div class="chatProfile" v-if="currentConversation">
      <info-chat :currentConversation="currentConversation" />
    </div>
  </div>
</template>

<script>
import conversation from "../../components/conversation/conversation.vue";
import "./messenger.css";
import { mapState, mapActions } from "vuex";
import axios from "axios";
import ChatBox from "../../components/chatBox.vue";
import infoChat from "../../components/infoChat.vue";
import { io } from "socket.io-client";
export default {
  components: { conversation, ChatBox, infoChat },
  data() {
    return {
      conversations: [],
      currentConversation: null,
      Messages: [],
      message: "",
      showSendBtn: false,
      socket: io("http://localhost:4001"),
      monitorNewMessage: false,
      m: [],
      startChat: false,
    };
  },

  computed: {
    ...mapState(["user", "helpBtn", "receiverId"]),
  },
  methods: {
    ...mapActions(["isLogin"]),
    async getConversation() {
      const res = await axios.get(
        `http://localhost:4000/api/conversation/${this.user._id}`
      );
      this.conversations = res.data;
    },
    async getMessage(c) {
      this.currentConversation = c;
      const conversationId = this.currentConversation._id;
      const res = await axios.get(
        `http://localhost:4000/api/message/${conversationId}`
      );
      this.Messages = res.data;
    },
    pushMessage(msg) {
      this.Messages.push(msg);
      const receiverId = this.currentConversation.members.filter((user) => {
        return user._id !== this.user._id;
      });
      this.socket.emit(
        "sendMessage",
        this.user._id,
        receiverId[0]._id,
        msg.text
      ); 

      this.socket.on("getUsers", (data) => {
        throw data;
      });
    },
  },

  created() {
    this.isLogin().then(() => {
      this.getConversation();
    }); 
    if (this.helpBtn){
       try {
        axios
          .post("http://localhost:4000/api/conversation", {
            receiverId: this.receiverId,
            senderId: this.user._id,
          })
          .then((res) => {
            if (res.data.newChat) {
              this.getMessage(res.data.savedConversation);
            } else {
              this.getMessage(res.data.isConversation[0]);
            }
          });
      } catch (err) {
        console.table(err.response.data);
      }
    } 
  },

  watch: {
    user() {
      this.socket.emit("addUser", this.user._id);
    },
    helpBtn() {
      // this.receiverId
     
    },
  },
  
  mounted() {
    this.socket.on("getMessage", (data) => { 
      let m = { sender: data.senderId, text: data.text, createdAt: Date.now() };
      this.Messages = [...this.Messages, m];
    });
    
  },
  async beforeUnmount() {
    if (this.Messages.length === 0 && this.helpBtn) {
      const id = this.currentConversation._id;

      axios
        .delete(`http://localhost:4000/api/conversation/deleteConversation/`, {
          data: { id: id },
        })
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  },
};
</script>

<style scoped>
.chatBox {
  border-left: 1px solid rgba(0, 0, 0, 0.1);
}

.conversation:not(:last-child) {
  border-bottom: 1px solid #eee;
}

.noConversation {
  color: gray;
  font-size: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80%;
  width: 80%;
}

.startConversation {
  color: lightgray;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  position: relative;
}
</style>
