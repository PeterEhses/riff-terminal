<template>
  <div class="texts-editor">
    <h2>Texts</h2>
    <div
      class="texts-editor-category"
      v-for="(category, cid) in getTexts"
      :key="cid"
    >
      <div class="texts-editor-header">
        <h3>{{ cid }}</h3>
        <button @click="addTextpair(cid)">ADD TEXT PAIR</button>
      </div>
      <div class="texts-editor-text" v-for="(text, tid) in category" :key="tid">
        <div class="content">
          <div class="editable">
            <div class="editable-text">
              <div class="tet-de">
                <h5>DE</h5>
                <textarea rows="2" :value="text.de" />
              </div>
              <div class="tet-en">
                <h5>EN</h5>
                <textarea rows="2" :value="text.en" />
              </div>
            </div>
            <div class="editable-meta">
              <label :for="'weight-' + tid">Weight</label>
              <input
                step="any"
                :name="'weight-' + tid"
                type="range"
                :value="text.weight"
                min="0"
                :max="largestWeight[cid]"
                @input="updateWeight($event, cid, tid)"
              />
              <input
                type="number"
                :value="text.weight"
                min="0"
                @input="updateWeight($event, cid, tid)"
              />
            </div>
          </div>
        </div>
        <div class="kebab">
          <h4>{{ tid }}</h4>
          <button
            class="button-delete"
            @click="removeTextpair({ location: cid, id: tid })"
          >
            DELETE
          </button>
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
    largestWeight() {
      let lv = { top: 2, bottom: 2 };
      if (!this.getTexts) {
        //   Logger.debug("no texts to weight")
        return lv;
      }
      if (this.getTexts["bottom"] && this.getTexts["bottom"].length > 0) {
        const max = this.getTexts["bottom"].reduce(function (prev, current) {
          return prev.weight > current.weight ? prev : current;
        });
        // Logger.debug("largest text bottom weight is", max.weight)
        if (max.weight > 2) {
          lv.bottom = max.weight;
        }
      }
      if (this.getTexts["top"] && this.getTexts["top"].length > 0) {
        const max = this.getTexts["top"].reduce((prev, current) => {
          return prev.weight > current.weight ? prev : current;
        });
        // Logger.debug("largest text top weight is", max.weight)
        if (max.weight > 2) {
          lv.bottom = max.weight;
        }
      }
    //   Logger.debug("Text weight set to:", lv)
      return lv;
    },
  },
  methods: {
    ...mapActions("projection", {
      removeTextpair: "removeTextpair",
      addTextpair: "addTextpair",
      setTextValue: "setTextValue",
    }),
    updateWeight(e, location, id) {
      Logger.debug("Weight Update:", e, location, id);
      this.setTextValue({
        location: location,
        textid: id,
        key: "weight",
        value: e.target.value,
      });
    },
  },
};
</script>

<style lang="scss">
.texts-editor {
  .texts-editor-category {
    border: var(--border-modal);
    border-radius: var(--unit-xs);
    margin: var(--unit-xxs);
    .texts-editor-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin: var(--unit-xxs);
    }
    .texts-editor-text {
      display: flex;
      border: var(--border-modal);
      border-radius: var(--unit-xxs);
      margin: var(--unit-xxs);
      .content {
        flex-grow: 1;
        .editable-text {
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
        .editable-meta {
          display: flex;
          align-items: center;
          padding: var(--unit-3xs) var(--unit-xxs);
          input[type="range"] {
            flex: 1;
            margin: 0 var(--unit-xxs);
            -webkit-appearance: none; /* Override default look */
            appearance: none;

            outline: none;
            height: var(--unit-3xs);
            background: var(--input-color-modal);
            border: none;
            overflow: visible;
            &::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 1em;
              height: 1em;
              border-radius: 50%;
              background: var(--color-orange);
              &:hover {
                background-color: var(--color-neutral-action-modal-hover);
              }
            }
          }
          input[type="number"] {
            width: 4ch;
            text-align: right;
            appearance: textfield;
            -moz-appearance: textfield;
          }
          input::-webkit-outer-spin-button,
          input::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
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
          &:hover {
            background-color: var(--color-neutral-action-modal-hover);
            color: var(--color-negative-action);
          }
        }
      }
    }
  }
}
</style>