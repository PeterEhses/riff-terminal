<template>
  <!-- <div>{{ categorieWeights }} <VideoPlayer  /></div>    -->
  <VideoPlayer
    v-if="activeVideo"
    :video="activeVideo"
    :tracks="subTracks"
    @playerEnded="setActiveQuestion(null)"
  />
</template>

<script>
import VideoPlayer from "../../VideoPlayer.vue";
import { mapActions, mapGetters } from "vuex"; // mapState, mapActions

export default {
  components: {
    VideoPlayer,
  },
  data() {
    return {
      //   activeVideo: "",
    };
  },
  computed: {
    ...mapGetters("interview", {
      questionsVideos: "questionsVideos",
      questionsSubtitles: "questionsSubtitles",
      activeQuestion: "activeQuestion",
    }),
    activeVideo() {
      if (this.activeQuestion && this.questionsVideos) {
        let av = this.questionsVideos[this.activeQuestion];
        if (av) {
          return av;
        }
      }
      return false;
    },
    subTracks(){
      let returnTracks = {
          subTitlesDE: "", //interviews/video/moshira/WER BIST DU.vtt
          subTitlesEN: "", //interviews/video/moshira/WER BIST DU en.vtt
        }
      if(this.activeQuestion && this.questionsSubtitles){
        if(this.questionsSubtitles.de){
          returnTracks.subTitlesDE = this.questionsSubtitles.de[this.activeQuestion] || ""
        }
        if(this.questionsSubtitles.en){
          returnTracks.subTitlesEN = this.questionsSubtitles.en[this.activeQuestion] || ""
        }
      }
      return returnTracks
    }
  },
  methods: {
    ...mapActions("interview", {
      setActiveQuestion: "setActiveQuestion",
    }),
  },
  mounted() {},
};
</script>

<style>
</style>