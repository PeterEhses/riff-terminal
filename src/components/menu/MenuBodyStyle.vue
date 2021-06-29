<template>
  <div class="menu-style">
    <table class="value-table">
      <tr>
        <th>Property</th>
        <th>Value</th>
      </tr>
      <tr v-for="(val, prop) in theme" :key="prop">
        <td>{{ prop }}</td>
        <td>
          <AdaptiveInput
            :value="reactiveTheme[prop].get()"
            @input="reactiveTheme[prop].set"
          />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from "vuex";
import AdaptiveInput from "@/components/inputs/AdaptiveInput.vue";
// import DropDownInput from "@/components/inputs/DropDownInput.vue";
export default {
  components: {
    AdaptiveInput,
    // DropDownInput,
  },
  data() {
    return {
      presetTextbox: "default",
      dropdownValue: "default",
    };
  },
  computed: {
    ...mapState("theme", {
      theme: "active",
      presets: "presets",
      activeThemeName: "activeThemeName",
    }),
    ...mapGetters("theme", {
      presetNames: "getPresetList",
    }),
    reactiveTheme() {
      let rc = {};
      const that = this;
      for (const [prop, val] of Object.entries(this.theme)) {
        rc[prop] = {
          get() {
            return val;
          },
          set(value) {
            that.themeUpdateSingleProperty({ property: prop, value: value });
          },
        };
      }
      return rc;
    },
  },
  methods: {
    ...mapActions("theme", {
      themeUpdateSingleProperty: "updateOne",
      themeSaveFromActive: "saveFromActive",
      themeSetFromSaved: "setFromSaved",
    }),
    dropdownSelect(val) {
      this.themeSetFromSaved(val);
    },
    presetSave() {
      Logger.info("Saving Preset with name", this.presetTextbox);
      this.themeSaveFromActive(this.presetTextbox);
    },
    stringIsColor(string) {
      Logger.debug("Got String to test for Coloriness:", string);
      if (typeof string !== "string") {
        return false;
      }
      if (string.substring(0, 1) === "#") {
        return true;
      }
      return false;
    },
  },
};
</script>

<style lang="scss">
.value-table {
  width: 100%;
  td {
    vertical-align: baseline;
  }
  td:nth-of-type(1) {
    width: 40%;
  }
}
</style>