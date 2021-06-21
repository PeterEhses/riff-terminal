<template>
  <div class="question-wrapper">
    <QuestionButton v-for="(question, id) in questions" :key="id">{{ question }}</QuestionButton>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import QuestionButton from "./QuestionButton.vue";

export default {
  components: {
    QuestionButton,
  },
  computed: {
    ...mapGetters("interview", {
      questions: "questions",
    }),
  },
};
</script>

<style lang="scss">
.question-wrapper {
  position: absolute;
  padding: var(--interview-spacing-gutter-xl);
  padding-bottom: calc(
    var(--questions-margin-bottom) - var(--questions-spacing)
  );
  width: 100%;
  // background: red;
  bottom: var(--interview-button-height);
  left: 0;
  right: 0;

}
</style>