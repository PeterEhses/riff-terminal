<template>
    <div class="save-menu" :key="this.activeMenu">
      <div>
        <label for="preset-name">{{activeMenu}} Preset Name </label>
        <input
          name="preset-name"
          type="text"
          v-model="presetTextbox"
          onkeypress="return /[a-zA-Z0-9_]/.test(event.key)"
        />
        <button class="save-button" @click="presetSave">
          save to named preset
        </button>
      </div>
      <span></span>
      <div>
        <label for="active-preset-select">Active Preset</label>
        <DropDownInput
          name="active-preset-select"
          :value="activePresetName"
          :options="presetNames"
          @input="dropdownSelect"
        />
      </div>
    </div>
</template>

<script>
import { mapState, mapActions } from "vuex"; // mapGetters
import DropDownInput from "@/components/inputs/DropDownInput.vue";
export default {
    components: {
    DropDownInput,
  },
  props: {
    activeMenu: {
        default: 'general'
    },
  },
  data() {
    return {
      presetTextbox: "default",
      dropdownValue: "default",
    };
  },
  computed: {
    ...mapState({
      preset(state) {
        return state[this.activeMenu].active;
      },
      presets(state) {
        return state[this.activeMenu].presets;
      },
      activePresetName(state) {
        return state[this.activeMenu].activePresetName;
      },
      // eslint-disable-next-line no-unused-vars
      presetNames(state, getters){
          return getters[this.activeMenu+"/getPresetList"]
      }
    }),
    // ...mapGetters({
    //     // eslint-disable-next-line no-unused-vars
    //   presetNames: 
    // }),
  },
  methods: {
    ...mapActions({
      updateOne(dispatch, payload) {
          return dispatch(this.activeMenu + '/updateOne', payload)
      },
      saveFromActive(dispatch, payload) {
          return dispatch(this.activeMenu + '/saveFromActive', payload)
      },
      setFromSaved(dispatch, payload) {
          return dispatch(this.activeMenu + '/setFromSaved', payload)
      }
    }),
    dropdownSelect(val) {
      this.setFromSaved(val);
    },
    presetSave() {
      Logger.info("Saving Preset with name", this.presetTextbox);
      this.saveFromActive(this.presetTextbox);
    },
  },
//   beforeCreate() {
//   },
};
</script>

<style>
</style>