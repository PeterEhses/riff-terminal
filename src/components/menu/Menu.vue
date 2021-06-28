<template>
  <div class="menu">
    <div class="menu-content-wrapper">
      <div class="menu-header">
        <h2>Einstellungen</h2>
        <hr />
        <MenuNav />
        <SaveMenu class="menu-header" :activeMenu="getMenu" :key="getMenu"/>
        <hr/>
      </div>
      <MenuBodyGeneral class="menu-body" v-if="getMenu == 'general'"/>
      <MenuBodyProjection class="menu-body" v-if="getMenu == 'projection'"/>
      <MenuBodyStyle class="menu-body" v-if="getMenu == 'theme'"/>
      
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import MenuNav from "./MenuNav.vue";
import MenuBodyStyle from "./MenuBodyStyle.vue";
import SaveMenu from "./SaveMenu.vue"
import MenuBodyGeneral from "./MenuBodyGeneral.vue"
import MenuBodyProjection from "./projectionMenu/MenuBodyProjection.vue"
export default {
  components: {
    MenuNav,
    SaveMenu,
    MenuBodyGeneral,
    MenuBodyStyle,
    MenuBodyProjection,
  },
  computed: {
    ...mapGetters("general", {
      getMenu: "getMenu",
    }),
  },
};
</script>

<style lang="scss">
.menu {
  z-index: 69696969;
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  button{
      border: var(--border-modal);
      border-radius: var(--unit-xs);
      background-color: var(--color-neutral-action-modal);
      border-color: rgba(0, 0, 0, 0);
      background-clip: padding-box;
      padding: 0 var(--unit-xs) 0 var(--unit-xs);
      &:hover,
      &:active {
        background-color: var(--color-neutral-action-modal-hover);
      }
    }

  padding: var(--margin-main-container);
  .adaptive-action {
    border: var(--border-modal);
    border-radius: var(--unit-xs);
    background-color: var(--color-neutral-action-modal);
    border-color: rgba(0, 0, 0, 0);
    background-clip: padding-box;
    &:hover {
      background-color: var(--color-neutral-action-modal-hover);
    }
  }

  .menu-header {
    padding: calc(var(--margin-main-container) / 2) var(--margin-main-container);

    flex-grow: 0;
    flex-shrink: 0;
  }
  .menu-body {
    flex-grow: 1;
    width: 100%;
    //   background: red;
    overflow-y: scroll;
    padding: var(--margin-main-container);
  }
  .save-menu {
    display: flex;
    justify-content: space-between;
    width: 100%;
    & > div:last-child {
      margin-right: 0;
    }
    & > div:first-child {
      margin-left: 0;
    }
    & > div {
      //   width: 100%;
      // background: red;
      & > label {
        margin-right: var(--unit-xs);
      }
      display: flex;
      margin: var(--unit-xs);
      & > * {
        flex-grow: 1;
        flex-shrink: 0;
      }
    }
  }
  select {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    background: none;
    border: var(--border-modal);
    border-radius: var(--unit-3xs);
    color: var(--input-color-modal);
    padding: 0 var(--unit-xs) 0 var(--unit-xs);
    background: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='100' height='100' fill='white' fill-opacity='0.7'><polygon points='0,0 100,0 50,50'/></svg>")
      no-repeat;
    background-size: var(--unit-xs);
    background-position: calc(100% - (var(--unit-xs) / 2)) 0.6em;
    background-repeat: no-repeat;
    option {
      background-color: var(--background-color-modal);
    }
  }
  .adaptive-input {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    .adaptive-content {
      width: 100%;
    }
    .default-input {
      width: 100%;
      &.adaptive {
        width: calc(100% - 2em);
      }

      flex-shrink: 0;
    }
    .adaptive-action {
      width: 2em;
    }
    .vc-chrome {
      width: 100%;
    }
    textarea {
      width: 100%;
      resize: vertical;
    }
  }
  .menu-content-wrapper {
    display: flex;
    flex-direction: column;

    z-index: 42069;
    position: relative;
    // background: var(--color-off-black);
    color: var(--text-color-modal);
    backdrop-filter: var(--blur-normal);
    border: var(--border-modal);
    border-radius: var(--border-radius-modal);
    position: relative;
    width: 100%;
    height: 100%;
    box-shadow: var(--box-shadow-default);

    &:before {
      content: "";
      z-index: -1;
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: var(--blur-normal-background-color);
      opacity: var(--blur-normal-background-opacity);
    }
  }

  hr {
    border: none;
    border-bottom: var(--border-modal);
  }

  input {
    background: calc(var(--color-orange) + 88);
    color: var(--input-color-modal);
    border: none;
    border-bottom: var(--border-modal);
    border-radius: var(--unit-3xs);
  }

  * {
    ::-webkit-scrollbar-thumb {
      background-color: var(--color-neutral-action-modal);
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
      background-color: var(--color-neutral-action-modal-hover);
    }
  }
}
</style>