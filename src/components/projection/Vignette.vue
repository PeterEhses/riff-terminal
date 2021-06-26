<template>
  <div class="vignette" :style="{'mix-blend-mode': getVignette.blendmode}">
    <div class="bar left" :style="vignettes.left"></div>
    <div class="bar right" :style="vignettes.right"></div>
    <div class="bar top" :style="vignettes.top"></div>
    <div class="bar bottom" :style="vignettes.bottom"></div>
  </div>
</template>

<script>
import {mapGetters} from "vuex";
export default {
  data(){return{
    vignetteWidthLeft: 5,
    vignetteWidthTop: 5,
    vignetteWidthRight: 5,
    vignetteWidthBottom: 5,
    vignetteGradient: "hsl(0, 0%, 0%) 0%,\
    hsla(0, 0%, 0%, 0.954) 5.1%,\
    hsla(0, 0%, 0%, 0.894) 10.4%,\
    hsla(0, 0%, 0%, 0.823) 15.9%,\
    hsla(0, 0%, 0%, 0.743) 21.6%,\
    hsla(0, 0%, 0%, 0.656) 27.5%,\
    hsla(0, 0%, 0%, 0.566) 33.6%,\
    hsla(0, 0%, 0%, 0.474) 40%,\
    hsla(0, 0%, 0%, 0.384) 46.6%,\
    hsla(0, 0%, 0%, 0.297) 53.4%,\
    hsla(0, 0%, 0%, 0.217) 60.5%,\
    hsla(0, 0%, 0%, 0.146) 67.9%,\
    hsla(0, 0%, 0%, 0.086) 75.5%,\
    hsla(0, 0%, 0%, 0.04) 83.4%,\
    hsla(0, 0%, 0%, 0.01) 91.5%,\
    hsla(0, 0%, 0%, 0) 100%"
  }},
  computed: {
    ...mapGetters('projection', {
      getVignette: "getVignette"
    }),
    vignettes(){
      const rv = {}
      rv.left = "background: linear-gradient(90deg, " + this.getVignette.gradient + "); width: calc(" + this.getVignette.width.left + " * var(--unit-width));"
      rv.top = "background: linear-gradient(180deg, " + this.getVignette.gradient + "); height: calc(" + this.getVignette.width.top + " * var(--unit-width));"
      rv.right = "background: linear-gradient(-90deg, " + this.getVignette.gradient + "); width: calc(" + this.getVignette.width.right + " * var(--unit-width));"
      rv.bottom = "background: linear-gradient(0deg, " + this.getVignette.gradient + "); height: calc(" + this.getVignette.width.bottom + " * var(--unit-width));"
      return rv
    }
  }
};
</script>

<style lang="scss">
.vignette {  
  backdrop-filter: blur(0px);
  position: absolute;
  z-index: 420;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;

  .bar {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
  }
  .left {
    right: auto;
    // width: var(--gradient-extent);
    // background: linear-gradient(90deg, var(--gradient-content));
  }
  .right {
    left: auto;
    // width: var(--gradient-extent);
    // background: linear-gradient(-90deg, var(--gradient-content));
  }
  .top {
    bottom: auto;
    // height: var(--gradient-extent);
    // background: linear-gradient(180deg, var(--gradient-content));
  }
  .bottom {
    top: auto;
    // height: var(--gradient-extent);
    // background: linear-gradient(0deg, var(--gradient-content));
  }
}
</style>