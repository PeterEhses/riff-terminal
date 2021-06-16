<template>
  <div class="interview-wrapper">
    <InterviewHeader
      :heading="translate['global.title']"
      subheading="Meeresbiologin"
      v-if="[]"
    />
    <VideoPlayer/>
    <!-- <div>{{translate}}</div> -->
  </div>
</template>

<script>
import InterviewHeader from "./InterviewHeader.vue";
import VideoPlayer from "./video/VideoPlayer.vue";
import { mapGetters } from "vuex"; // mapState, mapActions
export default {
  components: {
    InterviewHeader,
    VideoPlayer,
  },
  computed: {
    ...mapGetters("interview", {
      translate: "translate",
    }),
  },
};
</script>

<style>
.interview-wrapper {
  width: calc(100 * var(--unit-width));
  height: calc(100 * var(--unit-height));
  background: url("../../assets/test-bg.png");
}
</style>