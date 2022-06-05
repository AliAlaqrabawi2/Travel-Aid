<template >
  <div  class="Notification">
    <div class="box">
      <h4>{{error}}</h4> 
      <span class="close" @click="hideNotification">&times;</span>
    </div>
  </div>
</template>

<script >
  export default{
  props:["error"] , 
     created(){
    console.log(this.error);
  } , 
  methods:{
    hideNotification(){
      this.$emit("hideNotification" );
    }
  }


  } 
</script>


<style scoped>

.Notification{
  max-width: 400px;
  width: 100%;
  margin: auto;
  text-align: center;
}
.box {
  width: 100%; 
  padding: 15px; 
  background: var(--error-color);
  color: #fff;
  font-weight: bold; 
  font-style: italic;
  border-radius: 3px;
  display: flex;
  align-items: center;
  justify-content: space-between;  
}  

.close {
  cursor: pointer;
}

</style>
