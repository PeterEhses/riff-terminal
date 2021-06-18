<template>
  <div>
    <InterviewHeader :heading="translate['global.title']" subheading="" />
    <div class="cards">
      <ListCard class="card" 
      v-for="interview in translateInterview"
      imagePath="test-bg.png"
      :name="interview['name']"
      :blurb="interview['blurb']"
      :key="interview.name"
      />
      </div>
  </div>
</template>

<script>
import InterviewHeader from "./InterviewHeader.vue";
import ListCard from "./listview/ListCard.vue";
import { mapGetters } from "vuex";
export default {
  components: {
    InterviewHeader,
    ListCard,
  },
  computed: {
    ...mapGetters("interview", {
      translate: "translate",
      translateInterview: "translateInterview",
    }),
  },
};
</script>

<style lang="scss">
.cards {
  margin-top: calc(
    var(--interview-spacing-gutter-sm) + var(--interview-spacing-gutter-xl) +
      var(--interview-spacing-gutter-md)
  );
  margin-bottom: var(--interview-spacing-gutter-lg);
  padding: 0 var(--interview-spacing-gutter-xl);

  // display: grid;
  display: block;
  flex-direction: column;
  // grid-template-columns: var(--interview-base-grid-columns);

  .card {
    // background: red;
    width: 100%;
    height: var(--list-card-height);
    margin: var(--interview-spacing-gutter-md) 0;
  }
}
</style>