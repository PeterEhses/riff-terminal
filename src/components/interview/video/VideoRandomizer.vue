<template>
  <!-- <div>{{ categorieWeights }} <VideoPlayer  /></div>    -->
  <VideoPlayer
    v-if="activeVideo"
    :video="activeVideo"
    @playerEnded="getRandomVideo"
  />
</template>

<script>
import VideoPlayer from "../../VideoPlayer.vue";
import { mapGetters } from "vuex"; // mapState, mapActions

export default {
  components: {
    VideoPlayer,
  },
  data() {
    return {
      activeVideo: "",
      lastWasAudio: true,
    };
  },
  computed: {
    ...mapGetters("interview", {
      absoluteWeights: "idleVideosAbsoluteWeights",
      noConsecutiveVoice: "noConsecutiveVoice",
      noVoiceCategory: "noVoiceCategory",
      categories: "idleVideosCategories",
      fileTree: "fileTree",
    }),
    categorieWeights() {
      const weights = {};
      let weightsTotal = 0;
      for (const key in this.videos) {
        if (this.absoluteWeights) {
          weights[key] =
            (this.videos[key].length > 0) * this.categories[key].weight;
        } else {
          weights[key] = this.videos[key].length * this.categories[key].weight;
        }
        weightsTotal += weights[key];
      }
      let weightsSumStep = 0;
      for (const key in weights) {
        const weight = weights[key] / weightsTotal;
        weights[key] = {
          absolute: weight,
          cummulative: weightsSumStep + weight,
        };
        weightsSumStep += weight;
      }
      return weights;
    },
    videos() {
      const res = {};
      if (this.fileTree && this.fileTree.children && this.fileTree.children.length > 0) {
        for (const file of this.fileTree.children) {
          //   Logger.debug(Object.entries(categories));
          for (let [key, value] of Object.entries(this.categories)) {
            if (
              file.name &&
              typeof file.name === "string" &&
              file.name.endsWith(value.name)
            ) {
              res[key] = this.processVideos(file);
            }
          }
        }
      }
      for (let key of Object.keys(this.categories)) {
        if (!res[key]) {
          res[key] = [];
        }
      }
      return res;
    },
  },
  methods: {
    getRandomVideo() {
      if(!this.fileTree){
        this.$set(this, "activeVideo", "");
        Logger.warn("Filetree error, can't set active Video!", this.$store.state.interview);
        return;
      }
      let newVideo = this.activeVideo;
      while (newVideo == this.activeVideo) {
        const random = Math.random();
        let activeSet;
        if (this.lastWasAudio && this.noConsecutiveVoice) {
          Logger.debug("Force no-voice video");
          activeSet = this.videos[this.noVoiceCategory];
          this.lastWasAudio = false;
        } else {
          Logger.debug("Random video category");
          for (const key in this.categorieWeights) {
            const val = this.categorieWeights[key];
            if (val.cummulative > random) {
              activeSet = this.videos[key];
              if (key === "BORING") {
                this.lastWasAudio = false;
              } else {
                this.lastWasAudio = true;
              }
              break;
            }
          }
        }
        Logger.debug("chose set of random videos:", activeSet);
        const random2 = Math.floor(Math.random() * activeSet.length);
        newVideo = activeSet[random2].path;
      }
      this.$set(this, "activeVideo", newVideo);
      Logger.debug("Active Path:", this.activeVideo);
    },
    processVideos(videoFolder) {
      if (!videoFolder.children) {
        return [];
      }
      const videos = [];
      for (const child of videoFolder.children) {
        if (child.type === "file") {
          videos.push({
            path: child.path,
            name: child.name,
          });
        }
      }
      return videos;
    },
  },
  mounted() {
    this.getRandomVideo();
  },
};
</script>

<style>
</style>