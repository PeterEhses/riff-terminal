<template>
  <div class="ln-toggle">
    <span
      class="ln-toggle-de"
      :class="activeLanguage === 'de' ? 'active' : 'inactive'"
      >DE</span
    >/
    <span
      class="ln-toggle-en"
      :class="activeLanguage === 'en' ? 'active' : 'inactive'"
      >EN</span
    >
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("interview", {
      activeLanguage: "activeLanguage",
    }),
  },
};
</script>

<style lang="scss">
.ln-toggle {
    background: green;
  .active {
    background: red;
  }
  .inactive {
      background: blue;
  }
}
</style>