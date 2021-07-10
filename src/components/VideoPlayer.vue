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
    audio: {
      type: String,
      default: "", //"https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
    },
    tracks: {
      type: Object,
      default() {
        return {
          subTitlesDE: "", //interviews/video/moshira/WER BIST DU.vtt
          subTitlesEN: "", //interviews/video/moshira/WER BIST DU en.vtt
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
          preload: 'auto',
          html5: {
            nativeTextTracks: false,
            vhs: {
              overrideNative: true,
              handlePartialData: true,
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
      audioTrack: {},
    };
  },
  computed: {
    ...mapGetters("interview", {
      activeLanguage: "activeLanguage",
    }),
  },
  methods: {
    async setSourceAsync(src) {
      const newSrc = src.replace(__static, "");
      this.player.src({
        // type: "video/mp4",
        src: newSrc,
      });
      while (this.player.currentSrc() && newSrc) {
        Logger.debug(this.player.currentSrc(), newSrc);
        if (this.player.currentSrc() === newSrc) {
          Logger.debug("Src set async");
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
        this.setSourceAsync(this.video)
          .then(() => {
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
          })
          .catch((e) => {
            Logger.warn("Source Promise", e);
          });
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
      let audioTracks = this.player.audioTracks();
      Logger.debug("Audio Track to choose from:", { ...audioTracks });
      if (audioTracks && audioTracks[0]) {
        if (audioTracks.length == 1) {
          audioTracks[0].enabled = true;
        } else {
          for (let i = 0; i < audioTracks.length; i++) {
            if (audioTracks[i].language.substr(0, 2) === this.activeLanguage) {
              if (!audioTracks[i].enabled) {
                audioTracks[i].enabled = true;
                Logger.debug("Enabled Track", audioTracks[i]);
              } else {
                Logger.debug("Track was already enabled", audioTracks[i]);
              }
            } else if (audioTracks[i]) {
              if (audioTracks[i].enabled) {
                Logger.debug("Disabled Track", audioTracks[i]);
                audioTracks[i].enabled = false;
              } else {
                Logger.debug("Track was already disabled", audioTracks[i]);
              }
            }
          }
        }
      } else {
        Logger.debug("Not enough audio tracks", audioTracks.length);
      }
      this.player.trigger("textTracksChanged");
      Logger.debug("AudioTracks:", { ...this.player.audioTracks() });
    },
    setLoop() {
      if (!this.playerReady) {
        return;
      }
      Logger.debug("Set play loop to", this.loop);
      this.player.loop(this.loop);
    },
    // addAudio() {
    //   if (!this.playerReady) {
    //     return;
    //   }
    //   if (
    //     this.audio &&
    //     typeof this.audio === "string" &&
    //     this.audio.length > 0
    //   ) {
    //     this.audioTrack.audio = document.createElement("audio");
    //     this.audioTrack.audio.id = "audio-" + this._uid;
    //     this.audioTrack.audio.className = "video-js";
    //     this.audioTrack.audio.setAttribute("controls", true);
    //     this.audioTrack.source = document.createElement("source");
    //     this.audioTrack.source.id = "english-" + this._uid;
    //     this.audioTrack.source.src = this.audio.replace(__static, "");
    //     this.audioTrack.source.type = "audio/mpeg";
    //     this.audioTrack.audio.appendChild(this.audioTrack.source);
    //     this.$el.appendChild(this.audioTrack.audio);
    //     this.audioTrack.playerTrack = new videojs.AudioTrack({
    //       id: "english-" + this._uid,
    //       kind: "translation",
    //       label: "English",
    //       language: "en",
    //     });
    //     this.player.audioTracks().addTrack(this.audioTrack.playerTrack);
    //   } else {
    //     this.audioTrack = {};
    //   }
    // },
    // removeAudio() {
    //   if (!this.playerReady) {
    //     return;
    //   }
    //   if (this.audioTrack.playerTrack) {
    //     this.player.audioTracks().removeTrack(this.audioTrack.playerTrack);
    //   }
    // },
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
    audio: {
      handler() {
        // this.addAudio();
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
        that.player.audioTracks().on("addtrack", (e) => {
          that.$nextTick(() => {
            Logger.debug("Audio Track List Change", e);
            that.setActiveLanguage();
          });
        });
        that.player.audioTracks().on("removetrack", (e) => {
          that.$nextTick(() => {
            Logger.debug("Audio Track List Change", e);
            that.setActiveLanguage();
          });
        });
        that.player.audioTracks().on("change", (e) => {
          Logger.info("Active Audio Language is now", e);
        });
        Logger.info("player ready!");
        that.playerReady = true;
        that.initiateVideoSource();
        // that.addAudio();
        that.setMetadata();
        that.setActiveLanguage();
        that.setLoop();
        that.$emit("playerReady");
      }
    );
    // this.player.vhs.options_.externHls.GOAL_BUFFER_LENGTH = 6 // 153;
    this.player.on("ended", () => {
      that.$emit("playerEnded");
    });
    this.$mousetrap.bind("alt+r", this.initiateVideoSource);
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
    if (this.audioTrack.source) {
      this.audioTrack.source.remove();
    }
    if (this.audioTrack.audio) {
      this.audioTrack.audio.remove();
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
  .vjs-text-track-cue{
    inset: 0 0 0 0 !important;
  }
}
</style>