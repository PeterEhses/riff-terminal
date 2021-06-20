<template>
  <div class="play-button" :class="touch || forceActiveState ? 'touch' : null" @touchend="touch= false" @touchstart="touch = true">
    <svg class="play" viewBox="0 0 100 100">
      <polygon class="triangle" points="93 50, 7 0, 7 100" />
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
.play-button {
    width: var(--play-button-size);
    height: var(--play-button-size);
    display: flex;
    justify-content: center;
    align-items: center;
    // background: blue;
    border-radius: 5000px;
    &:before{
        content:"";
        position: absolute;
        z-index: 0;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: var(--color-play-button);
        opacity: var(--play-button-opacity);
    }
  .play {
      position: relative;
    left: 7%;
    fill: var(--color-play-button);
    width: 45%;
    height: 45%;
    
  }
  &.touch{
      opacity: var(--opacity-button-press);
  }
}
</style>