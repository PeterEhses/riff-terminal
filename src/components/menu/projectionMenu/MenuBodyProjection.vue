<template>
  <div class="menu-projection">
    <div class="menu-projection-section file-select">
        <h2>Projection Video File Name</h2>
      <div class="input-wrapper">
        
        <input type="text" :value="getVideoFile" @input="saveFileName($event)"/>
      </div>
    </div>
    <hr />
    <div class="menu-projection-section">
      <TextsEditor />
    </div>
    <hr />
    <div class="menu-projection-section">
        <VignetteEditor />
    </div>
    <hr />
    <div class="menu-projection-section">
        <TimingEditor />
    </div>
    <hr />
    <div class="menu-projection-section">
        <TextStyleEditor />
    </div>

  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import TextsEditor from "./TextsEditor.vue";
import VignetteEditor from "./VignetteEditor.vue"
import TextStyleEditor from "./TextStyleEditor.vue"
import TimingEditor from "./TimingEditor.vue"
export default {
  components: {
    TextsEditor,
    VignetteEditor,
    TextStyleEditor,
    TimingEditor,

  },
  computed: {
    ...mapGetters("projection", {
      getVideoFile: "getVideoFile",
    }),
  },
  methods: {
      ...mapActions('projection', {
          updateOne: "updateOne"
      }),
      saveFileName(e){
          Logger.debug("Set Video File:", e)
          this.updateOne({property: "videoFile", value: e.target.value})
      }
  }
};
</script>

<style lang="scss">
.menu-projection-section {
  width: 100%;
  margin: var(--unit-md) 0;
}
.file-select {
  display: flex;
  flex-direction: column;
  justify-content: stretch;
  .input-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: stretch;
    input {
      flex: 1;
      margin: var(--unit-xxs);
    }
    border: var(--border-modal);
    border-radius: var(--unit-xs);
    margin: var(--unit-xxs);
  }
}
</style>