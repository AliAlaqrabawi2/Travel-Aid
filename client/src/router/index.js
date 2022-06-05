import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import login from "../views/auth/login.vue";
import register from "../views/auth/register.vue";
import profile from "../views/profile.vue";
import setting from "../views/setting.vue";
import messenger from "../views//messenger/messenger.vue"; 
import PageNotFound from "../views/PageNotFound.vue";
import singlePost from "../views/singlePost.vue"; 
import store from "../store";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    beforeEnter(to, from, next) {
      store.dispatch("isLogin").then((res) => {
        if (res) {
          next();
        } else {
          next("/login");
        }
      });
    },
  },
  {
    path: "/login",
    name: "login",
    component: login,
    beforeEnter(to, from, next) {
      store.dispatch("isLogin").then((res) => {
        if (res) {
          next("/");
        } else {
          next();
        }
      });
    },
  },

  {
    path: "/register",
    name: "register",
    component: register,
    beforeEnter(to, from, next) {
      store.dispatch("isLogin").then((res) => {
        if (res === true) {
          next("/");
        } else {
          next();
        }
      });
    },
  },
  {
    path: "/profile/:id",
    name: "profile",
    component: profile,
  },
  {
    path: "/setting",
    name: "setting",
    component: setting, 
    beforeEnter(to, from, next) {
      store.dispatch("isLogin").then((res) => {
        if (res === true) {
          next("/");
        } else {
          next();
        }
      });
    },
    
  },
  {
    path: "/messenger",
    name: "messenger",
    component: messenger, 
    beforeEnter(to, from, next) {
      store.dispatch("isLogin").then((res) => {
        if (res === true) {
          next("/");
        } else {
          next();
        }
      });
    },
  },
  {
    path:"/post/:id" , 
    component:singlePost 
  }  ,
  { 
    path: '/:pathMatch(.*)*',
     component: PageNotFound 
    },

];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
