<template>
  <div class="interview-video">
    <InterviewHeader :heading="translateInterview[activeInterview]['name']" :subheading="translateInterview[activeInterview]['blurb']" />
    <!-- <VideoPlayer /> -->
    <VideoRandomizer v-if="!activeQuestion" />
    <QuestionPlayer v-else />
    <QuestionSelectorOverlay v-if="!activeQuestion"/>
    <BackArrow @click="backClicked"/>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import InterviewHeader from "./InterviewHeader.vue";
// import VideoPlayer from "./video/VideoPlayer.vue";
import VideoRandomizer from './video/VideoRandomizer.vue';
import QuestionPlayer from './video/QuestionPlayer.vue';
import BackArrow from "./BackArrow.vue";
import QuestionSelectorOverlay from "./video/questionoverlay/QuestionSelectorOverlay.vue";
export default {
  components: {
    // VideoPlayer,
    InterviewHeader,
    VideoRandomizer,
    QuestionPlayer,
    BackArrow,
    QuestionSelectorOverlay,
  },
  data(){
    return{
    }
  },
  computed: {
    ...mapGetters("interview", {
      translateInterview: "translateInterview",
      activeInterview: "activeInterview",
      activeQuestion: "activeQuestion", 
    }),
  },
  methods: {
    ...mapActions("interview", {
      setActiveInterview: "setActiveInterview",
      setActiveQuestion: 'setActiveQuestion',
    }),
    backClicked(){
      if(this.activeQuestion){
        this.setActiveQuestion(null)
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