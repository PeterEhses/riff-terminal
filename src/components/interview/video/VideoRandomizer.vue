<template>
  <!-- <div>{{ categorieWeights }} <VideoPlayer  /></div>    -->
  <VideoPlayer
    v-if="activeVideo"
    :video="activeVideo"
    @playerEnded="handleVideoDone"
  />
</template>

<script>
import VideoPlayer from "../../VideoPlayer.vue";
import { mapGetters, mapActions } from "vuex"; // mapState, mapActions

export default {
  components: {
    VideoPlayer,
  }, 
  data() {
    return {
      activeVideo: "",
      lastWasAudio: true,
      idleTimer: null,
      switchToNextPerson: false,
    };
  },
  computed: {
    ...mapGetters("interview", {
      absoluteWeights: "idleVideosAbsoluteWeights",
      noConsecutiveVoice: "noConsecutiveVoice",
      noVoiceCategory: "noVoiceCategory",
      categories: "idleVideosCategories",
      fileTree: "fileTree",
      idleWaitTime: "idleWaitTime",
      activeInterview: "activeInterview",
      translateInterview: "translateInterview",
      returnToListChance: "returnToListChance",
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
    ...mapActions('interview', {
      setActiveInterview: 'setActiveInterview',
    }),
    handleVideoDone(){
      if(!this.switchToNextPerson){
        this.getRandomVideo()
      } else {
        this.setNextPersion()
      }
    },
    setNextPersion() {
      Logger.info("Setting next Person!")
      if((Math.random*100) < this.returnToListChance){
        Logger.info("Idle returning to selection by chance "+this.returnToListChance+"%")
        this.setActiveInterview(null)
      }
      if(this.activeInterview < this.translateInterview.length - 1){
        this.setActiveInterview(this.activeInterview + 1)
      } else {
        this.setActiveInterview(0)
      }
    },
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
        if (this.lastWasAudio && this.noConsecutiveVoice && this.videos[this.noVoiceCategory] &&this.videos[this.noVoiceCategory].length > 0) {
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
    setNextPersonFlag(){
      this.switchToNextPerson = true;
    },
    processVideos(videoFolder) {
      if (!videoFolder.children) {
        return [];
      }
      const videos = [];
      for (const child of videoFolder.children) {
        if (child.type === "file") {
          if(child.name.endsWith('mp4') || child.name.endsWith('master.m3u8')){
            videos.push({
            path: child.path,
            name: child.name,
          });
          }
        }
      }
      return videos;
    },
  },
  mounted() {
    Logger.info("Displaying Person", this.activeInterview)
    this.getRandomVideo();
    this.idleTimer = setTimeout(() => {this.setNextPersonFlag()}, this.idleWaitTime * 1000);
  },
  beforeDestroy(){
    if(this.idleTimer){
      clearTimeout(this.idleTimer)
    }
  }
};
</script>

<style>
</style>