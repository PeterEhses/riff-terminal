<template>
  <div class="interview-video">
    <InterviewHeader :heading="translateInterview[activeInterview]['name']" :subheading="translateInterview[activeInterview]['blurb']" />
    <!-- <VideoPlayer /> -->
    <VideoRandomizer :fileTree="fileTree" />
    <BackArrow/>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InterviewHeader from "./InterviewHeader.vue";
// import VideoPlayer from "./video/VideoPlayer.vue";
import VideoRandomizer from './video/VideoRandomizer.vue';
import BackArrow from "./BackArrow.vue";
export default {
  components: {
    // VideoPlayer,
    InterviewHeader,
    VideoRandomizer,
    BackArrow,
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