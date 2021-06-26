<template>
  <div class="projection-wrapper">
      <VideoWrapper/>
      <RandomTextsWrapper/>
      <Vignette/>
  </div>
</template>

<script>
import VideoWrapper from "./VideoWrapper.vue";
import Vignette from "./Vignette.vue";
import RandomTextsWrapper from "./RandomTextsWrapper.vue";
export default {
  components: {
    VideoWrapper, Vignette, RandomTextsWrapper
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