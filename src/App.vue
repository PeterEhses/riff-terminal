<template>
  <div id="app">
    <!-- <router-view/> -->
    <InterviewWrapper v-if="getMode == 'interview'"/>
    <ProjectionWrapper v-if="getMode == 'projection'" />
    <Menu v-if="showMenu" />
  </div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Menu from "@/components/menu/Menu.vue";
import InterviewWrapper from "@/components/interview/InterviewWrapper.vue";
import ProjectionWrapper from "@/components/projection/ProjectionWrapper.vue";
// import CardStack from "@/components/cards/CardStack.vue";

export default {
  name: "app",
  components: {
    Menu,
    InterviewWrapper,
    ProjectionWrapper
  },
  data() {
    return {
      showMenu: false,
    };
  },
  computed: {
    ...mapState("theme", {
      theme: "active",
    }),
    ...mapGetters("general", {
      getMode: "getMode"
    })
  },
  methods: {
    onMenuKey() {
      this.showMenu = !this.showMenu;
    },
    camelToKebab(camel) {
      return camel
        .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
        .toLowerCase();
    },
    setRootCss(key, val) {
      Logger.trace("Set " + key);
      return document.documentElement.style.setProperty("--" + key, val);
    },
  },
  watch: {
    theme: {
      deep: true,
      immediate: true,
      handler() {
        Logger.debug("Running CSS Var Get");

        for (const key in this.theme) {
          this.setRootCss(this.camelToKebab(key), this.theme[key]);
        }
      },
    },
  },
  mounted() {
    this.$store.dispatch("initialize");
    this.$mousetrap.bind("alt+m", this.onMenuKey);
  },
};
</script>


<style lang="scss">
// make boxes boxy
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
  overflow: hidden;

  -webkit-touch-callout: none; /* iOS Safari */
  -webkit-user-select: none; /* Safari */
  -khtml-user-select: none; /* Konqueror HTML */
  -moz-user-select: none; /* Old versions of Firefox */
  -ms-user-select: none; /* Internet Explorer/Edge */
  user-select: none; /* Non-prefixed version, currently */

  transition: opacity 0.15s ease-out;
}
// disable focus box
*:focus {
  outline: none;
}

@media screen and (orientation: portrait) {
  // CSS applied when the device is in portrait mode
  :root {
    --unit-width: 1vw;
    --unit-height: 1vh;
    --window-rotation: 0;
  }
}

@media screen and (orientation: landscape) {
  // CSS applied when the device is in landscape mode
  :root {
    --unit-width: 1vh;
    --unit-height: 1vw;
    --window-rotation: 1;
  }
}

:root {
  --unit-3xs: calc(
    var(--unit-scale-modifier) * var(--unit3xs-scale-modifier) *
      var(--space-unit)
  );
  --unit-xxs: calc(
    (
        var(--unit-scale-modifier) / var(--unit-scale-modifier) /
          var(--unit-scale-modifier) / var(--unit-scale-modifier)
      ) * var(--space-unit)
  );
  --unit-xs: calc(
    (
        var(--unit-scale-modifier) / var(--unit-scale-modifier) /
          var(--unit-scale-modifier)
      ) * var(--space-unit)
  );
  --unit-sm: calc(
    (var(--unit-scale-modifier) / var(--unit-scale-modifier)) *
      var(--space-unit)
  );
  --unit-md: calc((var(--unit-scale-modifier)) * var(--space-unit));
  --unit-lg: calc(
    (var(--unit-scale-modifier) * var(--unit-scale-modifier)) *
      var(--space-unit)
  );
  --unit-xl: calc(
    (
        var(--unit-scale-modifier) * var(--unit-scale-modifier) *
          var(--unit-scale-modifier)
      ) * var(--space-unit)
  );
  --unit-xxl: calc(
    (
        var(--unit-scale-modifier) * var(--unit-scale-modifier) *
          var(--unit-scale-modifier) * var(--unit-scale-modifier)
      ) * var(--space-unit)
  );
  --unit-3xl: calc(
    (
        var(--unit-scale-modifier) * var(--unit-scale-modifier) *
          var(--unit-scale-modifier) * var(--unit-scale-modifier) *
          var(--unit-scale-modifier)
      ) * var(--space-unit)
  );

  color: var(--text-color-default);
  font-size: var(--font-size-initial);
  font-family: var(--font-body);
  font-weight: var(--font-weight-body);
  background: var(--color-off-black);
  background: var(--background-gradient-base);

  // background: linear-gradient(180deg, var(--color-off-black), red);

  transform: rotate(calc(-90deg * var(--window-rotation)));
  transform-origin: left top;
  width: calc(100 * var(--unit-width));
  height: calc(100 * var(--unit-height));
  overflow-x: hidden;
  position: absolute;
  top: calc(100% * var(--window-rotation));
  left: 0;

  padding: 0;
  margin: 0;
  // left: 0;
  // top: 0;
  // right: 0;
  // bottom: 0;
  position: absolute;

  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

#app {
  //,moved here because of modern-css-reset conflict
  line-height: var(--line-height);
}

// scrollbar stuff
/* width */
::-webkit-scrollbar {
  width: calc(var(--scrollbar-thumb-offset) + var(--scrollbar-track-width));
}

/* Track */
::-webkit-scrollbar-track {
  background: var(--scrollbar-track-color);
}

/* Handle */
::-webkit-scrollbar-thumb {
  border: calc(var(--scrollbar-thumb-offset) + var(--scrollbar-thumb-inset))
    solid var(--scrollbar-track-color);

  background-color: var(--scrollbar-thumb-color);
  background-clip: padding-box;
  border-radius: calc((var(--unit-xs) / 2) * var(--scrollbar-thumb-roundness));
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background-color: var(--color-neutral-action-modal-hover);
}

h1,
h2,
h3 {
  font-family: var(--font-heading);
  line-height: var(--line-height-header);
}

h1 {
  font-size: var(--unit-xxl);
  font-weight: var(--font-weight-heading);
}
h2 {
  font-size: var(--unit-lg);
  font-weight: var(--font-weight-subheading);
}
h3 {
  font-size: var(--unit-lg);
}

.content-area {
  margin: var(--margin-main-container);
}
</style>
