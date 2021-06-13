import Vue from 'vue'
import Vuex from 'vuex'
// import modules here
import theme from './modules/theme.js'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
    initialize(){ // dispatch
      try{
        const moduleNames = Object.keys(this._modules.root._children)
        for(const name of moduleNames){
          // console.log(this._modules.root._children[name]._rawModule.actions.initialize)
          if(this._modules.root._children[name]._rawModule.actions.initialize){
            this.dispatch(name+'/initialize')
          }
        }
      } catch (e){
        Logger.error(e)
      }
    }
  },
  modules: { // declare modules here
    theme,
  }
})
