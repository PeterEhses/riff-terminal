<template>
  <!-- <div>{{ videos }} <VideoPlayer  /></div> -->
  <VideoPlayer />
</template>

<script>
import VideoPlayer from "./VideoPlayer.vue";

export default {
  components: {
    VideoPlayer,
  },
  props: ["fileTree"],
  computed: {
    videos() {
      const categories = {
        activateQuestions: "ACTIVATE QUESTIONS",
        boring: "BORING",
        psst: "PSST",
        questions: "QUESTIONS",
      };
      const res = {};
      if (this.fileTree.children && this.fileTree.children.length > 0) {
        for (const file of this.fileTree.children) {
          //   Logger.debug(Object.entries(categories));
          for (let [key, value] of Object.entries(categories)) {
            if (
              file.name &&
              typeof file.name === "string" &&
              file.name.endsWith(value)
            ) {
              res[key] = this.processVideos(file);
            }
          }
        }
      }
      for (let key of Object.keys(categories)) {
        if (!res[key]) {
          res[key] = [];
        }
      }
      return res;
    },
  },
  methods: {
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
};
</script>

<style>
</style>