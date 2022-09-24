<template>
  <div class="rt-toggle" @click="switchRt">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="43"
      height="54.897"
      viewBox="0 0 43 54.897"
    >
      <g id="Rotate" transform="translate(1.5 2.781)">
        <path
          id="Subtraction_1"
          data-name="Subtraction 1"
          d="M-2407.5-41.885a19.873,19.873,0,0,1-7.784-1.571,19.936,19.936,0,0,1-6.358-4.287,19.939,19.939,0,0,1-4.287-6.358,19.874,19.874,0,0,1-1.571-7.784,19.782,19.782,0,0,1,3.232-10.869,20.692,20.692,0,0,1,8.543-7.367c.713-.336,2.566-.938,3.256-1.153a19.919,19.919,0,0,1,4.969-.611,19.873,19.873,0,0,1,7.784,1.571,19.936,19.936,0,0,1,6.358,4.287,19.939,19.939,0,0,1,4.287,6.358,19.874,19.874,0,0,1,1.571,7.784,19.874,19.874,0,0,1-1.571,7.784,19.939,19.939,0,0,1-4.287,6.358,19.936,19.936,0,0,1-6.358,4.287A19.873,19.873,0,0,1-2407.5-41.885Z"
          transform="translate(2427.5 92.5)"
          fill="none"
          stroke="#fff"
          stroke-width="3"
        />
        <circle
          id="Ellipse_3"
          data-name="Ellipse 3"
          cx="4"
          cy="4"
          r="4"
          transform="translate(11.5 6.369)"
          fill="#333"
        />
        <g
          id="Group_2"
          data-name="Group 2"
          transform="translate(-478.496 862.193) rotate(-67)"
        >
          <line
            id="Line_8"
            data-name="Line 8"
            x2="11"
            y2="11"
            transform="translate(978.5 124.5)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-width="3"
          />
          <path
            id="Path_13"
            data-name="Path 13"
            d="M11,0,0,11"
            transform="translate(967.5 124.5)"
            fill="none"
            stroke="#fff"
            stroke-linecap="round"
            stroke-width="3"
          />
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
  --rotate-button-height: auto;
  height: var(--rotate-button-height);
  margin-top: -86px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>