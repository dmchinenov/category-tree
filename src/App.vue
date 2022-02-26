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
      if (array.length === 1) {
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
    changeData() {
      console.log('edit data in app');
      const newData = this.deleteElement(this.getData);
      this.$store.commit('setData', newData);
      // cosnt newData = this.deleteElement()
      // const data = this.$store.getters.getData;
      // const newData = this.deleteElement(data);
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
