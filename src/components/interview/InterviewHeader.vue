<template>
  <div class="interview-header">
      <div class="interview-header-text-wrapper">
          <h1>{{heading}}</h1>
          <h2>{{subheading}}</h2>
      </div>
  </div>
</template>

<script>
export default {
    props: {
        heading: {
            default: ""
        },
        subheading: {
            default: ""
        }
    }
}
</script>

<style>

</style>