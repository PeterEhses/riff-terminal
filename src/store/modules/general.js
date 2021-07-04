import Logger from "js-logger"
import Vue from "vue"
import storageInterface from '../helpers/storageInterface.js'
import {throttle} from 'lodash'



const presetPrefix = "_"
const generalStorage = storageInterface.getNamedStore('general', 'Settings')

const state = () => ({
    activePresetName: '_default',
    activeMenu: 'general',
    active: {
       mode: "interview", // options: projection, interview
    },
    presets: {

    }
})

const mutations = {
    /**
     * save store to file 
     */
    SAVE_FILE(state) {
        Logger.info("file save triggered")
        generalStorage.store = state;
    },
    /**
     * load store from file
     */
    LOAD_FILE(state) {
        if (generalStorage.store) {
            for (const [key, value] of Object.entries(generalStorage.store)) {
                Vue.set(state, key, value);
            }
        }
    },
    SET_FROM_OBJECT(state, { name, object }) {
        name = presetPrefix + name;
        Logger.debug("Saving Object into preset:", name)
        Vue.set(state.presets, name, { ...object });
        Vue.set(state, 'presets', { ...state.presets })
    },
    /**
     * replace properties from object named savee with active object properties
     */
    SET_SAVEE(state, savee) {
        savee = presetPrefix + savee;
        Logger.debug("Saving active Theme state to:", savee)
        if (!state.presets[savee]) {
            state.presets[savee] = {}
        }
        for (const [key, value] of Object.entries(state.active)) {
            Vue.set(state.presets[savee], key, value);

        }
        Vue.set(state, 'presets', { ...state.presets })
    },
    /**
     * replace properties active theme object with change object properties
     */
    SET_ACTIVE(state, change) {
        // change = presetPrefix + change;
        Logger.debug("Active Theme State changes:", change)
        for (const [key, value] of Object.entries(change)) {
            Vue.set(state.active, key, value);
        }
    },
    SET_ACTIVE_PRESET_NAME(state, name) {
        Vue.set(state, 'activePresetName', name);
    },
    /////////////////////////////
    // module specific
    /////////////////////////////
    SET_MODE(state, mode){
        state.active.mode = mode;
    },
    SET_MENU(state, menu){
        state.activeMenu = menu
    }
}

const actions = {
    saveFile({commit}){
        Logger.info("save request")
        commit('SAVE_FILE')
    },
    saveFileThrottled: throttle(({dispatch}) => {
        Logger.info("throttled save request"),
        dispatch("saveFile")
    }, 10000, { 'trailing': true, 'leading': false }),
    /**
     * load state from file, create default if not exist 
     */
    initialize({ commit, state }) {
        const defaultState = state.active
        // Logger.debug("default state:", defaultState)
        if (!(process.env.NODE_ENV === 'development')) {
            commit('LOAD_FILE')
        }
        if (!state.presets._default) {
            commit('SET_FROM_OBJECT', { name: 'default', object: defaultState })
            commit('SET_ACTIVE_PRESET_NAME', '_default')
            commit('SAVE_FILE')
        }
    },
    /**
     * update properties from object of properties
     */
    updateMany({ commit, dispatch }, changes) {
        commit('SET_ACTIVE', changes)
        dispatch("saveFileThrottled")
    },
    /**
     * update single property from property / value pair
     */
    updateOne({ commit, dispatch }, { property, value }) {

        let changes = {}
        changes[property] = value;
        commit('SET_ACTIVE', changes)
        dispatch("saveFileThrottled")
    },
    /**
     * get saved theme object and replace active with it
     */
    setFromSaved({ commit, dispatch,  state }, saved) { // pass name of saved theme object
        Logger.debug("Loading saved Theme:", saved)
        // saved = presetPrefix + saved;
        if (!state.presets[saved]) {
            return
        }
        commit('SET_ACTIVE', state.presets[saved]);
        commit('SET_ACTIVE_PRESET_NAME', saved)
        dispatch("saveFileThrottled")
    },
    /**
     * save active theme object to named theme object
     */
    saveFromActive({ commit, dispatch }, savee) { // pass name of theme object to save into
        commit('SET_SAVEE', savee);
        dispatch("saveFileThrottled")
    },
    /////////////////////////////
    // module specific
    /////////////////////////////
    changeMode({commit, dispatch,  state}){
        if(state.active.mode == "interview"){
            commit('SET_MODE', "projection")
        } else {
            commit('SET_MODE', "interview")
        }
        dispatch("saveFileThrottled")
    },
    setMenu({commit, dispatch }, menu){
        commit('SET_MENU', menu)
        dispatch("saveFileThrottled")
    }
}

const getters = {
    getPresetList(state) {
        let list = {}
        for (const key of Object.keys(state.presets)) {
            let newKey = key
            while (newKey.charAt(0) === presetPrefix) {
                newKey = newKey.substring(1);
            }
            list[key] = newKey
        }
        return list
    },
    /////////////////////////////
    // module specific
    /////////////////////////////
    getMode(state) {
        return state.active.mode
    },
    getMenu(state){
        return state.activeMenu
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


