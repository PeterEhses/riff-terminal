import './logger-init.js'
import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import store from './store'
import VueMousetrap from 'vue-mousetrap'

// css compile-time requires
require('modern-css-reset')
require('fg-select-css/src/select-css.css')
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
Vue.use(VueMousetrap) // to intercept complex key events
Vue.config.productionTip = false

new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount('#app')
