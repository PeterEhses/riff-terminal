<template>
  <div class="interview-card">
      <div class="thumb" @touchstart="isActive = true" @touchend="isActive = false" @click="$emit('selected')">
          <img :src="imagePath" alt="">
          <PlayButton class="play-button" :forceActiveState="isActive"/>
      </div>
      <div class="blurb">
          <h3>{{name}}</h3>
          <p>{{blurb}}</p>
      </div>
  </div>
</template>

<script>
import PlayButton from "./PlayButton.vue";
export default {
    components: {
        PlayButton,
    },
    props: {
        name: {
            default: ""
        },
        blurb: {
            default: ""
        },
        imagePath: {
            default: ""
        }
    },
    data(){
        return{
            isActive: false,
        }
    }
}
</script>

<style lang="scss">
.interview-card{
    display: grid;
    grid-template-columns: [image] var(--list-card-height) [text] auto;
.thumb{
    position: relative;
    grid-column: image;
    width: var(--list-card-height);
    height: var(--list-card-height);
    img{
        width: 100%;
    height: 100%;
    object-fit: cover;
    }
}
.blurb{
    grid-column: text;
    margin-top: var(--interview-spacing-gutter-md); 
    margin-left: var(--interview-spacing-gutter-md); 
    p{
        white-space: pre-line;
        font-size: var(--font-size-list-card-body);
        font-weight: var(--font-weight-list-card-body);
    }
    h3{
        font-size: var(--font-size-list-card-heading);
        font-weight: var(--font-weight-list-card-heading);
    }
}

.play-button{
    position: absolute;
    top: var(--unit-sm);
    right: var(--unit-sm);
}
}

</style>