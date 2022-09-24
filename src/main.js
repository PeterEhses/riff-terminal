import './logger-init.js'
import './error-handler.js'
import Vue from 'vue'
import App from './App.vue'
// import router from './router'
import store from './store'
import VueMousetrap from 'vue-mousetrap'
// const Vue2TouchEvents = require('vue2-touch-events');

// try to circumvent windows scaling

document.querySelector("meta[name=viewport]").setAttribute('content', 'width=device-width, initial-scale='+(1/window.devicePixelRatio)+', maximum-scale=1.0, user-scalable=0');
Logger.info("Viewport scaling is:", window.devicePixelRatio)
// disable multitouch hack

// function touchHandler(event){
//   if(event.touches.length > 1){
//       //the event is multi-touch
//       //you can then prevent the behavior
//       Logger.debug("Trying to prevent touch event")
//       event.preventDefault()
//   }
// }
// window.addEventListener("touchstart", touchHandler,  { passive: false });

// css compile-time requires
require('modern-css-reset')
require('fg-select-css/src/select-css.css')
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "video.js/dist/video-js.css";
import Logger from 'js-logger'

// Vue.use(Vue2TouchEvents) // to get events on touch
Vue.use(VueMousetrap) // to intercept complex key events
Vue.config.productionTip = false

// error handling in vue

Vue.config.errorHandler = function (err, vm, info) { 
  if(vm && vm._vnode && vm._options){
    Logger.error("Vue raised:", err, vm._vnode.tag, vm._options._componentTag, info) 
  } else {
    Logger.error("Vue raised:", err, info) 
  }
}
Vue.config.warnHandler = function (msg, vm, info) {
  if(vm && vm._vnode && vm._options){
    Logger.warn("Vue raised:", msg, vm._vnode.tag, vm._options._componentTag, info) 
  } else {
    Logger.warn("Vue raised:", msg, info) 
  }
}

Vue.mixin({
  methods: {
    camelToKebab(camel) {
      return camel
        .replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, "$1-$2")
        .toLowerCase();
    },
    setRootCss(key, val) {
      Logger.trace("Set " + key);
      if(key === "font-size-initial"){
        const newVal = 'calc( '+val+' / '+window.devicePixelRatio+' )'
        return document.documentElement.style.setProperty("--" + key, newVal);
      }
      return document.documentElement.style.setProperty("--" + key, val);
    }
  }
})

// make vue return finite json via toJSON for error logging

// Object.defineProperty(Vue.prototype, 'toJSON', {
//   value: function () {
//     var alt = {};

//     Object.getOwnPropertyNames(this).forEach(function (key) {
//       if (this[key]) {
//         if (Array.isArray(this[key])) {
//           alt[key] = Object.keys(this[key])
//         } else if (this[key]._uid && this[key]._uid == this._uid) {
//           alt[key] = "[this]"
//         } else if (typeof (this[key]) == "object") {
//           const rv = {};
//           const keys = Object.keys(this[key])
//           for (var i = 0; i < keys.length; ++i) rv[keys[i]] = "...";
//           alt[key] = rv
//         } else {
//           alt[key] = this[key]
//         }
//       }


//     }, this);
//     return alt;
//   },
//   configurable: true,
//   writable: true
// });

// initiate vue finally

new Vue({
  // router,
  store,
  render: h => h(App)
}).$mount('#app')
