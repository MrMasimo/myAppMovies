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

const { MOVIES, CURRENT_PAGE, REMOVE_MOVIE, TOGGLE_SEARCH } = mutations;

const moviesStore = {
  namespaced: true,
  state: {
    top250Ids: Ids,
    currentPage: 1,
    moviesPerPage: 12,
    curMovies: {},
    isSearch: false
  },
  getters: {
    getCurMovies: ({ curMovies }) => curMovies,
    getCurrentPage: ({ currentPage }) => currentPage,
    getMoviesPerPage: ({ moviesPerPage }) => moviesPerPage,
    getCurrentIds: ({ top250Ids }) => (from, to) => top250Ids.slice(from, to),
    getTotal: ({ top250Ids }) => Object.keys(top250Ids).length,
    getIndexMovie: ({ top250Ids }) => (id) => top250Ids.findIndex(item => item === id),
    getToggleSearch: ({isSearch}) => isSearch
  },
  mutations: {
    [MOVIES](state, value) {
      state.curMovies = value;
    },
    [CURRENT_PAGE](state, value) {
      state.currentPage = value;
    },
    [REMOVE_MOVIE](state, index) {
      state.top250Ids.splice(index, 1);
    },
    [TOGGLE_SEARCH](state, bool) {
      state.isSearch = bool;
    }
  },
  actions: {
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
    async searchMovies({ commit ,dispatch }, query) {
      try {
        dispatch("toggleLoader", true, { root: true });
        const response = await axios.get(`/?s=${query}`)

        if (response.Error)
          throw Error(response.Error);

        const searchMovies = serializeResponse(response.Search);
        commit("MOVIES", searchMovies);

      } catch (error) {
        dispatch("showNotify",{msg: error.message, title: "Error", variant: "warning"}, {root: true});
      } finally {
        dispatch("toggleLoader", false, { root: true });
      }
    },
    searchProcess({ commit }, bool) {
      commit("TOGGLE_SEARCH", bool);
    },
    removeMovie({ getters, commit, dispatch }, id) {
      const { getIndexMovie } = getters;
      const index = getIndexMovie(id);

      if (index !== -1) {
        commit("REMOVE_MOVIE", index);
        dispatch("fetchMovies");
      }
    },
    changeCurrentPage({ commit, dispatch }, page) {
      commit("CURRENT_PAGE", page);
      dispatch("fetchMovies");
    },
  },
};

export default moviesStore;