<template>
  <div id="app">
    <transition
      name="fade"
      mode="out-in">
      <Start
        v-if="!getData"
        class="app__start" />
      <div
        v-else
        class="app__tree-container">
        <div
          class="app__tree">
          <Tree
            v-for="element in getData"
            :key="element.id"
            :element="element"
            @changeData="changeData" />
        </div>
        <b-list-group
          v-if="getSelectedElement"
          class="app__info">
          <b-list-group-item
            v-for="item, index in Object.entries(getSelectedElement)"
            :key="index"
            class="app__info-element">
            <span>{{ `${item[0]} : ${item[1]}` }}</span>
          </b-list-group-item>
        </b-list-group>
      </div>
    </transition>
  </div>
</template>

<script>
import Vue from 'vue';
import Start from './components/Start.vue';
import Tree from './components/Tree.vue';

export default {
  name: 'App',
  components: {
    Start,
    Tree,
  },
  methods: {
    deleteElement(array) {
      const startElement = this.$store.getters['dragModule/getStartDragElement'];
      const endElement = this.$store.getters['dragModule/getEndDragElement'];
      if (startElement.id === endElement.id) {
        return array;
      }
      const filtered = array.filter((element) => element.id !== startElement.id);
      return filtered.map((element) => {
        if (!element.children) {
          return element;
        }
        return { ...element, children: this.deleteElement(element.children) };
      });
    },
    addElement(array) {
      const endElement = this.$store.getters['dragModule/getEndDragElement'];
      const startElement = this.$store.getters['dragModule/getStartDragElement'];

      return array.map((element) => {
        const currentElement = element.id === endElement.id;
        if (currentElement) {
          if (element.children) {
            element.children.push(startElement);
          } else {
            Vue.set(element, 'children', []);
            element.children.push(startElement);
          }
          return element;
        }
        if (!element.children) {
          return element;
        }
        return { ...element, children: this.addElement(element.children) };
      });
    },
    changeData() {
      const endElement = this.$store.getters['dragModule/getEndDragElement'];
      const startElement = this.$store.getters['dragModule/getStartDragElement'];
      if (startElement.id === endElement.id) {
        return;
      }
      const newData = this.deleteElement(this.getData);
      this.$store.commit('setData', this.addElement(newData));
      this.$store.dispatch('updateTreeData');
    },
  },
  computed: {
    getData() {
      return this.$store.getters.getData;
    },
    getSelectedElement() {
      return this.$store.getters.getSelectedElement;
    },
  },
};
</script>

<style lang="scss">
#app {
  width: 100%;
  height: 100vh;
  background: whitesmoke;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.app__tree-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  position: fixed;
  align-items: center;
  top: 10%;
  min-width: 320px;
  width: 40vw;
}

.app__tree {
  animation-duration: 1s;
  width: 100%;
  animation-name: slideDown;
  border: 1px solid black;
  max-height: 420px;
  box-sizing: content-box;
  overflow-y: auto;
}

.app__info {
  border: 1px solid black;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  margin-top: 10px;
}

.app__info-element {
  background: transparent;
  font-size: 14px;
}

.fade-enter-active, .fade-leave-active {
  transition: opacity 0.8s ease;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}

@keyframes slideDown {
    0% {
        transform: translateY(-100%);
    }
    100% {
        transform: translateY(0%);
    }
}
</style>
