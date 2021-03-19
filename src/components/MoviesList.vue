<template>
  <BContainer>
    <h3 class="list-title">{{ listTitle }} </h3>
      <BRow>
        <template v-if="isExist">
          <BCol cols="3" v-for="(movie, key) in list" :key="key" >
            <MovieItem :movie=movie
            @mouseover.native="onMouseOver(movie.Poster)"
            @removeMovie="onRemoveMovie"/>
          </BCol>
        </template>
        <template v-else>
          Empty list
        </template>
      </BRow>
  </Bcontainer>
</template>

<script>
import MovieItem from '@/components/MovieItem';
import { mapActions, mapGetters } from 'vuex';

export default {
name: 'MoviesList',
props: {
  list:{
    type: Object,
    default: () => ({}),
  },
},
components:{
  MovieItem,
},
computed:{
  ...mapGetters("movies" , ["getToggleSearch"]),
  listTitle(){
    return this.getToggleSearch? "Search results" : "IMDB Top 250";
  },
  isExist()
  {
    return Boolean(Object.keys(this.list).length);
  }
},
methods:{
  ...mapActions("movies", ["removeMovie"]),
  ...mapActions(["showNotify"]),
  onMouseOver(poster){
    this.$emit('changePoster', poster)
  },
  async onRemoveMovie ({id, title}){
    const isConfirmed = await this.$bvModal.msgBoxConfirm(`Are you sure delete ${title}?`);
    if (isConfirmed)
    {
      this.removeMovie(id);
      this.showNotify({msg:`"${title}" was deleted successful`, title: "Success" , variant: "success"});
    }
  }
}

}
</script>

<style scoped>
.list-title{
  font-size: 50px;
  margin-bottom: 30px;
  color: #fff;
}
</style>