import Vue from 'vue';
import Vuex from 'vuex';
import data from '../assets/data.json';
// import axios from 'axios';
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
      setTimeout(() => {
        commit('setData', data.data);
        commit('setLoading', false);
      }, 1000);
    },
  },
});
