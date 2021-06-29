import Logger from "js-logger"
import Vue from "vue"
import storageInterface from '../helpers/storageInterface.js'
import {throttle} from 'lodash'



const presetPrefix = "_"
const projectionStorage = storageInterface.getNamedStore('projection', 'Settings')

const state = () => ({
    activePresetName: '_default',
    active: {
        videoFile: "Deckenprojektion-desaturiert1.mp4", //yt1s.com - Tomats.mp4
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
            hsla(0, 0%, 0%, 0) 100%",//https://larsenwork.com/easing-gradients/#editor
            blendmode: 'luminosity', // applied shitty fix with backdrop-filter to raise stacking context 
        },
        textTimings: {
            minLife: 6,
            maxLife: 12,
            minWait: 10,
            maxWait: 20,
            languageWait: 2,
        },
        textStyle: {
            fadeTime: 2,
            textPaddingTopBottom: .7,
            textPaddingLeftRight: 1.2,
            textAlign: "center",
            fontSize: 2.4,
            marginTop: 12,
            marginSides: 5,
            borderRadius: 1.4,
            blurAmount: 1,
            textColor: "#FFFFFF",
            backgroundColor: "#000000",
            backgroundOpacity: .5,
        },
        texts: {
            top: [
                {
                    de: "Scope creep (also called requirement creep, or kitchen sink syndrome)",
                    en: "in project management refers to changes, continuous or uncontrolled growth in a project’s scope",
                    weight: 1.0
                },
                {
                    de: "poor change control",
                    en: "lack of proper initial identification of what is required to bring about the project objectives",
                    weight: 1.0
                },
                {
                    de: "weak project manager or executive sponsor",
                    en: "poor communication between parties",
                    weight: 1.0
                },
                {
                    de: "lack of initial product versatility",
                    en: "Scope creep often results in cost overrun",
                    weight: 1.0
                }
            ],
            bottom: [
                {
                    de: "Crunch is a form of unpaid overtime",
                    en: "where staff in a video game studio are forced to work long hours to finish a project",
                    weight: 1.0
                },
                {
                    de: "The idea behind the concept is employees are expected to work long hours",
                    en: "until the project deadline has been met by the studio",
                    weight: 1.0
                },
                {
                    de: "New feature request or change of direction",
                    en: "in the product without budgets being provided",
                    weight: 1.0
                },
                {
                    de: "For employees who work at a video game studio, crunch can not",
                    en: "only take a toll on an employee’s personal life, but also their professional career",
                    weight: 1.0
                }
            ],

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
        Logger.info("file save triggered")
        projectionStorage.store = state;
    },
    /**
     * load store from file
     */
    LOAD_FILE(state) {
        if (projectionStorage.store) {
            for (const [key, value] of Object.entries(projectionStorage.store)) {
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
    REMOVE_TEXTPAIR(state, { location, id }) {
        Logger.debug("Delete Text Pair", location, id)
        let texts = state.active.texts[location]
        texts.splice(id, 1)
        Vue.set(state.active.texts, location, texts)
    },
    ADD_TEXTPAIR(state, location) {
        Logger.debug("Add Text Pair", location)
        let texts = state.active.texts[location]
        texts.unshift({ // TODO: replace this with some general template defined elsewhere in case structure changes at some point
            de: "",
            en: "",
            weight: 1,
        })
        Vue.set(state.active.texts, location, texts)
    },
    SET_TEXT_VALUE(state, { location, textid, key, value }) {
        Logger.debug("change text value", { location, textid, key, value })
        Vue.set(state.active.texts[location][textid], key, value)
    },
    SET_VIGNETTE_WIDTH(state, {key, value}){
        Logger.debug("set vignette width", {key, value})
        Vue.set(state.active.vignette.width, key, value)
    },
    SET_VIGNETTE_BLENDMODE(state, blendmode){
        Logger.debug("set vignette blendmode", blendmode)
        Vue.set(state.active.vignette, 'blendmode', blendmode)
    },
    SET_VIGNETTE_GRADIENT(state, gradient){
        Logger.debug("set vignette gradient", gradient)
        Vue.set(state.active.vignette, 'gradient', gradient)
    },
    SET_TEXT_TIMING(state, {key, value}){
        Logger.debug("set timing", {key, value})
        Vue.set(state.active.textTimings, key, value)
    },
    SET_TEXT_STYLE(state, {key, value}){
        Logger.debug("set style", {key, value})
        Vue.set(state.active.textStyle, key, value)
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
        dispatch('saveFileThrottled')
    },
    /**
     * update single property from property / value pair
     */
    updateOne({ commit, dispatch }, { property, value }) {

        let changes = {}
        changes[property] = value;
        commit('SET_ACTIVE', changes)
        dispatch('saveFileThrottled')
    },
    /**
     * get saved theme object and replace active with it
     */
    setFromSaved({ commit, dispatch, state }, saved) { // pass name of saved theme object
        Logger.debug("Loading saved Theme:", saved)
        // saved = presetPrefix + saved;
        if (!state.presets[saved]) {
            return
        }
        commit('SET_ACTIVE', state.presets[saved]);
        commit('SET_ACTIVE_PRESET_NAME', saved)
        dispatch('saveFileThrottled')
    },
    /**
     * save active theme object to named theme object
     */
    saveFromActive({ commit, dispatch }, savee) { // pass name of theme object to save into
        commit('SET_SAVEE', savee);
        commit('SAVE_FILE');
        dispatch('saveFileThrottled');
    },
    /////////////////////////////
    // module specific
    /////////////////////////////
    removeTextpair({ commit, dispatch }, { location, id }) {
        commit('REMOVE_TEXTPAIR', { location, id })
        dispatch('saveFileThrottled')
    },
    addTextpair({ commit, dispatch }, location) {
        commit('ADD_TEXTPAIR', location)
        dispatch('saveFileThrottled')
    },
    setTextValue({ commit, dispatch }, { location, textid, key, value }) {
        if (key == "weight") {
            value = parseFloat(value)
            value = value > 0 ? value : 0;
        }
        commit('SET_TEXT_VALUE', { location, textid, key, value })
        dispatch('saveFileThrottled')
    },
    setVignetteWidth({commit, dispatch}, {key, value}){
    commit('SET_VIGNETTE_WIDTH', {key, value})
    dispatch('saveFileThrottled')
    },
    setVignetteBlendmode({commit, dispatch}, blendmode){
        commit('SET_VIGNETTE_BLENDMODE', blendmode)
        dispatch('saveFileThrottled')
    },
    setVignetteGradient({commit, dispatch}, gradient){
        commit('SET_VIGNETTE_GRADIENT', gradient)
        dispatch('saveFileThrottled')
    },
    setTextTiming({commit, dispatch}, {key, value}){
        commit('SET_TEXT_TIMING', {key, value})
        dispatch('saveFileThrottled')
    },
    setTextStyle({commit, dispatch}, {key, value}){
        commit('SET_TEXT_STYLE', {key, value})
        dispatch('saveFileThrottled')
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
    getVignette(state) {
        return state.active.vignette
    },
    getVideoFile(state) {
        return state.active.videoFile
    },
    getTexts(state) {
        return state.active.texts
    },
    getTextTimings(state) {
        return state.active.textTimings
    },
    getTextStyle(state) {
        return state.active.textStyle
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


