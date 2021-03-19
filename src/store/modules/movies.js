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

const { MOVIES, CURRENT_PAGE } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250Ids: Ids,
    currentPage: 1,
    moviesPerPage: 12,
    curMovies: {},
  },
  getters: {
    getCurMovies:({curMovies}) => curMovies,
    getCurrentPage: ({ currentPage }) => currentPage,
    getMoviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    getCurrentIds: ({ top250Ids }) => (from, to) => top250Ids.slice(from, to),
    getTotal: ({ top250Ids }) => Object.keys(top250Ids).length,
  },
  mutations: {
    [MOVIES](state,value) {
      state.curMovies = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    }
  },
  actions: {
    initMoviesStore: {
      handler({ dispatch }) {
        dispatch("fetchMovies")
      },
      root: true
    },
    async fetchMovies({ getters, commit, dispatch }) {
      try {
        dispatch("toggleLoader", true, { root: true });
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
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },
    changeCurrentPage({ commit, dispatch }, page) {
      commit("CURRENT_PAGE", page);
      dispatch("fetchMovies");
    }
    }
  }

export default moviesStore;