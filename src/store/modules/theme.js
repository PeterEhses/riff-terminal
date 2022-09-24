import Logger from "js-logger"
import Vue from "vue"
import storageInterface from '../helpers/storageInterface.js'
import {throttle} from 'lodash'
const presetPrefix = "_"
const themeStorage = storageInterface.getNamedStore('theme', 'Settings')

const state = () => ({
    activePresetName: '_default',
    active: {

        /* UNITS */



        // units

        // baseSpacingSmall: '0.1rem',

        // baseSpacing: '1rem',
        spaceUnit: '1rem',
        unitScaleModifier: 1.3,

        unit3xsScaleModifier: .1,

        // unitExtraSmall: 'var(--base-spacing-small)',
        // unitSmall: 'calc( var(--base-spacing) / var(--font-scale-modifier) )',
        // unitMedium: 'var(--base-spacing)',
        // unitLarge: 'calc( var(--base-spacing) * var(--font-scale-modifier) )',


        /* COLORS */

        // plain defs

        //grayscale

        colorWhite: '#ffffff',
        colorBlack: '#000000',

        colorOffWhite: '#E6F4F1',
        colorLightGray: '#99AEBB',
        colorDarkGray: '#364954',
        colorOffBlack: '#152832',

        'colorGray-66': '#666666',
        'colorGray-70': '#707070',
        'colorGray-ff': '#FFFFFF',
        'colorGray-33': '#333333',

        // named colors

        colorLightBlue: '#A4FFFF',
        colorBlue: '#00BDD5',
        colorMutedBlue: '#657A86',

        colorLightRed: '#FFA1A7',
        colorRed: '#E16B73',
        colorMutedRed: '#976A76',

        colorLightGreen: '#82F9BF',
        colorGreen: '#45C089',
        colorMutedGreen: '#3F857A',

        colorLightOrange: '#FFEBCD',
        colorOrange: '#EF972C',
        colorMutedOrange: '#8E7258',

        // semantic defs
        colorAccent: 'var(--color-green)',
        colorNeutralAction: 'var(--color-blue)',
        colorPositiveAction: 'var(--color-green)',
        colorNegativeAction: 'var(--color-red)',

        textColorDefault: 'var(--color-off-white)',

        backgroundColorBase: 'var(--color-off-black)',

        // gradients

        gradientDirectionDefault: 70,

        backgroundGradientBase: 'linear-gradient(\
            calc(var(--gradient-direction-default) * 1deg), \
            var(--color-muted-red) 0%, \
            var(--color-muted-green) 100%\
            )',


        // blur

        blurNormal: 'blur(var(--unit-3xs))',
        blurNormalBackgroundColor: 'var(--color-off-black)',
        blurNormalBackgroundOpacity: 0.5,

        // shadows

        boxShadowDefault: '0px var(--unit-sm) var(--unit-md) var(--blur-normal-background-color)',

        /*  TYPOGRAPHY  */

        // plain

        // font

        fontWeightLight: 100,
        fontWeightNormal: 400,
        fontWeightMedium: 500,
        fontWeightBold: 700,
        
        lineHeight: 'var(--unit-scale-modifier)',
        lineHeightHeader: 1.69, // 1.3

        // size

        fontSizeInitial: '17px',
        fontScaleModifier: 'var(--space-scale-modifier)',

        // semantic

        fontBody: '"Roboto", sans-serif',
        fontWeightBody: 'var(--font-weight-normal)',


        fontHeading: 'var(--font-body)',
        fontWeightHeading: 'var(--font-weight-medium)',
        fontWeightSubheading: 'var(--font-weight-normal)',


        /* BORDERS */

        // abstract

        borderRadiusSmall: 'var(--unit-sm)',
        borderRadiusMedium: 'var(--unit-md)',
        borderRadiusLarge: 'var(--unit-lg)',

        // semantic






        /* SPACING */

        /* Scrollbars */
        scrollbarTrackColor: 'rgba(0,0,0,0)',
        scrollbarThumbColor: 'var(--color-muted-blue)',
        scrollbarTrackWidth: 'var(--unit-xs)',
        scrollbarThumbOffset: 'var(--unit-3xs)',
        scrollbarThumbRoundness: 1,
        scrollbarThumbInset: 'var(--unit-3xs)',

        /* modal */
        // margins

        // TODO: change all occurences of thsi to marginModalContainer
        marginMainContainer: 'calc( var(--unit-md) * 2 )',
        textColorModal: 'var(--color-orange)',
        inputColorModal: 'var(--color-off-white)',
        borderColorModal: 'var(--color-orange)',
        backgroundColorModal: 'var(--blur-normal-background-color)',
        colorNeutralActionModal: 'var(--color-orange)',
        colorNeutralActionModalHover: 'var(--color-light-orange)',

        borderModal: 'var(--unit-3xs) solid var(--border-color-modal)',
        borderRadiusModal: 'var(--border-radius-large)',

        /* interview */
        interviewSpacingGutterXl: '7.5rem',
        interviewSpacingGutterLg: '5.8rem',
        interviewSpacingGutterMd: '3.75rem',
        interviewSpacingGutterSm: 'var(--unit-xxs)',


        interviewButtonHeight: 'var(--interview-spacing-gutter-lg)',
        opacityButtonInactive: 0.7,
        opacityButtonPress: 'var(--opacity-button-inactive)',

        interviewBaseGridColumns: '[gutter-left] var(--interview-spacing-gutter-xl) [main] auto [gutter-right] var(--interview-spacing-gutter-xl)',

        colorInterviewHeaderBackground: 'var(--color-gray-33)',
        opacityInterviewHeaderBackground: .7,

        /* Subtitles */
            fontSizeSubtitles: 'var(--unit-md)',
            subtitleBottomOffset: '40rem',

        /* List */
            listCardHeight: 'calc(var(--interview-spacing-gutter-xl) * 2)',
            fontSizeListCardBody: '1.4rem',//'var(--unit-md)',
            fontSizeListCardHeading: 'var(--font-size-list-card-body)',
            fontWeightListCardBody: 'var(--font-weight-normal)',
            fontWeightListCardHeading: 'var(--font-weight-bold)',

            /* Play Button */

            playButtonSize: 'var(--interview-spacing-gutter-md)',
            colorPlayButton: 'var(--text-color-default)',
            playButtonOpacity: .7,

            /* back button */

            backButtonSize: '2.3rem',
            colorBackButton: 'var(--color-play-button)',

            /* questions */
            questionSpacingUglifier: '3px',
            questionsSpacing: 'calc(var(--unit-lg) - var(--question-spacing-uglifier))',
            questionsMarginBottom: 'var(--question-spacing)',
            questionHeight: 'var(--unit-xxl)',
            questionBorderRadius: 0, // 'calc(var(--question-height) / 2)',
            fontSizeQuestions: 'var(--unit-lg)',
            fontWeightQuestions: 'var(--font-weight-normal)',

        /* Language Toggle */
        fontSizeToggle: 'var(--unit-md)',
        fontWeightToggle: 'var(--font-weight-normal)',
        fontWeightToggleActive: 'var(--font-weight-bold)',
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
        themeStorage.store = state;
    },
    /**
     * load store from file
     */
    LOAD_FILE(state) {
        if (themeStorage.store) {
            for (const [key, value] of Object.entries(themeStorage.store)) {
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
    SET_ACTIVE_THEME_NAME(state, name) {
        Vue.set(state, 'activePresetName', name);
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
            commit('SET_ACTIVE_THEME_NAME', '_default')
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
    setFromSaved({ commit, dispatch, state }, saved) { // pass name of saved theme object
        Logger.debug("Loading saved Theme:", saved)
        // saved = presetPrefix + saved;
        if (!state.presets[saved]) {
            return
        }
        commit('SET_ACTIVE', state.presets[saved]);
        commit('SET_ACTIVE_THEME_NAME', saved)
        dispatch("saveFileThrottled")
    },
    /**
     * save active theme object to named theme object
     */
    saveFromActive({ commit, dispatch }, savee) { // pass name of theme object to save into
        commit('SET_SAVEE', savee);
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
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}


