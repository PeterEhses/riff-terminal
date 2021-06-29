<template>
  <div class="text-style-wrapper">
    <h2>bubble styles</h2>
    <table class="text-style-content">
      <tr>
        <th>Property</th>
        <th>Value</th>
      </tr>
      <tr v-for="(value, key) in getTextStyle" :key="key">
        <td>{{ key }}</td>
        <AdaptiveInput
          :value="value"
          @input="setTextStyle({ key: key, value: $event })"
        />
      </tr>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import AdaptiveInput from "@/components/inputs/AdaptiveInput.vue";
export default {
  components: {
    AdaptiveInput,
  },
  computed: {
    ...mapGetters("projection", {
      getTextStyle: "getTextStyle",
    }),
  },
  methods: {
    ...mapActions("projection", {
      setTextStyle: "setTextStyle",
    }),
  },
};
</script>

<style lang="scss">
.text-style-wrapper {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .text-style-content {
    border: var(--border-modal);
    border-radius: var(--unit-xs);
    margin: var(--unit-xxs);
    flex: 1;
    td {
      vertical-align: baseline;
    }
    td:nth-of-type(1) {
      width: 20ch;
    }
  }
}
</style>