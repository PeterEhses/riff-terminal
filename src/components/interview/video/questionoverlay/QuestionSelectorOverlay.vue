<template>
  <div
    class="question-wrapper"
    :class="{ 'flex-layout': numQuestions < maxQuestionForFlex }"
  >
  <QuestionButton
      v-if="numQuestions % 2 == 1 && numQuestions < maxQuestionForFlex"
      class="hide"
    />
    <QuestionButton
      v-for="(question, id) in questions"
      :key="id"
      @click="handleSelect(id)"
      >{{ question }}</QuestionButton
    >
    
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import QuestionButton from "./QuestionButton.vue";

export default {
  components: {
    QuestionButton,
  },
  data() {
    return {
      maxQuestionForFlex: 13, // magic number
    };
  },
  computed: {
    ...mapGetters("interview", {
      questions: "questions",
    }),
    numQuestions() {
      return Object.keys(this.questions).length;
    },
  },
  methods: {
    ...mapActions("interview", {
      setActiveQuestion: "setActiveQuestion",
    }),
    handleSelect(id) {
      Logger.debug("User selected Question:", id);
      this.setActiveQuestion(id);
    },
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
  
  margin-left: -28px;
  margin-right: -28px;
  width: calc(100% + 28px + 28px);
  // background: red;
  bottom: var(--interview-button-height);
  left: 0;
  right: 0;

  .hide {
    // background: red;
    opacity: 0;
    pointer-events: none;
  }

  &.flex-layout {
    height: calc(
      (var(--questions-spacing) + var(--question-height)) * 12 + var(--questions-spacing)
    );
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-bottom: 0;
    padding-top: 0;
    // background: blue;
  }
}
</style>