import mutations from '../mutations';

const { SHOW_NOTIFY } = mutations;

const notifications = {
  state: {
    messagePool:[]
  },
  getters: {
    getNotify: ({messagePool}) => messagePool[messagePool.length - 1]
  },
  mutations: {
    [SHOW_NOTIFY](state, msg) {
      state.messagePool.push(msg);
    }
  },
  actions: {
    showNotify( { commit }, msg) {
      commit("SHOW_NOTIFY", msg);
    }
  }
};

export default notifications;