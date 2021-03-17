import axios from '@/plugins/axios';
import Ids from "../mock/imdb_top250";
import mutations from '../mutations';

function serializeResponse(movies)
{
  return movies.reduce((acc, movie) => {
    acc[movie.imdbID] = movie;
    return acc;
  },{})
}

const { MOVIES } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250Ids: Ids,
    currentPage: 1,
    moviesPerPage: 12,
    curMovies: {},
  },
  getters: {
    getCurrentPage: ({ currentPage }) => currentPage,
    getMoviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    getCurrentIds: ({ top250Ids }) => (from, to) => top250Ids.slice(from, to),
  },
  mutations: {
    [MOVIES](state,value) {
      state.curMovies = value;
    }
  },
  actions: {
    async fetchMovies({ getters, commit }) {
      try {
        const { getCurrentPage, getMoviesPerPage, getCurrentIds } = getters;
        const from = getCurrentPage * getMoviesPerPage - getMoviesPerPage;
        const to = getCurrentPage * getMoviesPerPage;
        const curIds = getCurrentIds(from, to);

        const request = curIds.map((id) => axios.get(`/?i=${id}`));

        const response = await Promise.all(request);
        const movies = serializeResponse(response);

        commit("MOVIES", movies);
      } catch (error) {
        console.log(error);
      }


    }
  },
}

export default moviesStore;