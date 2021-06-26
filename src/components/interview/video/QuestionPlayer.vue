<template>
  <!-- <div>{{ categorieWeights }} <VideoPlayer  /></div>    -->
  <VideoPlayer
    v-if="activeVideo"
    :video="activeVideo"
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