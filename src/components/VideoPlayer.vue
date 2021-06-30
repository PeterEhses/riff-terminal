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
      default: "", // C:\\Users\\PeterEhses\\github\\riff-terminal\\public\\interviews\\SNIPPETS MOSHIRA [DE]\\MOSHIRA - BORING\\01 BORING - MOSHIRA.mp4
    },
    tracks: {
      type: Object,
      default() {
        return {
          subTitlesDE: "", //interviews/video/moshira/WER BIST DU.vtt
          subTitlesEN: "", //interviews/video/moshira/WER BIST DU en.vtt
          audioEN: "",
        };
      },
    },
    loop: {
      type: Boolean,
      default: false,
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
            hls: {
              overrideNative: true,
            },
            nativeAudioTracks: false,
            nativeVideoTracks: false,
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
      playerReady: false,
    };
  },
  computed: {
    ...mapGetters("interview", {
      activeLanguage: "activeLanguage",
    }),
  },
  methods: {
    async setSourceAsync(src) {
      const newSrc = src.replace(__static, "")
      this.player.src({
          type: "video/mp4",
          src: newSrc,
        });
        while(this.player.currentSrc() && newSrc){
          Logger.debug(this.player.currentSrc(), newSrc)
          if(this.player.currentSrc() === newSrc){
            Logger.debug("Src set async")
            return;
          }
          await null;
        }
    },
    initiateVideoSource() {
      if (!this.playerReady) {
        Logger.debug("play before ready");
        return;
      } else {
        Logger.debug("Changing video source...");
      }
      this.$emit("playerSourceChange");
      
      if (typeof this.video === "string" && this.video.length > 0) {
        
        // const newSrc = this.video.replace(__static, "")
        // this.player.src({
        //   type: "video/mp4",
        //   src: newSrc,
        // });
        this.setSourceAsync(this.video).then(() => {
                  var playPromise = this.player.play();
        if (playPromise !== undefined) {
          playPromise
            .then((e) => {
              Logger.info("play successful", e);
              // Automatic playback started!
              // Show playing UI.
            })
            .catch((error) => {
              Logger.warn("play error", error);
              // Auto-play was prevented
              // Show paused UI.
            });
        } else {
          Logger.warn("Play Promise undefined");
        }
        }).catch((e) => {
          Logger.warn("Source Promise", e)
        })

      }
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
      if (!this.playerReady) {
        Logger.debug("metadata before ready");
        return;
      } else {
        Logger.debug("changing metadata...");
      }
      this.removeMetadata();

      if (this.tracks.subTitlesDE && this.tracks.subTitlesDE.length > 0) {
        this.player.addRemoteTextTrack(
          {
            kind: "subtitles",
            src: this.tracks.subTitlesDE,
            srclang: "de",
            label: "de",
            mode: "hidden",
          },
          false
        );
      }
      if (this.tracks.subTitlesEN && this.tracks.subTitlesEN.length > 0) {
        this.player.addRemoteTextTrack(
          {
            kind: "subtitles",
            src: this.tracks.subTitlesEN,
            srclang: "en",
            label: "en",
            mode: "hidden",
          },
          false
        );
      }
      if (this.tracks.audioEN && this.tracks.audioEN.length > 0) {
        return;
        //TODO: add audio-track
      }
    },
    setActiveLanguage() {
      if (!this.playerReady) {
        Logger.debug("activelanguage before ready");
        return;
      } else {
        Logger.debug("Changing active language...");
      }
      const tracks = this.player.remoteTextTracks();
      const numTracks = tracks.length;
      for (let i = numTracks - 1; i >= 0; i--) {
        const track = tracks[i];
        if (
          track.kind === "subtitles" &&
          track.language === this.activeLanguage
        ) {
          track.mode = "showing";
        } else {
          track.mode = "hidden";
        }
      }
      this.player.trigger("textTracksChanged");
    },
    setLoop() {
      if (!this.playerReady) {
        return;
      }
      Logger.debug("Set play loop to", this.loop);
      this.player.loop(this.loop);
    },
  },
  watch: {
    loop: {
      handler() {
        this.setLoop();
      },
    },
    video: {
      handler() {
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
    Logger.debug("Video Player Mounted");
    window.VIDEOJS_NO_DYNAMIC_STYLE = this.dynamicStyles;
    const that = this;
    this.player = videojs(
      this.$refs.videoPlayer,
      this.options,
      function onPlayerReady() {
        Logger.info("player ready!");
        that.playerReady = true;
        that.initiateVideoSource();
        that.setMetadata();
        that.setActiveLanguage();
        that.setLoop();
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
  z-index: 0;
  position: relative;
  width: 100%;
  height: 100%;
}
.video-js {
  z-index: 0;
  position: relative;
  width: 100%;
  height: 100% !important;
}
</style>