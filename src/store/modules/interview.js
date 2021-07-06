import Logger from "js-logger"
import Vue from "vue"
import storageInterface from '../helpers/storageInterface.js'
import { throttle } from 'lodash'

/* get file list */
const ipcRenderer = require('electron').ipcRenderer;



const presetPrefix = "_"
const interviewStorage = storageInterface.getNamedStore('interview', 'Settings')

var flatten = require('flat')

const state = () => ({
    activePresetName: '_default',
    activeLanguage: 'de',
    activeInterview: null,
    activeQuestion: null,
    fileTree: {},
    active: {
        videos: {
            absoluteWeights: false,
            noConsecutiveVoice: true,
            noVoiceCategory: 1,
            idleWaitTime: 60, // in seconds
            categories: {
                0: {
                    name: "- ACTIVATE QUESTIONS",
                    weight: 1,
                },
                1: {
                    name: "- BORING",
                    weight: 3,
                },
                2: {
                    name: "- PSST",
                    weight: 1.5,
                },
            },
            questionsFolderSuffix: '- QUESTIONS',
            deSubFolderSuffix: 'UT [DE]',
            enSubFolderSuffix: 'UT [EN]',
        },
        translations: {
            global: {
                title: {
                    de: "Korallenriffe und Menschen",
                    en: "Coral Reefs and Humans"
                }
            },
            interviews: [
                {
                    name: "Onyx Le Bihan",
                    mediaFolder: "SNIPPETS ONYX",
                    thumbnail: "THUMBNAIL-ONYX.jpg",
                    blurb: {
                        de: "Speerfischerin auf Moorea, Tahiti",
                        en: "Spearfisher at Moorea, Tahiti"
                    },
                    questions: [
                        {
                            en: "Who are you?",
                            de: "Wer bist du?",
                            id: 1,
                        },
                        {
                            en: "Can you eat all the fish that live on the reef?",
                            de: "Kann man alle am Riff lebenden Fische essen?",
                            id: 3,
                        },
                        {
                            en: "When did you start fishing?",
                            de: "Wann hast du mit dem Fischen angefangen?",
                            id: 6,
                        },
                        {
                            en: "What does an underwater hunt look like?",
                            de: "Wie sieht eine Unterwasserjagd aus?",
                            id: 7,
                        },
                        {
                            en: "How do you learn to hunt underwater?",
                            de: "Wie lernt man die Unterwasserjagd?",
                            id: 8,
                        },
                        {
                            en: "What do you hunt with?",
                            de: "Womit jagst du?",
                            id: 9,
                        },
                        {
                            en: "Are there rules as to which fish can be caught?",
                            de: "Gibt es Regeln, welche Fische gefangen werden dürfen?",
                            id: 10,
                        },
                        {
                            en: "How do you avoid overfishing?",
                            de: "Wie vermeidet ihr Überfischung?",
                            id: 11,
                        },
                        {
                            en: "Are there changes in the fish population?",
                            de: "Gibt es Veränderungen beim Fischbestand?",
                            id: 12,
                        },
                        {
                            en: "Who does underwater fishing?",
                            de: "Wer betreibt die Unterwasserfischerei?",
                            id: 13,
                        },
                        {
                            en: "What was your best experience on the reef?",
                            de: "Was war dein schönstes Erlebnis am Riff?",
                            id: 14,
                        },
                        {
                            en: "What was your worst experience on the reef?",
                            de: "Was war dein schlimmstes Erlebnis am Riff?",
                            id: 15,
                        },
                        {
                            en: "What are your wishes for the future?",
                            de: "Was sind deine Wünsche für die Zukunft?",
                            id: 16,
                        },
                        {
                            en: "How can reefs be protected?",
                            de: "Wie können Riffe geschützt werden?",
                            id: 18,
                        },
                    ]
                },
                {
                    name: "Dr. Sebastian Ferse",
                    mediaFolder: "SNIPPETS SEBASTIAN [DE]",
                    thumbnail: "thumbnail.png",
                    blurb: {
                        de: "Leibniz-Zentrum für Marine Tropenforschung\r\nExecutive Director Future Earth Coasts",
                        en: "Leibniz Center for Tropical Marine Research\r\nExecutive Director Future Earth Coasts"
                    },
                    questions: [
                        {
                            en: "Who are you?",
                            de: "Wer bist du?",
                            id: 1,
                        },
                        {
                            en: "What drives you?",
                            de: "Was treibt dich an?",
                            id: 2,
                        },
                        {
                            en: "What do you love about your job?",
                            de: "Was begeistert dich an deinem Beruf?",
                            id: 3,
                        },
                        {
                            en: "How did you get into reef research?",
                            de: "Wie bist du zur Riffforschung gekommen?",
                            id: 4,
                        },
                        {
                            en: "What is the Leibnitz Center for Tropical Marine Research?",
                            de: "Was ist das Leibnitz Zentrum für Marine Tropenforschung?",
                            id: 5,
                        },
                        {
                            en: "What are you researching?",
                            de: "An was forschst du?",
                            id: 6,
                        },
                        {
                            en: "How can I contribute to reef protection in Germany?",
                            de: "Wie kann ich hier etwas zum Riffschutz beitragen?",
                            id: 7,
                        },
                        {
                            en: "Do you have some hard facts for me?",
                            de: "Hast du ein paar harte Fakten für mich?",
                            id: 8,
                        },
                        {
                            en: "Do you have an example of how reefs work for me?",
                            de: "Hast du ein Beispiel für die Funktion von Riffen für mich?",
                            id: 9,
                        },
                        {
                            en: "Can you repair damaged reefs?",
                            de: "Kann man beschädigte Riffe reparieren?",
                            id: 10,
                        },
                        {
                            en: "Is It Too Late To Protect The Reefs?",
                            de: "Ist es zu spät die Riffe zu schützen?",
                            id: 11,
                        },
                        {
                            en: "How can political initiative groups be successful?",
                            de: "Wie können politische Initiatinven erfolgreich sein?",
                            id: 12,
                        },
                        {
                            en: "How can reefs protect against climate change?",
                            de: "Wie können Riffe vor dem Klimawandels schützen?",
                            id: 13,
                        }
                    ]
                },
                {
                    name: "Dr. Moshira Hassan",
                    mediaFolder: "SNIPPETS MOSHIRA",
                    thumbnail: "thumbnail.png",
                    blurb: {
                        de: "Reef Check Koordinatorin Deutschland/Europa und Rotes Meer",
                        en: "Reef Check Coordinator Germany/Europe and Red Sea"
                    },
                    questions: [
                        {
                            en: "Who are you?",
                            de: "Wer Bist du?",
                            id: 1,
                        },
                        {
                            en: "What drives you?",
                            de: "Was treibt dich an?",
                            id: 2,
                        },
                        {
                            de: "Warum brauchen wir Riffschutz?",
                            en: "Why do we need to protect reefs?",
                            id: 3,
                        },
                        {
                            de: "Wie steh es um die Riffe und was kann ich tun?",
                            en: "What's happening with the reefs and what can I do?",
                            id: 4,
                        },
                        {
                            de: "Wie wird es den Riffen in 10 Jahren gehen?",
                            en: "How will the reefs be doing in 10 years?",
                            id: 5,
                        },
                        {
                            de: 'Was ist "REEF CHECK"?',
                            en: 'What is "REEF CHECK"?',
                            id: 6,
                        },
                        {
                            de: 'Wie kann "REEF CHECK" unterstützt werden?',
                            en: 'How can "REEF CHECK" be supported?',
                            id: 7,
                        }
                    ]
                },
                {
                    name: "Claudia Schmitt",
                    mediaFolder: "SNIPPETS CLAUDIA [DE]",
                    thumbnail: "thumbnail.png",
                    blurb: {
                        de: "The Jetlagged. Naturfilmerin",
                        en: "The Jetlagged. Underwater, nature and wildlife filmmaker"
                    },
                    questions: [
                        {
                            en: "Who are you?",
                            de: "Wer bist du?",
                            id: 1,
                        },
                        {
                            en: "What drives you?",
                            de: "Was treibt dich an?",
                            id: 2,
                        },
                        {
                            en: "What's the goal of your films?",
                            de: "Was ist das Ziel deiner Filme?",
                            id: 3,
                        },
                        {
                            en: "Should we even be diving at all?",
                            de: "Sollte man überhaupt tauchen?",
                            id: 4,
                        },
                        {
                            en: "How can divers prevent damage to reefs?",
                            de: "Wie können Tauchende Schäden am Riff verhindern?",
                            id: 5,
                        },
                        {
                            en: "What should you watch out for on a diving holiday?",
                            de: "Worauf sollte man beim Tauchurlaub achten?",
                            id: 6,
                        },
                        {
                            en: "Tell me something about the animals in the reef.",
                            de: "Erzähl mir etwas über die Tiere im Riff.",
                            id: 7,
                        },
                        {
                            en: "What was your most dangerous encounter on the reef?",
                            de: "Was war deine gefährlichste Begegnung im Riff?",
                            id: 8,
                        },
                        {
                            en: "What was your worst experience on the reef?",
                            de: "Was war deine schlimmste Erfahrung im Riff?",
                            id: 9,
                        },
                        {
                            en: "How can I help protect the reefs?",
                            de: "Wie kann ich zum Schutz der Riffe beitragen?",
                            id: 10,
                        },
                        {
                            en: "Which is your favourite coral reef?",
                            de: "Was ist dein Lieblingskorallenriff?",
                            id: 11,
                        },
                        {
                            en: "Can damaged reefs be repaired?",
                            de: "Können geschädigte Riffe wieder repariert werden?",
                            id: 12,
                        }
                    ]
                },
                {
                    name: "Taiano Teiho",
                    mediaFolder: "SNIPPETS TAIANO",
                    thumbnail: "thumbnail.png",
                    blurb: {
                        de: "Coral-Gardener auf Moorea, Tahiti",
                        en: "Coral gardener at Moorea, Tahiti"
                    },
                    questions: [
                        {
                            en: "Who are you?",
                            de: "Wer bist du?",
                            id: 1,
                        },
                        {
                            en: "Where did your connection to the reef come from?",
                            de: "Woher kommt deine Verbindung zum Riff?",
                            id: 2,
                        },
                        {
                            en: "How do you get involved with the reefs?",
                            de: "Wie engagierst du dich für die Riffe?",
                            id: 3,
                        },
                        {
                            en: "What significance does the sea have for the Polynesians?",
                            de: "Welche Bedeutung hat das Meer für die Polynesier?",
                            id: 4,
                        },
                        {
                            en: "Why are coral reefs so important?",
                            de: "Warum sind Korallenriffe so wichtig?",
                            id: 5,
                        },
                        {
                            en: "How can you support the Coral Gardeners?",
                            de: "Wie kann man die Coral Gardeners unterstützen?",
                            id: 8,
                        },
                        {
                            en: "What causes local damage to the reefs?",
                            de: "Wodurch werden die Riffe lokal beschädigt?",
                            id: 11,
                        },
                        {
                            en: "What can we do to protect the reefs?",
                            de: "Was können wir tun um die Riffe zu schützen?",
                            id: 13,
                        },
                    ]
                }
            ],
        },
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
    },
    SET_INTERVIEW(state, id) {
        Vue.set(state, 'activeInterview', id)
    },
    SET_QUESTION(state, id) {
        Vue.set(state, 'activeQuestion', id)
    },
    SET_FILETREE(state, filetree) {
        Vue.set(state, "fileTree", filetree)
    }
}

const actions = {
    saveFile({ commit }) {
        Logger.info("save request")
        commit('SAVE_FILE')
    },
    saveFileThrottled: throttle(({ dispatch }) => {
        Logger.info("throttled save request"),
            dispatch("saveFile")
    }, 10000, { 'trailing': true, 'leading': false }),
    /**
     * load state from file, create default if not exist 
     */
    initialize({ commit, dispatch, state }) {
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
        dispatch('setFilePaths')
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
    setFromSaved({ commit, dispatch, state }, saved) { // pass name of saved theme object
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
    switchLanguage({ commit, state }) {
        if (state.activeLanguage === 'de') {
            commit('SET_LANGUAGE', 'en')
        } else {
            commit('SET_LANGUAGE', 'de')
        }
    },
    setActiveInterview({ commit }, id) {
        commit('SET_INTERVIEW', id)
    },
    setActiveQuestion({ commit }, id) {
        commit('SET_QUESTION', id)
    },
    async setFilePaths({ commit }) {
        Logger.info("Getting File Tree")
        const res = await ipcRenderer.invoke('getPublicFiles')
        Logger.debug("File Tree:", res)
        if (res.children && res.children.length > 0) {
            for (const child of res.children) {
                Logger.trace("checking child for correct directory:", child)
                if (child.type === "directory" && child.name === "interviews") {
                    commit("SET_FILETREE", child)
                }
            }
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
    translateInterview(state) {
        let interviews = []
        for (const interview in state.active.translations.interviews) {
            if (Object.prototype.hasOwnProperty.call(state.active.translations.interviews, interview))
                interviews.push(flattenAndTranslate(state.active.translations.interviews[interview], state.activeLanguage))
        }
        return interviews
    },
    activeLanguage(state) {
        return state.activeLanguage
    },
    activeInterview(state) {
        return state.activeInterview
    },
    activeQuestion(state) {
        if (!isNaN(state.activeInterview)) {
            return state.activeQuestion
        }
        return null
    },
    fileTreeAll(state) {
        if (state.fileTree.children && state.fileTree.children.length > 0) {
            const subFileTrees = {}
            for (const child of state.fileTree.children) {
                subFileTrees[child.name] = child
            }
            const idFileTree = {}
            for (const [interviewKey, interviewValue] of Object.entries(state.active.translations.interviews)) {
                if (interviewValue.mediaFolder && typeof (interviewValue.mediaFolder) === "string" && interviewValue.mediaFolder.length > 0) {
                    idFileTree[interviewKey] = subFileTrees[interviewValue.mediaFolder] || null;
                } else {
                    idFileTree[interviewKey] = null;
                }
            }
            return idFileTree
        }
        return null
    },
    fileTree(state, getters) {
        if (!isNaN(state.activeInterview) && getters.fileTreeAll) {
            return getters.fileTreeAll[state.activeInterview]
        }
        return null
    },
    questions(state) {
        if (!isNaN(state.activeInterview) && state.active.translations.interviews && state.active.translations.interviews[state.activeInterview] && state.active.translations.interviews[state.activeInterview].questions) {
            const questions = state.active.translations.interviews[state.activeInterview].questions

            const localQuestions = {}
            for (const question of questions) {
                if (question.id) {
                    localQuestions[question.id] = question[state.activeLanguage] || question.de || question.en || '';
                }
            }
            return localQuestions
        }
        return null

    },
    questionsSubtitles(state, getters) {
        // UT [DE]
        if (!isNaN(state.activeInterview) && getters.fileTree && getters.fileTree.children && getters.fileTree.children.length) {
            const questionsFolder = getters.fileTree.children.filter((child) => child.name.endsWith(state.active.videos.questionsFolderSuffix))
            if (questionsFolder && questionsFolder[0] && questionsFolder[0].children && questionsFolder[0].children.length > 0) {
                const deSub = questionsFolder[0].children.filter((child) => { return (child.type === "directory" && child.name.endsWith(state.active.videos.deSubFolderSuffix)) }) //  
                const enSub = questionsFolder[0].children.filter((child) => { return (child.type === "directory" && child.name.endsWith(state.active.videos.enSubFolderSuffix)) })
                const subReturn = {}
                if (deSub.length > 0 && deSub[0].children && deSub[0].children.length > 0) {
                    const sub = deSub[0]
                    subReturn.de = getChildFilesByNumber(sub.children)
                }
                if (enSub.length > 0 && enSub[0].children && enSub[0].children.length > 0) {
                    const sub = enSub[0]
                    subReturn.en = getChildFilesByNumber(sub.children)
                }
                return subReturn
            }
        }
        return null
    },
    questionsVideos(state, getters) {
        if (!isNaN(state.activeInterview) && getters.fileTree && getters.fileTree.children && getters.fileTree.children.length) {

            const questionsFolder = getters.fileTree.children.filter((child) => child.name.endsWith(state.active.videos.questionsFolderSuffix))
            Logger.debug("Getting Questions:", questionsFolder)
            if (questionsFolder && questionsFolder[0] && questionsFolder[0].children && questionsFolder[0].children.length > 0) {
                return getChildFilesByNumber(questionsFolder[0].children)
            }
        }
        return null
    },
    thumbnails(state, getters) {
        let thumbs = {}
        if (!getters.fileTreeAll) {
            return null
        }
        for (const [interviewKey, interviewValue] of Object.entries(state.active.translations.interviews)) {
            // Logger.debug("FileTree Thumb testing: ", interviewKey, getters.fileTreeAll[interviewKey])
            const fileTree = getters.fileTreeAll[interviewKey]
            const fileName = interviewValue.thumbnail || '';
            let path = '';
            if (fileTree && fileTree.children && fileTree.children.length > 0) {
                for (const childId in fileTree.children) {
                    const child = fileTree.children[childId]
                    if (child.type === "file" && child.name === fileName) {
                        path = child.path.replace(__static, '');
                    }
                }
            }
            thumbs[interviewKey] = path;
        }
        return thumbs
    },
    idleVideosAbsoluteWeights(state) {
        return state.active.videos.absoluteWeights
    },
    noConsecutiveVoice(state) {
        return state.active.videos.noConsecutiveVoice
    },
    noVoiceCategory(state) {
        return state.active.videos.noVoiceCategory
    },
    idleVideosCategories(state) {
        return state.active.videos.categories
    },
    idleWaitTime(state) {
        return state.active.videos.idleWaitTime
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

function getChildFilesByNumber(childElements) {
    const returnElements = {}
    for (const child of childElements) {
        // Logger.debug("Getting Child Element:", child)
        if (child.type === "file") {
            const childNum = (child.name.substr(0, 3).match(/\d+\.\d+|\d+\b|\d+(?=\w)/g) || []).map((v) => { return +v })
            if (childNum.length > 0) {
                returnElements[childNum[0]] = child.path.replace(__static, '');
            }
        }
    }
    return returnElements
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


