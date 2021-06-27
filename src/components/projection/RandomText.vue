<template>
  <div class="random-text"><p><slot /></p></div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.random-text {
  position: relative;
  display: table;
  margin-top: 12rem;
  margin-left: auto;
  margin-right: auto;
  width: auto;
  max-width: calc(100% - (5rem * 2));
  border-radius: 1.4rem;
  backdrop-filter: blur(1rem);
  p{
      margin: .7rem 1.2rem;
      text-align: center;
      font-size: 2.4rem;
      color: #fff;
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
    background: #000;
    opacity: .5;
  }
}
</style>