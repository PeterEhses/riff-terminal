<template>
  <div>
    <InterviewHeader :heading="translateInterview[activeInterview]['name']" :subheading="translateInterview[activeInterview]['blurb']" />
    <VideoPlayer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import InterviewHeader from "./InterviewHeader.vue";
import VideoPlayer from "./video/VideoPlayer.vue";
export default {
  components: {
    VideoPlayer,
    InterviewHeader,
  },
  computed: {
    ...mapGetters("interview", {
      translateInterview: "translateInterview",
      activeInterview: "activeInterview",
    }),
  },
};
</script>

<style>
</style>