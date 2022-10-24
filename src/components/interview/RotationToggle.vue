<template>
  <div class="rt-toggle" @click="switchRt">
    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 43 49.77">
  <g id="Rotate2" transform="translate(1.5 1.953)">
    <path id="Differenzmenge_1" data-name="Differenzmenge 1" d="M617,390.159q.82,0,1.637.064a20.045,20.045,0,1,1-18.405,9.067,20.685,20.685,0,0,1,8.543-7.367" transform="translate(-597 -383.841)" fill="none" stroke="#fff" stroke-width="3"/>
    <g id="Gruppe_2" data-name="Gruppe 2" transform="translate(-597 -383.841)">
      <line id="Linie_8" data-name="Linie 8" y1="5.828" x2="14.424" transform="translate(615.437 383.841)" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3"/>
      <path id="Pfad_13" data-name="Pfad 13" d="M615.437,389.669l5.828,14.423" fill="none" stroke="#fff" stroke-linecap="round" stroke-width="3"/>
    </g>
  </g>
</svg>

  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  methods: {
      ...mapActions("interview", {
          switchRotation: 'switchRotation',
      }),
      switchRt(){
          this.switchRotation()
      }
  }
};
</script>

<style lang="scss">
.rt-toggle {
  // --rotate-button-size: auto;
  width: var(--rotate-button-size);
  
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>