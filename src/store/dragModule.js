import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    startDragElement: null,
    endDragElement: null,
  },
  getters: {
    getStartDragElement: (state) => state.startDragElement,
    getEndDragElement: (state) => state.endDragElement,
  },
  mutations: {
    setStartDragElement: (state, value) => { state.startDragElement = value; },
    setEndDragElement: (state, value) => { state.endDragElement = value; },
    resetDragElements: (state) => {
      state.startDragElement = null;
      state.endDragElement = null;
    },
  },
  actions: {
  },
};
