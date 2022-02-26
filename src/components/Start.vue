<template>
  <b-container class="start">
    <h1 class="start__title">
      Hello
    </h1>
    <b-button
      size="xl"
      variant="primary"
      class="start__load-button"
      :disabled="getLoadingStatus"
      @click="loadData">
      <b-spinner
        v-if="getLoadingStatus"
        small
        class="start__spinner" />
      <span>{{ buttonText }} </span>
    </b-button>
  </b-container>
</template>

<script>
export default {
  name: 'Start',
  methods: {
    loadData() {
      this.$store.dispatch('loadTreeData');
    },
  },
  computed: {
    getLoadingStatus() {
      return this.$store.getters.getLoadingStatus;
    },
    buttonText() {
      return this.getLoadingStatus ? 'Загрузка...' : 'Получить данные';
    },
  },
};
</script>

<style lang="scss" scoped>
  .start {
    text-align: center;
  }

  .start__load-button {
    width: 200px;
  }

  .start__spinner {
    margin-right: 10px;
  }
</style>
