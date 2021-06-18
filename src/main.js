import './logger-init.js'
import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import store from './store'
import VueMousetrap from 'vue-mousetrap'
const Vue2TouchEvents = require('vue2-touch-events');


// css compile-time requires
require('modern-css-reset')
require('fg-select-css/src/select-css.css')
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "video.js/dist/video-js.css"; 

Vue.use(Vue2TouchEvents) // to get events on touch
Vue.use(VueMousetrap) // to intercept complex key events
Vue.config.productionTip = false

new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount('#app')
