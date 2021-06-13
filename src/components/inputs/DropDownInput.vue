<template>
  <select class="drop-down" v-model="internalValue" >
      <option v-for="(val, key)  in options" :value="key" :key="key">{{val}}</option>
  </select>
</template>

<script>
export default {
    props: {
        value: {
            default: ""
        },
        options: {
            default: ()=>{}
        }
    },
    data(){
        return {
            internalValue: this.value
        }
    },
    methods: {
        handleInput(){
            Logger.debug("Input receive:", this.internalValue)
            this.$emit('input', this.internalValue)
        }
    },
      watch: {
    value: {
      deep: true,
      immediate: true,
      handler() {
        this.internalValue = this.value;
      },
    },
    internalValue: {
      deep: true,
      immediate: true,
      handler() {
        this.handleInput()
      },
    },
  },
}
</script>

<style lang="scss">
</style>