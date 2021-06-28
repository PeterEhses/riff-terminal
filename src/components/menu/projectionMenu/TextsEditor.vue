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
          <button class="button-delete" @click="removeTextpair({location: cid, id: tid})">DELETE</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters("projection", {
      getTexts: "getTexts",
    }),
  },
  methods: {
      ...mapActions("projection", {
          removeTextpair: "removeTextpair"
      })
  }
};
</script>

<style lang="scss">
.texts-editor {
  .texts-editor-category {
    border: var(--border-modal);
    border-radius: var(--unit-xs);
    margin: var(--unit-xxs);
    h3{
        margin: var(--unit-xxs);
    }
    .texts-editor-text {
      display: flex;
      border: var(--border-modal);
      border-radius: var(--unit-xxs);
      margin: var(--unit-xxs);
      .content {
        flex-grow: 1;
        .editable {
          display: flex;
        padding: calc(var(--unit-xxs) / 2);
          .tet-de,
          .tet-en {
            flex: 1;
            width: 50%;
            margin: calc(var(--unit-xxs) / 2);
            h5 {
            }
            textarea {
              resize: none;
              width: 100%;
              padding: var(--unit-3xs) var(--unit-xxs);
              border: var(--border-modal);
      border-radius: var(--unit-3xs);
            }
          }
        }
      }
      .kebab {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
        margin: var(--unit-xxs);
        .button-delete {
          background: var(--color-negative-action);
          color: var(--input-color-modal);
          &:active, 
          &:hover{
              background-color: var(--color-neutral-action-modal-hover);
              color: var(--color-negative-action);
          }
        }
      }
    }
  }
}
</style>