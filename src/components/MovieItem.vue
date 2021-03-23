<template>
  <div class="movie-item mb-3">
    <div class="movie-item-poster" :style="posterBg">
      <div class="movie-info-wrap d-flex flex-column justify-content-between">
        <div class="movie-item-info">
          <h3 class="movie-title">{{ movie.Title }}</h3>
          <span class="movie-year">{{ movie.Year}} </span>
        </div>
        <div class="movie-item-control row no-gutters">
          <div class="col pr-2">
            <BButton size="md" block variant="outline-light" @click=infoEmitItem>Info</BButton>
          </div>
          <div class="col pl-2" v-if="!getToggleSearch">
            <BButton size="md" block variant="outline-light" @click=removeEmitItem >Remote</BButton>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name:'MovieItem',
  props: {
    movie:{
      type:Object,
      required: true
    }
  },
  computed:{
    ...mapGetters("movies" , ["getToggleSearch"]),
    posterBg(){
      return {"background-image": `url(${this.movie.Poster})`};
    }
  },
  methods:{
    infoEmitItem () {
      this.$emit("infoMovie" , this.movie.imdbID);
    },
    removeEmitItem (){
      this.$emit("removeMovie" , { id: this.movie.imdbID , title: this.movie.Title } )
    }
  }

}
</script>

<style scoped>
  .movie-item{
    position: relative;
    cursor: pointer;
    border-radius: 5px;
    overflow: hidden;
    transition: all 0.2s ease;
    height: 400px;
    margin-bottom: 20px;
  }
  .movie-item:hover{
    box-shadow: 0px 5px 30px rgba(0, 0, 0, 0.7);
    transform: scale(1.02);
  }
  .movie-item-poster{
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: -1;
  }
.movie-title{
  font-size: 20px;
  color: #fff;
}
.movie-year{
  font-size: 14px;
  color: #fff;
}
.movie-info-wrap{
  padding: 10px;
  height: 100%;
  opacity: 0;
  transition: all 0.2s ease;
}
.movie-item:hover .movie-info-wrap{
  opacity: 1;
  background-color: rgba(0, 0, 0, 0.7) ;
}
</style>