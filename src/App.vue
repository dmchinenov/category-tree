<template>
  <div id="app">
    <!-- <ListData /> -->
    <transition
      name="fade"
      mode="out-in">
      <Start
        v-if="!getData"
        class="app__start" />
      <div
        v-else
        class="app__tree">
        <Tree
          v-for="element in getData"
          :key="element.id"
          :element="element"
          @changeData="changeData" />
      </div>
    </transition>
  </div>
</template>

<script>
// import Vue from 'vue';
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
      const filtered = array.filter((element) => element.id !== startElement.id);
      return filtered.map((element) => {
        if (!element.children) {
          return element;
        }
        return { ...element, children: this.deleteElement(element.children) };
      });
    },
    // addElement(data) {
    //   const startElement = this.$store.getters['dragModule/getStartDragElement'];
    //   const endElement = this.$store.getters['dragModule/getEndDragElement'];

    //   data.forEach((element) => {
    //     const currentParent = element.id === endElement.id;
    //     if (currentParent) {
    //       if (element.children) {
    //         element.children.push(startElement);
    //       } else {
    //         Vue.set(element, 'children', []);
    //         element.children.push(startElement);
    //       }
    //     }
    //     console.log(currentParent, element);
    //   });
    // },
    changeData() {
      console.log('edit data in app');
      const newData = this.deleteElement(this.getData);
      this.$store.commit('setData', newData);
      console.log(newData);
      // this.addElement(newData);
      this.$store.commit('setData', newData);
    },
  },
  computed: {
    getData() {
      return this.$store.getters.getData;
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

.app__tree {
  min-width: 320px;
  width: 40vw;
  animation-duration: 1s;
  animation-name: slideDown;
  border: 1px solid black;
  position: fixed;
  top: 30%;
  max-height: 500px;
  overflow-y: auto;
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
