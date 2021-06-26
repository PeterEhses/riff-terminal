<template>
  <div class="effect-wrapper"> <Vignette /></div>
</template>

<script>
import Vignette from "./Vignette.vue";
export default {
  components: {
    Vignette,
  },
};
</script>

<style lang="scss">
  .effect-wrapper{
    //   backdrop-filter: blur(0px); // dirty hack to get mix-blend-mode working
    //   mix-blend-mode: normal;
    // background: red;
      z-index: 1;
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      width: 100%;
      height: 100%;
      transform: rotate(0);
      transform-origin: left top;

  }
</style>