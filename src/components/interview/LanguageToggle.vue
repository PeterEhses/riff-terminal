<template>
  <div class="ln-toggle" @click="switchLn">
    <span
      class="ln-toggle-de ln-toggle-lan"
      :class="activeLanguage === 'de' ? 'active' : 'inactive'"
      title="DE"
      >DE</span
    >
    /
    <span
      class="ln-toggle-en ln-toggle-lan"
      :class="activeLanguage === 'en' ? 'active' : 'inactive'"
      title="EN"
      >EN</span
    >
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("interview", {
      activeLanguage: "activeLanguage",
    }),
  },
  methods: {
      ...mapActions("interview", {
          switchLanguage: 'switchLanguage',
      }),
      switchLn(){
          this.switchLanguage()
      }
  }
};
</script>

<style lang="scss">
.ln-toggle {
  height: var(--interview-button-height);
    display: flex;
    justify-content: center;
    align-items: center;
    // background: green;
    font-size: var(--font-size-toggle);
    font-weight: var(--font-weight-toggle);
  .active {
    // background: red;
    font-weight: var(--font-weight-toggle-active);
  }
  .inactive {
    //   background: blue;
    opacity: var(--opacity-button-inactive);
  }

  .ln-toggle-lan{
    display: inline-block;
    &:before {
    display: block;
    content: attr(title);
    font-weight: var(--font-weight-toggle-active);
    height: 0;
    overflow: hidden;
    visibility: hidden;
}
  }
}
</style>