<template>
  <div class="poster-bg-page" :style= "setBg" > </div>
</template>

<script>
export default {
  name:'PosterBg',
  props:{
    poster:{
      type: String,
      default: ""
    },
  },
  data: () => ({
    defaultBg: "linear-gradient(45deg , rgb(0,3,38) 0%, rgb(82,15,117) 100%)",
  }),
  computed: {
    setBg(){
      return "background-image:" + this.getPoster;
    },
    getPoster(){
      return this.poster ? `url(${this.poster})`: this.defaultBg;
    }
  }
}
</script>

<style scoped>
.poster-bg-page{
  position:absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  z-index: -1;
  background-size: cover;
  background-position: center;
  transition: all, 0.2s , ease;

}
.poster-bg-page::before{
  content: "";
  position: absolute;
  left:0;
  right:0;
  top:0;
  bottom:0;
  opacity: 0.7;
  background-image: linear-gradient(45deg , rgb(0,3,38) 0%, rgb(82,15,117) 100%);
}
</style>