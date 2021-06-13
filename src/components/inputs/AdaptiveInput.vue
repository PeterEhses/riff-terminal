<template>
  <div class="adaptive-input">
    <input
      class="default-input"
      :class="isAny ? 'adaptive' : null"
      v-model="internalValue"
      @input="handleInput"
      :style="isColor ? {'background': value} : null"
    />
    <button
      class="adaptive-action"
      v-if="isAny"
      @click="adaptiveEnabled = !adaptiveEnabled"
    ></button>
    <div class="adaptive-content" v-if="isAny && adaptiveEnabled">
      <ColorInput v-model="internalValue" @input="handleInput" v-if="isColor" />
      <TextAreaInput
        v-model="internalValue"
        @input="handleInput"
        v-else-if="isTextArea"
      />
    </div>
  </div>
</template>

<script>
import ColorInput from "./ColorInput.vue";
import TextAreaInput from "./TextAreaInput.vue";
export default {
  components: {
    ColorInput,
    TextAreaInput,
  },
  props: {
    value: {
      default: "",
    },
    textAreaLength: {
      default: 40,
    },
  },
  data() {
    return {
      internalValue: this.value,
      adaptiveEnabled: false,
    };
  },
  computed: {
    isAny() {
      return this.isColor || this.isTextArea;
    },

    isColor() {
      return this.valueColorType;
    },
    isTextArea() {
      return this.internalValue.length > this.textAreaLength;
    },
    valueColorType() {
      let string = this.internalValue;
      if (typeof string !== "string") {
        return false;
      }
      if (string.substring(0, 1) === "#") {
        if (string.length == 9) {
          return "hex8";
        } else if (string.length == 7) {
          return "hex";
        } else {
          return false;
        }
      } else if (string.substring(0, 3) === "rgb") {
        if (string.substring(3, 4) === "a") {
          return "rgba";
        } else {
          return "rgb";
        }
      } else if (string.substring(0, 3) === "hsl") {
        if (string.substring(3, 4) === "a") {
          return "hsla";
        } else {
          return "hsl";
        }
      } else if (string.substring(0, 3) === "hsv") {
        if (string.substring(3, 4) === "a") {
          return "hsva";
        } else {
          return "hsv";
        }
      }
      return false;
    },
  },
  methods: {
    handleInput() {
      this.$emit("input", this.internalValue);
    },
  },
  watch: {
    value: {
      deep: true,
      immediate: true,
      handler() {
        this.internalValue = this.value;
      },
    },
  },
};
</script>

<style lang="scss">

</style>