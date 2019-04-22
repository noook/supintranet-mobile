import localStorage from 'nativescript-localstorage';
import Vue from 'nativescript-vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const NSVuexPersistent = store => {
  let storageStr = localStorage.getItem('ns-vuex-persistent');

  if (storageStr) {
   store.replaceState(JSON.parse(storageStr));
  }
  store.subscribe((mutation, state) => {
   localStorage.setItem('ns-vuex-persistent', JSON.stringify(state));
  });
};

const store = new Vuex.Store({
  state: {
    username: null,
    password: null,
  },
  mutations: {},
  actions: {
  },
  getters: {
    getUsername: state => state.username,
    getPassword: state => state.password,
  },
  plugins: [NSVuexPersistent]
});

Vue.prototype.$store = store;

export default store;
