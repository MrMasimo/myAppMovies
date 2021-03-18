<template>
  <div id="app">
    <MoviesList :list=getCurMovies />
  </div>
</template>

<script>
import  { mapActions, mapGetters } from 'vuex';
import MoviesList from '@/components/MoviesList';

export default {
  name: 'App',
  components: {
  MoviesList,
  },
  computed: {
   ...mapGetters('movies', ["getCurMovies"]),
  },
  methods:{
    ...mapActions("movies", ["fetchMovies"])
  },
}
</script>

<style>
#app {
  font-family: Arial, Helvetica,  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
