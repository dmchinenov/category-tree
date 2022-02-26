import Vue from 'vue';
import Vuex from 'vuex';
import data from '../assets/data.json';
// import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appLoading: false,
    data: null,
    startDragElement: null,
    endDragElement: null,
  },
  getters: {
    getLoadingStatus: (state) => state.appLoading,
    getData: (state) => state.data,
  },
  mutations: {
    setLoading: (state, value) => { state.appLoading = value; },
    setData: (state, value) => { state.data = value; },
    setStartDragElement: (state, value) => { state.startDragElement = value; },
    setEndDragElement: (state, value) => { state.endDragElement = value; },
    resetDragElements: (state) => {
      state.startDragElement = null;
      state.endDragElement = null;
    },
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
