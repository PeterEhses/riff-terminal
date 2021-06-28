import Logger from "js-logger"
import Vue from "vue"
import storageInterface from '../helpers/storageInterface.js'




const presetPrefix = "_"
const interviewStorage = storageInterface.getNamedStore('projection', 'Settings')

const state = () => ({
    activePresetName: '_default',
    active: {
        videoFile: "yt1s.com - Tomats.mp4",
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
            bottom: [
                {
                    de: "D merciful moral joy.  victorious",
                    en: "E Free strong love sea sea depths against derive victorious",
                    weight: 1.0
                },
                {
                    de: "D eternal-return  horror fearful",
                    en: "E christian endless gains decrepit horror faithful superiority",
                    weight: 1.0
                },
                {
                    de: "D philosophy moral decrepit virtues horror justice",
                    en: "E Self gains  moral horror",
                    weight: 1.0
                },
                {
                    de: "D will ultimate sea  justice",
                    en: "E virtues virtues. Contradict hatred enlightenment passion evil",
                    weight: 1.0
                }
            ],
            top: [
                {
                    de: "merciful moral joy. Inexpedient chaos battle victorious",
                    en: "Free strong love sea sea depths against derive victorious",
                    weight: 1.0
                },
                {
                    de: "eternal-return society. Play transvaluation horror fearful",
                    en: "christian endless gains decrepit horror faithful superiority",
                    weight: 1.0
                },
                {
                    de: "philosophy moral decrepit virtues horror justice",
                    en: "Self gains reason zarathustra abstract moral horror",
                    weight: 1.0
                },
                {
                    de: "will ultimate sea victorious justice",
                    en: "virtues virtues. Contradict hatred enlightenment passion evil",
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
    REMOVE_TEXTPAIR(state, {location, id}){
        Logger.debug("Delete Text Pair", location, id)
        let texts = state.active.texts[location]
        texts.splice(id, 1)
        Vue.set(state.active.texts, location, texts)
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
        commit('SAVE_FILE')
    },
    /**
     * update single property from property / value pair
     */
    updateOne({ commit }, { property, value }) {

        let changes = {}
        changes[property] = value;
        commit('SET_ACTIVE', changes)
        commit('SAVE_FILE')
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
    removeTextpair({commit}, {location, id}){
        commit('REMOVE_TEXTPAIR', {location, id})
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
    getVignette(state){
        return state.active.vignette
    },
    getVideoFile(state){
        return state.active.videoFile
    },
    getTexts(state){
        return state.active.texts
    },
    getTextTimings(state){
        return state.active.textTimings
    },
    getTextStyle(state){
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


