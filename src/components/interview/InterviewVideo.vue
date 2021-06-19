<template>
  <div class="interview-video">
    <InterviewHeader :heading="translateInterview[activeInterview]['name']" :subheading="translateInterview[activeInterview]['blurb']" />
    <!-- <VideoPlayer /> -->
    <VideoRandomizer :fileTree="fileTree" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InterviewHeader from "./InterviewHeader.vue";
// import VideoPlayer from "./video/VideoPlayer.vue";
import VideoRandomizer from './video/VideoRandomizer.vue';
export default {
  components: {
    // VideoPlayer,
    InterviewHeader,
    VideoRandomizer,
  },
  computed: {
    ...mapGetters("interview", {
      translateInterview: "translateInterview",
      activeInterview: "activeInterview",
      fileTree: "fileTree",
    }),
  },
};
</script>

<style lang="scss">
.interview-video{
    width: 100%;
    height: 100%;
}
</style>