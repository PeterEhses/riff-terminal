<template>
  <div class="interview-header">
    <!-- <div class="interview-header-text-wrapper"> -->
    <h1>{{ heading }}</h1>
    <h2>{{ subheading }}</h2>
    <!-- </div> -->
  </div>
</template>

<script>
export default {
  props: {
    heading: {
      default: "",
    },
    subheading: {
      default: "",
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
    [heading] var(--interview-spacing-gutter-lg) [subheading] var(--interview-spacing-gutter-md)
    [main] auto;
  h1 {
    position: relative;
    grid-column: main;
    grid-row: heading;
    align-self: end;
    bottom: -.2em;
  }
  h2 {
    grid-column: main;
    grid-row: subheading;
  }
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