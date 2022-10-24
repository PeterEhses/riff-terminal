<template>
  <div class="interview-wrapper">
    <InterviewSelection v-if="activeInterview === null"/>
    <InterviewVideo v-else />
    <!-- <div>{{translate}}</div> -->
  </div>
</template>

<script>

import InterviewSelection from "./InterviewSelection.vue";
import InterviewVideo from "./InterviewVideo.vue";
import { mapGetters } from "vuex"; // mapState, mapActions
export default {
  components: {
    InterviewSelection,
    InterviewVideo,
  },
  computed: {
    ...mapGetters("interview", {
      translate: "translate",
      activeInterview: "activeInterview",
      rotation: "rotation",
    }),
  },
  watch: {
    rotation(val){
        this.setRootCss(this.camelToKebab('rootRotation'), val);
    }
  }
};
</script>

<style lang="scss">
.interview-wrapper {
  width: calc(100 * var(--unit-width));
  height: calc(100 * var(--unit-height));
  background: var(--color-gray-33);
  transform: rotate(calc(1deg * var(--root-rotation)));
  .video-js .vjs-text-track-display {
    position: absolute;
    display: grid;
    grid-template-columns: var(--interview-base-grid-columns);
    grid-template-rows: [main] var(--subtitle-box-height) [] auto;
    top: auto;

    bottom: var(--subtitle-bottom-offset) !important;
    opacity: 0;
    //   background: red;
    height: var(--subtitle-box-height);

    backdrop-filter: var(--blur-normal);
    &:after {
      content: "";
      z-index: -1;
      position: absolute;
      width: 100%;
      height: 100%;
      background: var(--color-interview-header-background);
      opacity: var(--opacity-interview-header-background);
    }
    > div {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      margin: 0 !important;
      grid-column: main;
      grid-row: main;
    //   background: red;
      padding: 0;
      margin: 0;
    }
    .vjs-text-track-cue {
        // background: blue !important;
      position: relative !important;
            display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 100% !important;
      height: 100% !important;
      top: 0 !important;
      bottom: 0 !important;
      > div{
          font-size: var(--font-size-subtitles);
          text-align: left;
          width: 100%;
          background: none !important;
      }
    }
  }
}
</style>