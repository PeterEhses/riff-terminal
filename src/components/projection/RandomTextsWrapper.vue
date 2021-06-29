<template>
  <div class="random-texts-wrapper-wrapper" :style="{'--fade-time': getTextStyle.fadeTime+'s'}">
    <div class="random-texts-wrapper">
      <transition name="fade" :duration="getTextStyle.fadeTime*1000">
        <randomText v-if="visibleText.top">{{
          visibleText.top
        }}</randomText>
      </transition>
    </div>
    <div class="random-texts-wrapper rotated">
      <transition name="fade" :duration="getTextStyle.fadeTime*1000">
        <randomText v-if="visibleText.bottom">{{
          visibleText.bottom
        }}</randomText>
      </transition>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import randomText from "./RandomText.vue";
export default {
  components: {
    randomText,
  },
  data() {
    return {
      visibleText: {
        bottom: false,
        top: false,
      },
      language: {
        bottom: "de",
        top: "de",
      },
      activeText: {
        bottom: false,
        top: false,
      },
      texts: {
        bottom: [],
        top: [],
      },
      textSums: {
        bottom: 0,
        top: 0,
      },
      timers: {},
    };
  },
  computed: {
    ...mapGetters("projection", {
      getTexts: "getTexts",
      getTextTimings: "getTextTimings",
      getTextStyle: "getTextStyle",
    }),
  },
  watch: {
    getTexts: {
      deep: true,
      immediate: true,
      handler() {
        Logger.debug("Setting random texts...");
        const bottom = this.getCdfTextSet(this.getTexts.bottom);
        const top = this.getCdfTextSet(this.getTexts.top);
        this.$set(this.texts, "bottom", bottom.textSet);
        this.$set(this.texts, "top", top.textSet);
        this.$set(this.textSums, "bottom", bottom.sum);
        this.$set(this.textSums, "top", top.sum);
      },
    },
  },
  methods: {
    getCdfTextSet(textSet) {
      let sum = 0;
      for (const key in textSet) {
        textSet[key].cummulativeWeight = sum;
        sum += textSet[key].weight > 0 ? textSet[key].weight : 0;
      }
      return { textSet, sum };
    },
    clearTimers() {
      for (const key in this.timers) {
        try {
          clearInterval(this.timers[key]);
        } catch (e) {
          Logger.warn("Timer Clear failed:", e);
        }
      }
    },
    getRandomTime(type) {
      let pMin = "minWait";
      let pMax = "maxWait";
      if (type === "life") {
        pMin = "minLife";
        pMax = "maxLife";
      }
      let diff = this.getTextTimings[pMax] - this.getTextTimings[pMin];

      const rdiff = Math.random() * diff;
      Logger.debug("Get timings of", pMin, pMax, diff, rdiff)

      const time = this.getTextTimings[pMin] + rdiff;

      Logger.debug("spawn text in " + time + "s", type);
      return (time > 0 ? time : 0) * 1000;
    },
    getRandomText(location) {
      const r = Math.random() * this.textSums[location];
      Logger.trace(
        "Weighted Random ",
        r,
        " subset",
        this.texts[location].filter((el) => r >= el.cummulativeWeight)
      );
      return this.texts[location].filter((el) => r >= el.cummulativeWeight)
        .length -1;
    },
    spawnText(location) {
      if (
        this.texts &&
        this.texts[location] &&
        this.texts[location].length > 0
      ) {
        Logger.debug("spawn text for", location);
        const key = this.getRandomText(location);
        Logger.debug("Choose key", key, location);
        this.$set(this.activeText, location, this.texts[location][key]);
        this.displayText(location);
        this.startWaitTimer(location);
      } else {
        Logger.warn("no texts to randomize");
        this.startNextTextTimer(location);
      }
    },
    displayText(location) {
      if (this.activeText && this.activeText[location]) {
        this.visibleText[location] =
          this.activeText[location][this.language[location]] ||
          this.activeText[location]["de"] ||
          this.activeText[location]["en"];
      } else {
        Logger.warn("No active Text found on display text", this.activeText)
      }
    },
    hideText(location) {
      this.visibleText[location] = false;
    },
    afterText(location) {
      this.hideText(location);
      Logger.debug("aftertext ", location, this.language[location]);
      if (this.language[location] === "de") {
        const key = location + "textLanguageWait";
        clearInterval(this.timers[key]);
        this.$set(
          this.timers,
          key,
          setTimeout(() => {
            this.doEn(location);
          }, this.getTextTimings.languageWait * 1000)
        );
      } else {
        this.language[location] = "de";
        this.startNextTextTimer(location);
      }
    },
    doEn(location) {
      Logger.debug("display second language", location);
      this.language[location] = "en";
      this.displayText(location);
      this.startWaitTimer(location);
    },
    startNextTextTimer(location) {
      Logger.debug("start next text timer", location);
      const key = location + "TextSpawn";
      clearInterval(this.timers[key]);
      this.$set(
        this.timers,
        key,
        setTimeout(() => {
          this.spawnText(location);
        }, this.getRandomTime("wait"))
      );
    },
    startWaitTimer(location) {
      Logger.debug("start wait timer", location);
      const key = location + "TextWait";
      clearInterval(this.timers[key]);
      this.$set(
        this.timers,
        key,
        setTimeout(() => {
          this.afterText(location);
        }, this.getRandomTime("life"))
      );
    },
  },
  mounted() {
    this.startNextTextTimer("bottom");
    this.startNextTextTimer("top");
  },
  beforeDestroy() {
    this.clearTimers();
  },
};
</script>

<style lang="scss">
.random-texts-wrapper-wrapper {
  z-index: 1;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  transform: rotate(0);
  transform-origin: left top;
  .random-texts-wrapper {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100%;
    //   backdrop-filter: blur(0px); // dirty hack to get mix-blend-mode working
    //   mix-blend-mode: normal;
    // background: red;

    .fade-enter-active,
    .fade-leave-active {
      transition: opacity var(--fade-time) ease-in-out;
    }
    .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
      opacity: 0;
    }
    &.rotated {
      transform-origin: center;
      transform: rotate(180deg);
    }
  }
}
</style>