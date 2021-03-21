import Vue from 'vue'
import Vuex from 'vuex'
import movies from './modules/movies'
import loader from "./modules/loader";
import notifications from "./modules/notifications";

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    movies,
    loader,
    notifications,
  },
});

export default store;
