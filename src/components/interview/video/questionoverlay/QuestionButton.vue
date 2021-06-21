<template>
  <div class="question" :class="touch || forceActiveState ? 'touch' : null" @touchend="touch= false" @touchstart="touch = true" @click="$emit('click')">
    <p><slot /></p>
  </div>
</template>

<script>
export default {
  props: {
        forceActiveState: {
            default: false
        }
    },
    data(){
        return {
            touch: false,
        }
    }
};
</script>

<style lang="scss">
.question {
  display: flex;
  align-items: center;
  width: 100%;
  height: var(--question-height);
  margin: var(--questions-spacing) 0;
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
    &.touch{
    opacity: var(--opacity-button-press);
  }
  p {
    padding: 0 1em;
    font-size: var(--font-size-questions);
    // &:before {
    //   content: "🡢 ";
    // }
  }
}
</style>