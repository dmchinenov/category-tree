<template>
  <div
    @dragover.prevent>
    <div
      class="tree"
      :class="[
        dragStart ? 'tree_drag-start' : '',
        dragOver ? 'tree_drag-over' : ''
      ]"
      draggable="true"
      @dragstart="startDrag(element)"
      @dragend="endDrag"
      @dragover="overDrag"
      @dragleave="leaveDrag"
      @drop="dropDrag(element)"
      @click="selectElement">
      <div
        :style="`width: ${paddingForChild}px`" />
      <b-icon
        class="tree__icon"
        :class="[
          showChildren && isParent ? 'tree__icon_show' : '',
          isParent ? '' : 'tree__icon_child']"
        :icon="isParent ? 'chevron-right' : 'circle-fill'" />
      <span
        class="tree__title">
        {{ element.name }}
      </span>
    </div>
    <div
      v-if="showChildren && element.children">
      <Tree
        v-for="children in element.children"
        :key="children.id"
        :element="children"
        :padding-for-child="paddingForChild + 30"
        @changeData="changeData" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tree',
  props: {
    element: {
      type: Object,
      default: null,
    },
    paddingForChild: {
      type: Number,
      default: 20,
    },
  },
  data: () => ({
    showChildren: false,
    dragStart: false,
    dragOver: false,
  }),
  methods: {
    selectElement() {
      this.showChildren = !this.showChildren;
      this.$store.commit('setSelectedElement', this.element);
    },
    startDrag(element) {
      this.dragStart = true;
      this.$store.commit('dragModule/setStartDragElement', element);
    },
    endDrag() {
      this.dragStart = false;
    },
    overDrag() {
      this.dragOver = true;
    },
    leaveDrag() {
      this.dragOver = false;
    },
    dropDrag(element) {
      this.dragEnter = false;
      this.dragOver = false;
      this.$store.commit('dragModule/setEndDragElement', element);
      this.$emit('changeData');
    },
    changeData() {
      this.$emit('changeData');
    },
  },
  computed: {
    isParent() {
      return this.element.children && this.element.children.length > 0;
    },
  },
};
</script>

<style lang="scss" scoped>
.tree {
  align-items: center;
  height: 70px;
  padding: 20px 20px 20px 0px;
  display: flex;
  cursor: pointer;
  &:hover {
    background: rgba(196, 196, 196, 0.3);
  }
}

.tree_drag-start {
  opacity: 0.1;
}

.tree_drag-over {
  border: 4px dashed rgba(196, 196, 196, 0.3);
}

.tree__title {
  color: black;
  font-size: 20px;
  font-weight: 400;
}

.tree__icon {
  width: 20px;
  height: 20px;
  color: black;
  margin-right: 10px;
  transform: rotate(0deg);
  transition: 0.3s ease;
  &.tree__icon_show {
  transform: rotate(90deg);
  transition: 0.3s ease;
  }
  &.tree__icon_child {
    width: 10px;
    height: 10px;
    margin-right: 20px;
  }
}

</style>
