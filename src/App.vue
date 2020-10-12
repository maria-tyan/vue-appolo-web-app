<template>
  <div id="app">
    <CodingTask />
  </div>
</template>

<script>
import CodingTask from './components/CodingTask.vue';

export default {
  name: 'App',
  components: {
    CodingTask,
  },
};
</script>

<style lang="less">
  @import "./styles/global.less";
  @import "./styles/variables.less";
  @import "./styles/card.less";
  @import "./styles/form.less";
  @import "./styles/overlay.less";
  @import "./styles/animated-block.less";
</style>
