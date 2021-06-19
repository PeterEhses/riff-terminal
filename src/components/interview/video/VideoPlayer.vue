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
          muted: true,
        //   loop: true,
          fluid: true,
          controls: false,
          html5: {
            nativeTextTracks: false,
          },
          sources: [
            {
              src: "interviews/video/moshira/01 WER BIST DU - MOSHIRA.mp4",
              type: "video/mp4",
            },
            // {
            //     src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            //     type: "video/mp4",
            // }
          ],
          tracks: [
              {
                  kind: "subtitles",
                  src: "interviews/video/moshira/WER BIST DU.vtt",
                  srclang: "de",
                  label: "Deutsch",
                  mode: "hidden"
              },
              {
                  kind: "subtitles",
                  src: "interviews/video/moshira/WER BIST DU en.vtt",
                  srclang: "en",
                  label: "English",
                  mode: "showing"
              } 
          ],
        };
      },
    },
    dynamicStyles: {
        type: Boolean,
        default: true
    }
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
      window.VIDEOJS_NO_DYNAMIC_STYLE = this.dynamicStyles
    const that = this;
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        that.$emit('playerReady')
      }
    );
    this.player.on('ended', () => {
        that.$emit('playerEnded')
    })
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
  height: 100% !important;
}
</style>