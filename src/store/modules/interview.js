import Logger from "js-logger"
import Vue from "vue"
import storageInterface from '../helpers/storageInterface.js'


const presetPrefix = "_"
const interviewStorage = storageInterface.getNamedStore('interview', 'Settings')

var flatten = require('flat')

const state = () => ({
    activePresetName: '_default',
    activeLanguage: 'de',
    active: {
        translations: {
            global: {
                title: {
                    de: "Korallenriffe und Menschen",
                    en: "Coral Reefs and Humans"
                }
            },
            interviews: {
                0: {
                    name: "Onyx Le Bihan",
                    blurb: {
                        de: "Speerfischerin auf Moorea, Tahiti",
                        en: "Spearfisher at Moorea, Tahiti"
                    }
                },
                1: {
                    name: "Dr. Sebastian Ferse",
                    blurb: {
                        de: "Leibniz-Zentrum für Marine Tropenforschung\r\nExecutive Director Future Earth Coasts",
                        en: "Leibniz Center for Tropical Marine Research\r\nExecutive Director Future Earth Coasts"
                    }
                },
                2: {
                    name: "Dr. Moshira Hassan",
                    blurb: {
                        de: "Reef Check Koordinatorin Deutschland/Europa und\nRotes Meer",
                        en: "Reef Check Coordinator Germany/Europe and Red Sea"
                    }
                },
                3: {
                    name: "Claudia Schmitt",
                    blurb: {
                        de: "The Jetlagged. Naturfilmerin",
                        en: "The Jetlagged. Underwater, nature and wildlife filmmaker"
                    }
                },
                4: {
                    name: "Taiano Teiho",
                    blurb: {
                        de: "Coral-Gardener auf Moorea, Tahiti",
                        en: "Coral gardener at Moorea, Tahiti"
                    }
                },
            }
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
    SET_LANGUAGE(state, lang) {
        Vue.set(state, 'activeLanguage', lang)
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
    switchLanguage({ commit, state }) {
        if (state.activeLanguage === 'de') {
            commit('SET_LANGUAGE', 'en')
        } else {
            commit('SET_LANGUAGE', 'de')
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
    translate(state) {
        return flattenAndTranslate(state.active.translations, state.activeLanguage);
    },
    translateInterview(state){
        let interviews = []
        for(const interview in state.active.translations.interviews){
            if(Object.prototype.hasOwnProperty.call(state.active.translations.interviews, interview))
            interviews.push(flattenAndTranslate(state.active.translations.interviews[interview], state.activeLanguage))
        }
        return interviews
    },
    activeLanguage(state) {
        return state.activeLanguage
    }
}

function flattenAndTranslate(obj, languageSuffix) {
    const flatTranslations = flatten(obj)
    let result = {}
    for (const key in flatTranslations) {
        if (Object.prototype.hasOwnProperty.call(flatTranslations, key)
        ) {
            result[key] = flatTranslations[key]
            if (key.endsWith(languageSuffix)) {
                const newKey = key.substring(0, key.length - languageSuffix.length - 1);
                result[newKey] = flatTranslations[key]
            }
        }
    }
    return result
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


