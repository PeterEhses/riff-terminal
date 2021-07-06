<template>
  <div>
    <InterviewHeader :heading="translate['global.title']" subheading="" />
    <div class="cards">
      <ListCard class="card" 
      v-for="(interview, key) in translateInterview"
      :imagePath="thumbnails ? thumbnails[key] : ''"
      :name="interview['name']"
      :blurb="interview['blurb']"
      :id="key"
      :key="interview['name']"
      @selected="setActiveInterview(key)"
      />
      </div>
  </div>
</template> 

<script>
import InterviewHeader from "./InterviewHeader.vue";
import ListCard from "./listview/ListCard.vue";
import { mapGetters, mapActions } from "vuex";
export default {
  components: {
    InterviewHeader,
    ListCard,
  },
  data(){
    return{
      idleTimer: null,
    }
  },
  methods: {
    ...mapActions("interview", {
      setActiveInterview: "setActiveInterview"
    }),
    switchToRandomVideo(){
      Logger.info("Setting Active Interviewee after idle Time in Selection Menu")
      this.setActiveInterview(Math.round(Math.random()*4)); // set to number from 0 to 5
    },
  },
  computed: {
    ...mapGetters("interview", {
      translate: "translate",
      translateInterview: "translateInterview",
      thumbnails: "thumbnails",
      idleWaitTime: "idleWaitTime",
    }),
  },
  mounted(){
    this.idleTimer = setTimeout(() => {this.switchToRandomVideo()}, this.idleWaitTime * 1000);
  },
  beforeDestroy(){
    if(this.idleTimer){
      clearTimeout(this.idleTimer)
    }
  }
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