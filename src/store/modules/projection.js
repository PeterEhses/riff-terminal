import Logger from "js-logger"
import Vue from "vue"
import storageInterface from '../helpers/storageInterface.js'




const presetPrefix = "_"
const interviewStorage = storageInterface.getNamedStore('projection', 'Settings')

const state = () => ({
    activePresetName: '_default',
    active: {
        vignette: {
            width: {
                top: 5,
                right: 5,
                bottom: 5,
                left: 5,
            },
            gradient: "hsl(0, 0%, 0%) 0%,\
            hsla(0, 0%, 0%, 0.954) 5.1%,\
            hsla(0, 0%, 0%, 0.894) 10.4%,\
            hsla(0, 0%, 0%, 0.823) 15.9%,\
            hsla(0, 0%, 0%, 0.743) 21.6%,\
            hsla(0, 0%, 0%, 0.656) 27.5%,\
            hsla(0, 0%, 0%, 0.566) 33.6%,\
            hsla(0, 0%, 0%, 0.474) 40%,\
            hsla(0, 0%, 0%, 0.384) 46.6%,\
            hsla(0, 0%, 0%, 0.297) 53.4%,\
            hsla(0, 0%, 0%, 0.217) 60.5%,\
            hsla(0, 0%, 0%, 0.146) 67.9%,\
            hsla(0, 0%, 0%, 0.086) 75.5%,\
            hsla(0, 0%, 0%, 0.04) 83.4%,\
            hsla(0, 0%, 0%, 0.01) 91.5%,\
            hsla(0, 0%, 0%, 0) 100%",
            blendmode: 'luminosity', // applied shitty fix with backdrop-filter to raise stacking context
        }
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
    getVignette(state){
        return state.active.vignette
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


