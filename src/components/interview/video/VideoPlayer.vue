<template>
  <div class="video-wrapper">
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import videojs from "video.js";

export default {
  props: {
    options: {
      type: Object,
      default() {
        return {
          autoplay: true,
          controls: true,
          sources: [
            {
              src: "/video/moshira/cta.mp4",
              type: "video/mp4",
            },
            // {
            //     src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            //     type: "video/mp4",
            // }
          ],
        };
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        console.log("onPlayerReady", this);
      }
    );
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>

<style lang="scss">
.video-wrapper {
  width: 100%;
  height: 100%;
}
.video-js {
  width: 100%;
  height: 100%;
}
</style>