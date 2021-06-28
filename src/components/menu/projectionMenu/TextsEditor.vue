<template>
  <div class="texts-editor">
    <h2>Texts</h2>
    <div
      class="texts-editor-category"
      v-for="(category, cid) in getTexts"
      :key="cid"
    >
      <h3>{{ cid }}</h3>
      <div class="texts-editor-text" v-for="(text, tid) in category" :key="tid">
        <div class="content">
        <div class="editable">
                      <div class="tet-de">
            <h5>DE</h5>
            <textarea rows="2" :value="text.de" />
          </div>
          <div class="tet-en">
            <h5>EN</h5>
            <textarea rows="2" :value="text.en" />
          </div>
        </div>
        </div>
        <div class="kebab">
            <h4>{{ tid }}</h4>
                <button class="button-delete">DELETE</button>
            </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  computed: {
    ...mapGetters("projection", {
      getTexts: "getTexts",
    }),
  },
};
</script>

<style lang="scss">
.texts-editor {
  .texts-editor-category {
    border: var(--border-modal);
    border-radius: var(--unit-xs);
    margin: var(--unit-xxs);
    .texts-editor-text {
      display: flex;
      border: var(--border-modal);
      border-radius: var(--unit-xxs);
      margin: var(--unit-xxs);
      .content {
          flex-grow: 1;
          .editable{
              display: flex;
              .tet-de,
              .tet-en{
                  flex: 1;
                  width: 50%;
                  textarea{
                      resize: none;
                     width: 100%;
                  }
              }
          }
      }
      .button-delete {
          background: var(--color-negative-action);
          color: var(--input-color-modal);
        width: var(--unit-3xl);
      }
    }
  }
}
</style>