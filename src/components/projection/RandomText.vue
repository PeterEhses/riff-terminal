<template>
  <div class="random-text" :style="computedStyle"><p><slot /></p></div>
</template>

<script>
    import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters("projection", {
            style: "getTextStyle",
        }),
        computedStyle(){
            const style = this.style
            return{
                '--margin-tb': style.textPaddingTopBottom+"rem",
                '--margin-lr': style.textPaddingLeftRight+"rem",
                '--text-align': style.textAlign,
                '--font-size': style.fontSize+"rem",
                '--margin-top': style.marginTop+"rem",
                '--margin-sides': style.marginSides+"rem",
                '--border-radius': style.borderRadius+"rem",
                '--blur-amount': style.blurAmount+"rem",
                '--text-color': style.textColor,
                '--background-color': style.backgroundColor,
                '--backgroundOpacity': style.backgroundOpacity,

            }
        }
    }
};
</script>

<style lang="scss">
.random-text {
  position: relative;
  display: table;
  margin-top: var(--margin-top);
  margin-left: auto;
  margin-right: auto;
  width: auto;
  max-width: calc(100% - (var(--margin-sides) * 2));
  border-radius: var(--border-radius);
  backdrop-filter: blur(var(--blur-amount));
  p{
      margin: var(--margin-tb) var(--margin-lr);
      text-align: var(--text-align);
      font-size: var(--font-size);
      color: var(--text-color);
  }
  &:after {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    content: "";
    z-index: -1;
    position: absolute;
    width: 100%;
    height: 100%;
    background: var(--background-color);
    opacity: var(--background-opacity);
  }
}
</style>