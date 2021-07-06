<template>
  <div>
    <h2>timings</h2>
    <div class="timings-content">
      <div
        v-for="(timing, key) in getTextTimings"
        :key="key"
        class="timing-group"
      >
        <label>{{key}}</label>
        <input
            step="0.01"
            type="range"
            :value="timing"
            :min="minVals[key]"
            max="120"
            @input="setTextTiming({ key: key, value: $event.target.value })"
          />
          <input
            type="number"
            :value="timing"
            :min="minVals[key]"
            @input="setTextTiming({ key: key, value: $event.target.value })"
          />s
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("projection", {
      getTextTimings: "getTextTimings",
    }),
    minVals(){
        return{
            minLife: 0,
            maxLife: this.getTextTimings.minLife,
            minWait: 0,
            maxWait: this.getTextTimings.minWait,
            languageWait: 0,
        }
    }
  },
  methods: {
      ...mapActions('projection', {
          setTextTiming: "setTextTiming"
      })
  }
};
</script>

<style lang="scss">
.timings-content {
  border: var(--border-modal);
  border-radius: var(--unit-xs);
  margin: var(--unit-xxs);
  .timing-group {
    display: flex;
    justify-content: center;
    align-items: center;
    border: var(--border-modal);
    border-radius: var(--unit-xxs);
    margin: var(--unit-xxs);
    padding: var(--unit-3xs) var(--unit-xxs);
    label{
        width: 12ch;
    }
  }
}
</style>