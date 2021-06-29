<template>
  <div>
    <div class="menu-general-section">
        Mode: <Toggle left="projection" right="interview" :active="getMode" @click="changeMode"/>
    </div>
    <hr>
    <div class="menu-general-section">
        <button @click="quitApp">QUIT APPLICATION</button>
        <p>This action will wait 10 seconds before exiting to make sure any menu changes are saved!</p>
    </div>
    <hr>
    <div class="menu-general-section">
        <p>Software © 2021 Peter Ehses All Rights Reserved.</p>
        <p>Permission is hereby granted to Senckenberg Society for Nature Research for use in the exhibition "Korallenriff" with the content provided by Senckenberg Society for Nature Research.</p>
    </div>
    <div class="EXIT-WARNING" v-if="exit"><h1>E X I T I N G</h1></div>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Toggle from "@/components/inputs/Toggle.vue";
const {ipcRenderer} = require('electron')
export default {
    components: {
    Toggle,
  },
  data(){
      return{
          modeNames: {
              projection: "Projection",
              interview: "Interview",
              
          },
          exit: false
      }
  },
    computed: {
        ...mapGetters('general', {
            getMode: "getMode"
        })
    },
    methods:{
        ...mapActions('general', {
            changeMode: "changeMode"
        }),
        quitApp(){
            this.exit = true
            Logger.warn("Trying to quit app on Menu Action")
            ipcRenderer.send('quitApp')
        }
    }
}
</script>

<style lang="scss">
.menu-general-section{
    width: 100%;
    margin: var(--unit-md) 0;
}
.EXIT-WARNING{
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
  h1{
      color: var(--color-off-white);
  }

}
</style>