<template>
  <div class="MoreDetails">
      <div class="container" @click.self="close">
          <div class="modal">  
              <span class="close" @click="close">&times;</span>
              <h2 class="title">More Details</h2> 
              <hr />
              <div class="info">
                  <p class="desc">Anas Want To Send iphone to ksa</p>
                  <ul>
                    <li>weightItem:{{post.weightItem}}gm</li>
                    <li>product:{{post.product}}</li>
                    <li>quantity :{{post.quantity}}</li>  
                    <li>Phone Number : {{post.phoneNumber}}</li>
                                         
                  </ul>
              </div>

          </div>
      </div>

  </div>
</template>

<script>
export default {
name:"MoreDetails"  ,
methods:{
    close(){
        this.$emit("closeModal" ,false);
    }   , 
} ,
created(){
    console.log(this.post);
} , 

props:["post"] , 
}
</script>

<style scoped>
.container {
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  width:100vw; 
  height: 100vh;
  position: fixed;  
  left:0;
  top:0;
  background: rgba(37, 35, 35, 0.1);


}
.container .modal {
  max-width: 500px;
  background: #fff;
  border-radius: 4px;
  width: 100%;
  box-shadow: rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px, rgba(17, 17, 26, 0.1) 0px 16px 56px;
  padding: 10px;
  display: flex;
  flex-direction: column;
  position: relative;
}
.modal .title {
    text-align: center;
    margin-bottom: 5px;
}
.modal .close {
    position: absolute;
    right: 10px;
    top:15px;
    cursor: pointer;
    color:var(--error-color);
}
.modal .info {
    padding-left:7px;
    padding-top:5px;

}
.modal .info ul {
    padding-left:10px;
}
.info ul li {
    margin-top: 10px;
    font-weight: bold;
}
</style>