<template>
  <div id="setting" v-if="user">
    <notification-error v-if="showError" :error="showError" />

    <div class="container">
      <div class="left">
        <div class="profileImg">
          <img
            :src="previewImg()"
            class="big-pic"
            @click="$refs.profileImg.click"
          />
          <button class="btn" v-if="!!profilePic" @click="updateProfileImg">
            Update
          </button>
        </div>
        <input
          type="file"
          ref="profileImg"
          style="display: none"
          accept="image/*"
          @change="GetImg"
        />
        <h3 class="username">{{ user.username }}</h3>
        <ul class="menu">
          <li @click="passSetting = false" :class="{ active: !passSetting }">
            <i class="fa fa-home"></i> <span>Account</span>
          </li>
          <li @click="passSetting = true" :class="{ active: passSetting }">
            <i class="fa fa-key"></i> <span>Password</span>
          </li>
        </ul>
      </div>
      <div class="right">
        <h2 class="title">Account Setting</h2>
        <form v-if="!passSetting && user">
          <input type="text" placeholder="Full Name" v-model="fullname" />
          <input type="email" placeholder="Email" v-model="email" />
          <input
            type="text"
            placeholder="Phone Number "
            v-model="phoneNumber"
          />
          <input
            type="text"
            placeholder="Country "
            v-model="country"
          /> 
          <input
            type="text"
            placeholder="City"
            v-model="city"
          />
          <textarea placeholder="Bio" v-model="bio"></textarea>
          <button type="button" class="btn" @click="UpdateProfileInfo">
            Update
          </button>
        </form>
        <form v-if="passSetting">
          <input
            type="password"
            placeholder="Enter Your Old Password"
            v-model="oldPassword"
          />
          <input
            type="password"
            placeholder="Enter Your New Password"
            v-model="newPassword"
          />
          <input
            type="password"
            placeholder="Confirm Your Password"
            v-model="confirmPassword"
          />
          <button type="button" class="btn" @click="updatePassword">
            Update
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapState, mapActions  ,mapMutations } from "vuex";
import NotificationError from "../components/NotificationError.vue";
export default {
  name: "setting",
  data() {
    return {
      fullname: "",
      email: "",
      phoneNumber: "",
      bio: "",
      city:"" , 
      country :"" ,
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
      passSetting: false,
      profilePic: "",
      img: "",
      showError: null,
    };
  },
  components: {
    NotificationError,
  },
  watch: {
    user() {
      this.fullname = this.user.username;
      this.email = this.user.email;
      this.phoneNumber = this.user.phoneNumber;
      this.bio = this.user.bio;
      this.country = this.user.country , 
      this.city = this.user.city 
    },
    showError() {
      if (this.NotificationError) {
        this.notificationTime;
      }
    },
  },

  methods: {
    changeSetting() {
      this.passSetting = !this.passSetting;
    },
    GetImg(event) {
      this.profilePic = event.target.files[0];
      this.previewImg();
    },
    previewImg() {
      if (this.profilePic !== "") {
        return URL.createObjectURL(this.profilePic);
      } else if (this.user && this.user.profilePicture) {
        return `http://localhost:4000/images/${this.user.profilePicture}`;
      } else return require("../assets/img/profilepic.png");
    },
    async updateProfileImg() {
      const fd = new FormData();
      this.imgName = Date.now() + this.profilePic.name;
      fd.append("image", this.profilePic, this.imgName);

      try {
        axios.post("http://localhost:4000/upload", fd);
        this.UpdateProfileInfo();
        window.location.href = "/setting";
      } catch (err) {
        console.log(err);
      }
    },
    async UpdateProfileInfo() {
      // Validation
      if (
        this.email !== "" &&
        this.fullname !== "" 
      ) {
        try {
          await axios.put(
            "http://localhost:4000/api/users/updateInfo",
            {
              username: this.fullname,
              email: this.email,
              bio: this.bio,
              profilePicture: this.imgName,
              phoneNumber: this.phoneNumber,
              userId: this.user._id,
              city:this.city, 
              country :this.country 
            },
            { withCredentials: true }
          );
          window.location.href = "/setting";
        } catch (err) {
          console.log(err);
        }
      } else {
        this.showError = "Please Fill All Filed";
        this.notificationTime();
      }
    },
    async updatePassword() {  
            this.passwordValidate(this.password); 


      if (this.newPassword !== this.confirmPassword) {
        this.showError = "Password isn't Matching ";
        this.notificationTime();
      }

      if (
        this.newPassword == "" ||
        this.confirmPassword == "" ||
        this.oldPassword == ""
      ) {
        this.showError = "Please Fill All Filed";
        this.notificationTime();
      }     
      if (!this.passwordValid) {
                this.showError = "Password must be between (6,16)character include (a-z) , Number , dot(.) or  (_)";
        this.notificationTime();


      }


      else {
        try {
        const res = await axios.post(
          "http://localhost:4000/api/users/updatePass",
          { oldPassword: this.oldPassword, newPassword: this.newPassword },
          { withCredentials: true }
          
        );
        console.log(res.data); 
        window.location.href="/";

        } 
        catch(err){
          console.log(err);

        }
      }
    },

    notificationTime() {
      this.t = window.setTimeout(() => {
        this.showError = null;
      }, 4000);
    },

    ...mapActions(["isLogin"]), 
    ...mapMutations(["passwordValidate"]), 
  },

  computed: {
    ...mapState(["user" , "passwordValid"]),
  },
  created() {
    this.isLogin().then((res) => {
      throw res;
    });
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
  justify-content: space-around;
  width: 80vw;
}
.left {
  flex: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  height: calc(100vh - 70px);
}
.left::after {
  content: "";
  position: absolute;
  top: 0;
  left: 100%;
  background: rgba(0, 0, 0, 0.1);
  width: 2px;
  height: 100%;
  margin-left: 5px;
}
.left .profileImg {
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 100%;
  position: relative;
}
.profileImg .btn {
  background: var(--main-color);
  color: #fff;
  border-radius: 0;
  font-weight: bold;
  transition: 0.3s;
}
.left .username {
  margin: 20px 0;
}
.menu {
  width: 100%;
}
.left .menu li {
  padding: 10px;
  display: flex;
  align-items: center;
  font-size: 18px;
  cursor: pointer;
}
.active {
  background: var(--main-color);
  color: #fff;
  transition: 0.2s;
}

.menu li span {
  margin: 0 auto;
}
.right {
  flex: 8;
  display: flex;
  margin-left: 20px;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.right form {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.right form input {
  width: 70%;
  padding: 10px;
  margin: 10px 0;
  outline: none;
  color: gray;
  transition: 0.2s;
}
.right form input:focus {
  color: #000;
  font-weight: bold;
}
.right .btn {
  width: 100px;
  background: var(--main-color);
  border-radius: 0;
  color: #fff;
  font-size: 17px;
  margin-top: 20px;
  border-radius: 2px;
}
.right form textarea {
  resize: none;
  height: 80px;
  width: 70%;
  outline: none;
  color: gray;
  transition: 0.3s;
}
.right form textarea:focus {
  color: #000;
  font-weight: bold;
}
</style>
