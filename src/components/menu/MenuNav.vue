<template>
  <div class="menu-nav">
    <button class="menu-nav-btn">Projektion</button>
    <button class="menu-nav-btn">Interviews</button>
    <button class="menu-nav-btn" :class="'selected'">Style</button>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
.menu-nav {
  width: 100%;
  padding: var(--unit-xs) 0 var(--unit-xs) 0;
  .menu-nav-btn {
    border: var(--border-modal);
    border-radius: var(--unit-xs);
    background-color: rgba(0, 0, 0, 0);
    // border-color: rgba(0, 0, 0, 0);
    // background-clip: padding-box;
    padding: 0 var(--unit-xs) 0 var(--unit-xs);
    margin: var(--unit-3xs);
    &:hover {
      background-color: var(--color-neutral-action-modal-hover) !important;
    }
    &.selected {
      background-color: var(--color-neutral-action-modal);
    }
    &:not(.selected) {
      color: var(--input-color-modal);
    }
  }
}
</style>