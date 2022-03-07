import Vue from 'vue';
import Vuex from 'vuex';
import data from '../assets/data.json';
import dragModule from './dragModule';

Vue.use(Vuex);

export default new Vuex.Store({
  namespaced: true,
  modules: {
    dragModule,
  },
  state: {
    appLoading: false,
    data: null,
  },
  getters: {
    getLoadingStatus: (state) => state.appLoading,
    getData: (state) => state.data,
  },
  mutations: {
    setLoading: (state, value) => { state.appLoading = value; },
    setData: (state, value) => { state.data = value; },
  },
  actions: {
    loadTreeData({ commit }) {
      commit('setLoading', true);

      // return axios.get(`blabla/apiv3/categories/${token}/blabla....`, {
      //   params: 'какие-то params...'
      // })
      //   .then(({ data: { categories} }) => {
      //     commit('setData', categories);
      //     return Promise.resolve(categories);
      // });

      setTimeout(() => {
        commit('setData', data.data);
        commit('setLoading', false);
      }, 2000);
    },
    updateTreeData() {
      // commit('setLoading', true);
      // return axios.post(`blabla/ap....`, getters.getData)
      //   .then(({ data: { categories } }) => {
      //     return Promise.resolve();
      //   })
      //   .catch((error) => {
      //     return Promise.reject(error);
      //   });
    },
  },
});
