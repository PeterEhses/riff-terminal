<template>
  <div class="interview-wrapper">
    <InterviewHeader heading="Korallenriffe und Menschen" subheading="Meeresbiologin" />
    <div>-</div>
  </div>
</template>

<script>
import InterviewHeader from "./InterviewHeader.vue";
export default {
  components: {
    InterviewHeader,
  },
};
</script>

<style>
.interview-wrapper{
      width: calc(100 * var(--unit-width));
      height: calc(100 * var(--unit-height));
      background: url('../../assets/test-bg.png');
}
</style>