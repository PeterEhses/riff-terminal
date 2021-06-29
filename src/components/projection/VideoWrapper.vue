<template>
  <div class="video-player-wrapper">
            <VideoPlayer
        class="video-layer"
        :video="videoFileLocation"
        :loop="true"
      />
      <!-- :video="'/projection/'+getVideoFile" -->
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import VideoPlayer from "../VideoPlayer.vue";
export default {
  components: {
    VideoPlayer,
  },
  computed: {
    ...mapGetters('projection', {
      getVideoFile: "getVideoFile",
      getFileTree: "getFileTree",
    }),
    videoFileLocation(){
      if(this.getFileTree && this.getFileTree.children && this.getFileTree.children.length > 0){
        for(const id of this.getFileTree.children){
          if(id && id.name && id.type && id.type === "file"){
            if(this.getVideoFile && id.name === this.getVideoFile){
              return id.path
            }
          }
        }
      } 
      return ""
    }
  }
};
</script>

<style lang="scss">
  .video-player-wrapper{
      position: relative;
      width: 100%;
      height: 100%;
      z-index: -1;
      background: blue;
        .video-layer {
    z-index: 0;
    position: relative;

    height: calc(100 * var(--unit-width));
    width: calc(100 * var(--unit-height));
    transform: rotate(-90deg) translateX(-100%);
    transform-origin: left top;
    left: 0;

    
  }
  }
</style>