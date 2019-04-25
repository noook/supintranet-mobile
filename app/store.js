import NSVuexPersistent from 'nativescript-vuex-persistent';
import Vue from 'nativescript-vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: null,
    password: null,
    grades: [],
  },
  mutations: {
    SET_USER(state, data) {
      state.username = data.username;
      state.password = data.password;
    },
    UNSET_USER(state) {
      state.username = null;
      state.password = null;
    },
    SET_GRADES(state, data) {
      state.grades = data;
    },
    DELETE_GRADES(state) {
      state.grades = [];
    },
  },
  actions: {
    setUser(context, data) {
      context.commit('SET_USER', data);
    },
    unsetUser(context, data) {
      context.commit('UNSET_USER', data);
      context.commit('DELETE_GRADES');
    },
    getGrades(context, data) {
      return axios.post("https://nameless-taiga-44756.herokuapp.com/api/grades/all", {
        username: context.getters.username,
        password: context.getters.password,
      })
        .then(({ data }) => {
          context.commit('SET_GRADES', data.grades);
        })
        .catch(err => {
          console.error(err);
          context.commit('DELETE_GRADES');
          return Promise.reject();
        });
    },
    checkCredentials(context, { username, password }) {
      return axios.post("https://nameless-taiga-44756.herokuapp.com/api/student/check-credentials", {
        username,
        password,
      });
    },
  },
  getters: {
    username: state => state.username,
    password: state => state.password,
    grades: state => state.grades,
  },
  plugins: [NSVuexPersistent([
    'username',
    'password',
  ])]
});

export default store;
