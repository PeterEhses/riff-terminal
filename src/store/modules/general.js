import Logger from "js-logger"
import Vue from "vue"
import storageInterface from '../helpers/storageInterface.js'




const presetPrefix = "_"
const interviewStorage = storageInterface.getNamedStore('general', 'Settings')

const state = () => ({
    activePresetName: '_default',
    active: {
       mode: "projection", // options: projection, interview
    },
    presets: {

    }
})

const mutations = {
    /**
     * save store to file 
     */
    SAVE_FILE(state) {
        interviewStorage.store = state;
    },
    /**
     * load store from file
     */
    LOAD_FILE(state) {
        if (interviewStorage.store) {
            for (const [key, value] of Object.entries(interviewStorage.store)) {
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
    }
}

const actions = {
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
    updateMany({ commit }, changes) {
        commit('SET_ACTIVE', changes)
    },
    /**
     * update single property from property / value pair
     */
    updateOne({ commit }, { property, value }) {

        let changes = {}
        changes[property] = value;
        commit('SET_ACTIVE', changes)
    },
    /**
     * get saved theme object and replace active with it
     */
    setFromSaved({ commit, state }, saved) { // pass name of saved theme object
        Logger.debug("Loading saved Theme:", saved)
        // saved = presetPrefix + saved;
        if (!state.presets[saved]) {
            return
        }
        commit('SET_ACTIVE', state.presets[saved]);
        commit('SET_ACTIVE_PRESET_NAME', saved)
        commit('SAVE_FILE')
    },
    /**
     * save active theme object to named theme object
     */
    saveFromActive({ commit }, savee) { // pass name of theme object to save into
        commit('SET_SAVEE', savee);
        commit('SAVE_FILE');
    },
    /////////////////////////////
    // module specific
    /////////////////////////////
    changeMode({commit, state}){
        if(state.active.mode == "interview"){
            commit('SET_MODE', "projection")
        } else {
            commit('SET_MODE', "interview")
        }
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


