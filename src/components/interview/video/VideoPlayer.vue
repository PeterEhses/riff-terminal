<template>
  <div class="video-wrapper">
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>

<script>
import videojs from "video.js";
import { mapGetters } from "vuex";

export default {
  props: {
    video: {
      type: String,
      default: "interviews/video/moshira/01 WER BIST DU - MOSHIRA.mp4",
    },
    tracks: {
      type: Object,
      default() {
        return {
          subTitlesDE: "interviews/video/moshira/WER BIST DU.vtt",
          subTitlesEN: "interviews/video/moshira/WER BIST DU en.vtt",
          audioEN: "",
        };
      },
    },
    options: {
      type: Object,
      default() {
        return {
          //   autoplay: true,
          muted: process.env.NODE_ENV === "development",
          //   loop: true,
          fluid: true,
          controls: false,
          html5: {
            nativeTextTracks: false,
          },
          sources: [
            // {
            //   src: "interviews/video/moshira/01 WER BIST DU - MOSHIRA.mp4",
            //   type: "video/mp4",
            // },
            // {
            //     src: "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
            //     type: "video/mp4",
            // }
          ],
          tracks: [
            // {
            //   kind: "subtitles",
            //   src: "interviews/video/moshira/WER BIST DU.vtt",
            //   srclang: "de",
            //   label: "Deutsch",
            //   mode: "hidden",
            // },
            // {
            //   kind: "subtitles",
            //   src: "interviews/video/moshira/WER BIST DU en.vtt",
            //   srclang: "en",
            //   label: "English",
            //   mode: "showing",
            // },
          ],
        };
      },
    },
    dynamicStyles: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      player: null,
    };
  },
  computed: {
    ...mapGetters("interview", {
      activeLanguage: "activeLanguage",
    }),
  },
  methods: {
    initiateVideoSource() {
      this.$emit("playerSourceChange");
      this.player.src({ type: "video/mp4", src: this.video });
      this.player.play();
    },
    removeMetadata() {
      const tracks = this.player.remoteTextTracks();
      const numTracks = tracks.length;
      for (let i = numTracks - 1; i >= 0; i--) {
        this.player.removeRemoteTextTrack(tracks[i]);
      }
      //TODO: remove audio-track
    },
    setMetadata() {
      this.removeMetadata();

      if (this.tracks.subTitlesDE && this.tracks.subTitlesDE.length > 0) {
        this.player.addRemoteTextTrack({
          kind: "subtitles",
          src: this.tracks.subTitlesDE,
          srclang: "de",
          label: "de",
          mode: "hidden",
        });
      }
      if (this.tracks.subTitlesEN && this.tracks.subTitlesEN.length > 0) {
        this.player.addRemoteTextTrack({
          kind: "subtitles",
          src: this.tracks.subTitlesEN,
          srclang: "en",
          label: "en",
          mode: "hidden",
        });
      }
      if (this.tracks.audioEN && this.tracks.audioEN.length > 0) {
        return;
        //TODO: add audio-track
      }
    },
    setActiveLanguage() {
      const tracks = this.player.remoteTextTracks();
      const numTracks = tracks.length;
      for (let i = numTracks - 1; i >= 0; i--) {
        const track = tracks[i];
        if (track.kind === "subtitles" && track.language === this.activeLanguage) {
            this.$emit(track.label)
          track.mode = "showing";
        }
      }
    },
  },
  watch: {
    video: {
      hander() {
        this.initiateVideoSource();
      },
    },
    tracks: {
      deep: true,
      handler() {
        this.setMetadata();
      },
    },
    activeLanguage: {
      handler() {
        this.setActiveLanguage();
      },
    },
  },
  mounted() {
    window.VIDEOJS_NO_DYNAMIC_STYLE = this.dynamicStyles;
    const that = this;
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        that.initiateVideoSource();
        that.setMetadata();
        that.setActiveLanguage();
        that.$emit("playerReady");
      }
    );
    this.player.on("ended", () => {
      that.$emit("playerEnded");
    });
    this.$mousetrap.bind("alt+r", this.initiateVideoSource);
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