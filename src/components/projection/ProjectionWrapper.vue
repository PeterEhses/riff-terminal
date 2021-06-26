<template>
  <div class="projection-wrapper">
      <VideoWrapper/>
      <Vignette/>
  </div>
</template>

<script>
import VideoWrapper from "./VideoWrapper.vue";
import Vignette from "./Vignette.vue";
export default {
  components: {
    VideoWrapper, Vignette, 
  },
};
</script>

<style lang="scss">
.projection-wrapper {
    position: relative;
  width: calc(100 * var(--unit-width));
  height: calc(100 * var(--unit-height));

}
</style>