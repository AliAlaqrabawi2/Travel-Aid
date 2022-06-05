import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    user:null ,
    showNotificationError :false ,
    usernameValid:false,    
    passwordValid:false,  
    profileImg:null  , 
    helpBtn:false  , 
    receiverId:"" , 
    phoneNumberValid:false,
  }, 
  getters:{
    showImg(state){ 
      if ( state.user.profilePicture) {
        return `http://localhost:4000/images/${state.user.profilePicture}`;
      } else return require("../assets/img/profilepic.png");
    } , 

  }  ,
  mutations: {
    ToggleshowNotificationError(state){
      state.showNotificationError=!state.showNotificationError;
    } , 
    setIsLogin(state,payload){
      state.user = payload ; 
    }  ,
    usernameValidate(state,payload){
      const usernameRegex = /^[a-z0-9_.]+$/g
        const valid =  usernameRegex.test(payload);
        state.usernameValid = valid; 
    }  , 

    passwordValidate(state,payload){
      const res= /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.exec(payload) ;
      const valid = !!res;  
      state.passwordValid = valid ;

    } ,
    phoneNumberValidate(state,payload) {
      const phoneRegex = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/      ; 
      const valid =  phoneRegex.test(payload); 

      state.phoneNumberValid = valid; 
    } , 
    showProfileImg(state,payload){
      if (payload){
            state.profileImg = `http://localhost:4000/images/${payload}`
      }   
      else {
        state.profileImg =  require("../assets/img/profilepic.png") ;
      }
    }  , 
    setHelpBtn(state , payload){
      state.receiverId =payload ; 
      state.helpBtn = !state.helpBtn ;
    }
    

  }, 


  actions: {
       async isLogin ({commit} ){
    try{
      const res = await axios.get("http://localhost:4000/api/auth/islogin" ,{ withCredentials: true }) ;
      commit("setIsLogin" ,res.data);   
    
      return res.data; 
    } 
    catch(err){
      console.log(err.response.data);  
      return false;
    } 
    }  , 
    


  },
  modules: {},
});
