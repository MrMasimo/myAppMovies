<template>
  <div id="app">
    <Header />
    <Notifications />
    <Loader />
    <PosterBg :poster= posterBg />
    <MoviesList :list=getCurMovies @changePoster="onChangePoster" />
    <MoviesPaginator :currentPage=getCurrentPage
    :total=getTotal
    :perPage=getMoviesPerPage
    @changedPage="onChangePage"/>
  </div>
</template>

<script>
import  { mapActions, mapGetters } from 'vuex';
import MoviesList from '@/components/MoviesList';
import PosterBg from '@/components/PosterBg';
import MoviesPaginator from '@/components/MoviesPaginator';
import Loader from '@/components/Loader';
import Header from '@/components/Header';
import Notifications from '@/components/Notifications';

export default {
  name: 'App',
  components: {
    MoviesList,
    PosterBg,
    MoviesPaginator,
    Loader,
    Header,
    Notifications
  },
  data:() =>({
    posterBg: "",
  }),
  computed: {
   ...mapGetters('movies', ["getCurMovies", "getCurrentPage", "getMoviesPerPage" , "getTotal"]),
  },
  watch: {
    "$route.query": {
      handler: "onPageQueryChange",
      immediate: true,
      deep: true
    }
  },
  methods:{
    ...mapActions("movies", ["changeCurrentPage"]),
    onPageQueryChange({ page = 1 }) {
      this.changeCurrentPage(Number(page));
    },
    onChangePoster(poster){
      this.posterBg = poster;
    },
    onChangePage(page){
      this.$router.push({ query: { page } });
    }
  },
}
</script>

<style>
#app {
  font-family: Arial, Helvetica,  sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  position: relative;

}
</style>
