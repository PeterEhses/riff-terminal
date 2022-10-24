<template>
  <div class="interview-header">
    <!-- <div class="interview-header-text-wrapper"> -->
    <h1>{{ heading }}</h1>
    <h2>{{ subheading }}</h2>
    <!-- </div> -->
    <BackArrow v-if="activeInterview!==null" @click="backClicked" class="back-arrow" />
    <LanguageToggle class="ln-toggle-header" />
    <RotationToggle class="rt-toggle-header" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import LanguageToggle from "./LanguageToggle.vue";
import RotationToggle from "./RotationToggle.vue";
import BackArrow from "./BackArrow.vue";
export default {
  components: {
    LanguageToggle,
    RotationToggle,
    BackArrow,
  },
  props: {
    heading: {
      default: "",
    },
    subheading: {
      default: "",
    },
  },
  computed: {
    ...mapGetters("interview", {
      translateInterview: "translateInterview",
      activeInterview: "activeInterview",
      activeQuestion: "activeQuestion",
    }),
  },
  methods: {
    ...mapActions("interview", {
      setActiveInterview: "setActiveInterview",
      setActiveQuestion: "setActiveQuestion",
    }),
    backClicked() {
      if (this.activeQuestion) {
        this.setActiveQuestion(null);
        // do something to return to idle videos
      } else {
        this.setActiveInterview(null);
      }
    },
  },
};
</script>

<style lang="scss">
.interview-header {
  z-index: 999666;
  position: absolute;
  width: 100%;
  display: grid;
  grid-template-columns: var(--interview-base-grid-columns);
  grid-template-rows:
    [] var(--interview-spacing-gutter-sm)
    [heading] var(--interview-spacing-gutter-xl) [subheading] var(
      --interview-spacing-gutter-md
    )
    [main] auto;
  h1 {
    position: relative;
    grid-column: main;
    grid-row: heading;
    align-self: end;
    bottom: -0.2em;
  }
  h2 {
    grid-column: main;
    grid-row: subheading;
  }
  .ln-toggle-header {
    grid-column: gutter-right;
    grid-row: heading;
    margin-top: -8px;
  }
  .rt-toggle-header {
    grid-column: gutter-right;
    grid-row: subheading;
    margin-top: -19px;
    margin-left: auto;
    margin-right: auto;
  }
  .back-arrow {
    grid-column: gutter-left;
    grid-row: subheading;
    // margin-top: -2px;
    margin-left: auto;
    margin-right: auto;
  }
  backdrop-filter: var(--blur-normal);
  &:after {
    content: "";
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--color-interview-header-background);
    opacity: var(--opacity-interview-header-background);
  }
}
</style>