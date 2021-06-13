<template>
  <textarea :value="internalValue" @input="handleInput"></textarea>
</template>

<script>
export default {
    props: {
        value: {
            default: ""
        }
    },
    data(){
        return {
            internalValue: this.value
        }
    },
    methods: {
        handleInput(){
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
  },
}
</script>

<style>

</style>