<template>
  <div class="interview-video">
    <InterviewHeader :heading="translateInterview[activeInterview]['name']" :subheading="translateInterview[activeInterview]['blurb']" />
    <!-- <VideoPlayer /> -->
    <VideoRandomizer />
    <QuestionSelectorOverlay />
    <BackArrow @click="backClicked"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InterviewHeader from "./InterviewHeader.vue";
// import VideoPlayer from "./video/VideoPlayer.vue";
import VideoRandomizer from './video/VideoRandomizer.vue';
import BackArrow from "./BackArrow.vue";
import QuestionSelectorOverlay from "./video/questionoverlay/QuestionSelectorOverlay.vue";
export default {
  components: {
    // VideoPlayer,
    InterviewHeader,
    VideoRandomizer,
    BackArrow,
    QuestionSelectorOverlay,
  },
  data(){
    return{
      playingQuestion: false,
    }
  },
  computed: {
    ...mapGetters("interview", {
      translateInterview: "translateInterview",
      activeInterview: "activeInterview",
    }),
  },
  methods: {
    ...mapActions("interview", {
      setActiveInterview: "setActiveInterview",
    }),
    backClicked(){
      if(this.playingQuestion){
        this.playingQuestion = false
        // do something to return to idle videos
      }else{
        this.setActiveInterview(null)
      }
    }
  }
};
</script>

<style lang="scss">
.interview-video{
    width: 100%;
    height: 100%;
}
</style>