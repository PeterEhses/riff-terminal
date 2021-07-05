<template>
  <div>
    <div class="menu-general-section">
      Mode:
      <Toggle
        left="projection"
        right="interview"
        :active="getMode"
        @click="changeMode"
      />
    </div>
    <hr />
    <div class="menu-general-section">
      <button @click="quitApp">QUIT APPLICATION</button>
      <p>
        This action will wait 10 seconds before exiting to make sure any menu
        changes are saved!
      </p>
    </div>
    <hr />
    <div class="menu-general-section">
      <p>Software, excluding media files, © 2021 Peter Ehses All Rights Reserved.</p>
      <br />
      <hr />
      <br />
      <p>
        “Commons Clause” License Condition v1.0<br />
        <br />
        The Software, excluding media files, is provided to you by the Licensor under the License, as
        defined below, subject to the following condition. <br />
        <br />
        Without limiting other conditions in the License, the grant of rights
        under the License will not include, and the License does not grant to
        you, the right to Sell the Software, excluding media files. <br />
        <br />
        For purposes of the foregoing, “Sell” means practicing any or all of the
        rights granted to you under the License to provide to third parties, for
        a fee or other consideration (including without limitation fees for
        hosting or consulting/ support services related to the Software), a
        product or service whose value derives, entirely or substantially, from
        the functionality of the Software. Any license notice or attribution
        required by the License must also include this Commons Clause License
        Condition notice. <br />
        <br />
        Software: riff-terminal <br />
        <br />
        License, excluding media files: Apache-2.0
        <br />
        <br />
        Licensor: Peter Ehses
      </p>
      <br />
      <a href="https://commonsclause.com/">https://commonsclause.com/</a>
      <a href="Apache 2.0 LICENSE-2.0.txt">https://www.apache.org/licenses/LICENSE-2.0.txt</a>
    </div>
    <div class="EXIT-WARNING" v-if="exit"><h1>E X I T I N G</h1></div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Toggle from "@/components/inputs/Toggle.vue";
const { ipcRenderer } = require("electron");
export default {
  components: {
    Toggle,
  },
  data() {
    return {
      modeNames: {
        projection: "Projection",
        interview: "Interview",
      },
      exit: false,
    };
  },
  computed: {
    ...mapGetters("general", {
      getMode: "getMode",
    }),
  },
  methods: {
    ...mapActions("general", {
      changeMode: "changeMode",
    }),
    quitApp() {
      this.exit = true;
      Logger.warn("Trying to quit app on Menu Action");
      ipcRenderer.send("quitApp");
    },
  },
};
</script>

<style lang="scss">
.menu-general-section {
  width: 100%;
  margin: var(--unit-md) 0;
}
.EXIT-WARNING {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 987654321;
  width: 100%;
  height: 100%;
  background: var(--color-negative-action);
  display: flex;
  justify-content: center;
  align-items: center;
  h1 {
    color: var(--color-off-white);
  }
}
</style>