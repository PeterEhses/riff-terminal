<template>
  <div class="toggle-switch" @click="$emit('click')">
    <span class="switch-left" :class="left == active ? 'active' : null"
    @click="$emit('click-left')">{{
      left
    }}</span>
    <!-- eslint-disable-next-line no-irregular-whitespace -->
    <div class="switch-delimiter">{{ delimiter }}​</div>
    <span class="switch-right" :class="right == active ? 'active' : null"
    @click="$emit('click-right')">{{
      right
    }}</span>
  </div>
</template> 

<script>
export default {
  props: ["left", "right", "active", "delimiter"],
};
</script>

<style lang="scss">
.toggle-switch {
  --height: var(--unit-lg);
  display: flex;
  justify-content: center;
  align-items: stretch;
  color: var(--input-color-modal);
  border: var(--border-modal);
  border-radius: calc(var(--height) / 2);
  height: var(--height);
  .switch-delimiter {
    display: block;
    border-right: var(--border-modal);
    background-color: var(--color-orange);
    height: auto;
    margin: 0;
    padding: 0;
  }
  .switch-left,
  .switch-right {
    text-align: center;
    flex: 1;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    // border: solid;
    &.active {
      background-color: var(--color-neutral-action-modal);
    }
  }
}
</style>