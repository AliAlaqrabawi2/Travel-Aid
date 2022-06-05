<template>
  <div class="home"> 
    <div class="wrapper">
      <sidebar/>
      <feed/>
      <rightbar/>
    </div>

  </div>
</template>

<script>
import feed from '../components/feed/feed.vue';
import sidebar from "../components/sidebar/sidebar.vue" ; 
import rightbar from "../components/rightbar/rightbar.vue" ; 

export default {
  components: { feed , 
    sidebar , 
    rightbar
  },
   
  name: "Home", 
  
  
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center; 
  text-align: center;
}
</style>
