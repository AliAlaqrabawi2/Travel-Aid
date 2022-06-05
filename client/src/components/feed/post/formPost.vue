<template>
  <div>
    <div class="container" @click.self="closeForm">

      <form class="form"> 
        <notification-error v-if="showError" :error="showError" @hideNotification="hideNotification" />

        <h2 class="title">
          {{ takeAnItem ? "Take An Item" : "Send An Item" }}
        </h2>
        <span class="close" @click="closeForm">&times;</span>
        <textarea
          @input="countChar"
          placeholder="Write Your Description Here"
          v-model="desc"
        ></textarea>
        <span ref="count" class="count">{{ count }}</span>

        <div class="inputField">
          <select class="input" v-model="currentCountry">
            <option disabled selected>choose Your Current Country</option>
            <option v-for="country in countries" :key="country">{{country.CountryName}}</option>
          </select>
          <select class="input" v-model="travelingCountry">
            <option disabled selected>choose Your Traveling Country</option>
            <option v-for="country in countries" :key="country">{{country.CountryName}}</option>
          </select>
        </div>
        <div class="inputField">
          <input
            v-model="quantity"
            type="number"
            min="1"
            class="input"
            placeholder="Quantity"
          />
          <select class="input" v-model="product">
            <option disabled selected>Product</option>
            <option>Electronic</option>
            <option>Food</option>
            <option>Liquid</option>
            <option>Others</option>
          </select>
        </div>
        <div class="inputField">
          <input
            v-model="weightItem"
            type="number"
            min="1"
            class="input"
            placeholder="Weight(Gm)"
          />
          <input
            v-model="PhoneNumber"
            type="text"
            class="input"
            placeholder="PhoneNumber"
          />
        </div>
        <div class="fromBottom">
          <input
            type="file"
            style="display: none"
            ref="inputFile"
            accept="image/*"
            @change="getImg" 
          />
          <i class="fa fa-image" @click="$refs.inputFile.click()"></i>
          <button @click="createPost" class="btn share" type="button">Share</button>
        </div>
        <img  :src="previewImg" v-if="img" class="previewImg">
      </form>

    </div>
  </div>
</template>

<script>
import axios from "axios";
import {mapState } from "vuex";
import NotificationError from "../../NotificationError.vue"; 

export default {
  data() {
    return {
      count: 100,
      desc: "",
      currentCountry: "choose Your Current Country",
      travelingCountry: "choose Your Traveling Country",
      product: "Product",
      quantity: null,
      weightItem: null,
      PhoneNumber: null,
      img: null, 
      imgName :null , 
      countries:[]  , 
      showError :""
    };
  },
  components:{
    NotificationError
  }  ,
  methods: {
    countChar() {
      this.count = 100 - this.desc.length;
      if (this.count < 0) {
        this.$refs.count.style.color = "red";
      } else {
        this.$refs.count.style.color = "gray";
      }
    },
    getImg(event) {
      this.img = event.target.files[0];
    }, 
    async uploadImg (){
       if (this.img) { 
        console.log("here");
        const fd = new FormData();
        this.imgName = Date.now() + this.img.name; 
        fd.append("image", this.img , this.imgName);
        try {
         const res=   await axios.post("http://localhost:4000/upload", fd);
         console.log(res);
        } catch (err) {
          console.log(err);
        }
      }

    } , 
    async createPost() {
      const newPost = {
        desc: this.desc,
        currentCountry: this.currentCountry,
        travelingCountry: this.travelingCountry,
        product: this.product,
        quantity: this.quantity,
        weightItem: this.weightItem,
        phoneNumber: this.PhoneNumber, 
        takeAnItem:this.takeAnItem , 
        User : this.user._id 
      };
      this.validation();

     
      if (this.showError ===""){
         this.uploadImg(); 
      newPost.img = this.imgName;
              try { 
           await axios.post(
          "http://localhost:4000/api/post/create",
          newPost
        ); 
        window.location.href="/";
      } catch (err) {
        console.log(err);
      }

      }
     

    },
    closeForm(){
      this.$emit("closeForm" , false);
    }  , 
    validation(){
      this.$store.commit("phoneNumberValidate",this.PhoneNumber);
      if (this.desc =="" || this.travelingCountry==="choose Your Current Country" || this.product==="product" || this.quantity===null || this.weightItem===null || this.PhoneNumber===null ){

        this.showError = "please Fill All Field"; 
                this.notificationTime();
      } 
      else if (!this.phoneNumberValid){
        this.showError = "Phone Number isn't Valid";
        this.notificationTime();
      } 
      else {
        this.showError = "";
      }
      
    } ,  
    notificationTime() {
      this.t = window.setTimeout(() => {
        this.showError = "";
      }, 5000);
    }, 
    hideNotification(){
        this.showError = "";
    }  ,
  },
  computed:{

    ...mapState(["user" , "phoneNumberValid"]) ,
        previewImg(){
          return URL.createObjectURL(this.img);
        } , 
        formValidate(){
          return 0 ; 
        } 
  }  ,  
  props: ["takeAnItem"],
   created(){
   axios.get("https://api.dhsprogram.com/rest/dhs/countries").then(res=>{
     this.countries = res.data.Data;
   })
   }   
};
</script>

<style scoped>
.container {
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.container .form {
  max-width: 500px;
  background: #fff;
  border-radius: 4px;
  width: 100%;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
}
.form .close {
  position: absolute;
  right: 10px;
  top: 10px;
  cursor: pointer;
  font-size: 18px;
  color: var(--error-color);
}
.form .title {
  margin-bottom: 10px;
}
.container .form .inputField {
  display: flex;
  padding: 10px;
  margin-bottom: 10px;
  width: 80%;
}
.form textarea {
  width: 75%;
  height: 70px;
  border: none;
  outline: none;
  margin-left: 10px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  resize: none;
  border-radius: 3px;
  font-size: 16px;
  padding-left: 5px;
}
.form .count {
  position: absolute;
  top: 100px;
  right: 70px;
  font-size: 13px;
  color: gray;
}
.container .inputField .input {
  margin-left: 10px;
  padding: 5px;
  border-radius: 3px;
  border: 1px solid rgba(0, 0, 0, 0.3);
  outline: none;
}
.inputField select {
  width: 100%;
  padding: 4px;
  font-size: 13px;
}
.fromBottom {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 90%;
}
.fromBottom .fa {
  margin-right: 20px;
  font-size: 25px;
  cursor: pointer;
}
.container .fromBottom .share {
  background: rgb(3, 122, 3);
  font-weight: bold;
  color: #fff;
  font-size: 17px;
  transition: 0.2s;
}
.fromBottom .share:hover {
  transform: scale(1.04);
  background: rgb(21, 149, 21);
} 
.previewImg{
  height: 200px; 
  margin-top:20px;
}
</style>
