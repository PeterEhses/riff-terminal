<template>
  <div>
    Mode: <Toggle left="projection" right="interview" :active="getMode" @click="changeMode"/>
  </div>
</template>

<script>
import {mapGetters, mapActions} from 'vuex'
import Toggle from "@/components/inputs/Toggle.vue";
export default {
    components: {
    Toggle,
  },
  data(){
      return{
          modeNames: {
              projection: "Projection",
              interview: "Interview",
          }
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
        })
    }
}
</script>

<style>

</style>