<template>
  <div class="back-arrow" :class="touch || forceActiveState ? 'touch' : null" @touchend="touch= false" @touchstart="touch = true" @click="$emit('click')">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" >
        <path
          d="M96.51,46.51H11.91L52.47,6A3.49,3.49,0,0,0,47.53,1L1,47.53a3.56,3.56,0,0,0-.76,1.14s0,0,0,.06a3.35,3.35,0,0,0,0,2.54s0,0,0,.06A3.56,3.56,0,0,0,1,52.47L47.53,99a3.49,3.49,0,0,0,4.94-4.93L11.91,53.49h84.6a3.49,3.49,0,0,0,0-7Z"
        />
      </svg>
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
.back-arrow {
    // position: absolute;
    display: flex;
    justify-content: center;
    align-items: center;
    bottom: 0;
    left: 0;
    // background: color-;
    // width: var(--interview-spacing-gutter-xl);
    height: var(--back-button-size);
    svg{
        width: var(--back-button-size);
        height: var(--back-button-size);
        fill: var(--color-back-button);
    }
    &.touch{
      opacity: var(--opacity-button-press);
  }
}
</style>