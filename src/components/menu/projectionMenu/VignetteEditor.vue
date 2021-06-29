<template>
  <div class="vignette-editor">
    <h2>Vignette</h2>
    <div class="vignette-editor-content">
      <div class="vignette-group">
        <h3>blendmode</h3>
        <div class="vignette-group-content blendselect">
          <DropDownInput
            :options="blendmodeOptions"
            :value="
              blendmodeOptions.findIndex((v) => v == getVignette.blendmode)
            "
            @input="setVignetteBlendmode(blendmodeOptions[$event])"
          />
        </div>
      </div>
      <div class="vignette-group">
        <h3>width</h3>
        <div
          class="vignette-group-content"
          v-for="(vignette, id) in getVignette.width"
          :key="id"
        >
          <label for="w-top">{{ id }}</label>
          <input
            name="w-top"
            step="0.01"
            type="range"
            :value="vignette"
            min="0"
            max="100"
            @input="setVignetteWidth({ key: id, value: $event.target.value })"
          />
          <input
            type="number"
            :value="vignette"
            min="0"
            @input="setVignetteWidth({ key: id, value: $event.target.value })"
          />
        </div>
      </div>
      <div class="vignette-group">
        <h3>gradient</h3>
        <div class="vignette-group-content blendselect">
          <AdaptiveInput
            :value="getVignette.gradient"
            forceMode="textarea"
            @input="setVignetteGradient($event)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import DropDownInput from "@/components/inputs/DropDownInput.vue";
import AdaptiveInput from "@/components/inputs/AdaptiveInput.vue";
export default {
  components: {
    DropDownInput,
    AdaptiveInput,
  },
  data() {
    return {
      blendmodeOptions: [
        "normal",
        "multiply",
        "screen",
        "overlay",
        "darken",
        "lighten",
        "color-dodge",
        "color-burn",
        "hard-light",
        "soft-light",
        "difference",
        "exclusion",
        "hue",
        "saturation",
        "color",
        "luminosity",
        "initial",
        "inherit",
        "revert",
        "unset",
      ],
    };
  },
  computed: {
    ...mapGetters("projection", {
      getVignette: "getVignette",
    }),
  },
  methods: {
    ...mapActions("projection", {
      setVignetteWidth: "setVignetteWidth",
      setVignetteBlendmode: "setVignetteBlendmode",
      setVignetteGradient: "setVignetteGradient",
    }),
  },
};
</script>

<style lang="scss">
.vignette-editor-content {
  border: var(--border-modal);
  border-radius: var(--unit-xs);
  margin: var(--unit-xxs);
  .vignette-group {
    h3 {
      margin: var(--unit-xxs);
    }
    .vignette-group-content {
      display: flex;
      justify-content: center;
      align-items: center;
      border: var(--border-modal);
      border-radius: var(--unit-xxs);
      margin: var(--unit-xxs);
      padding: var(--unit-3xs) var(--unit-xxs);
      label {
        width: 6ch;
      }
      &.blendselect {
        justify-content: start;
      }
    }
  }
}
</style>