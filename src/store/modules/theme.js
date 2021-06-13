import Logger from "js-logger"
import Vue from "vue"
import storageInterface from '../helpers/storageInterface.js'
const presetPrefix = "_"
const themeStorage = storageInterface.getNamedStore('theme', 'Settings')

const state = () => ({
    activeThemeName: '_default',
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

        gradientDirectionDefault: 15,

        backgroundGradientBase: 'linear-gradient(\
            calc(var(--gradient-direction-default) * 1deg), \
            var(--color-off-black) 0%, \
            var(--color-muted-blue) 100%\
            )',


        // blur

        blurNormal: 'blur(var(--unit-sm))',
        blurNormalBackgroundColor: 'var(--color-off-black)',
        blurNormalBackgroundOpacity: 0.5,

        // shadows

        boxShadowDefault: '0px var(--unit-sm) var(--unit-md) var(--blur-normal-background-color)',

        /*  TYPOGRAPHY  */

        // plain

        // font

        fontWeightLight: 100,
        fontWeightNormal: 400,
        fontWeightBold: 700,

        // size

        fontSizeInitial: '17px',
        fontScaleModifier: 'var(--space-scale-modifier)',

        // semantic

        fontBody: '"Roboto", sans-serif',
        fontWeightBody: 'var(--font-weight-normal)',
        

        fontHeading: 'var(--font-body)',
        fontWeightHeading: 'var(--font-weight-bold)',
        

        
        /* BORDERS */

        // abstract
            
        borderRadiusSmall: 'var(--unit-sm)',
        borderRadiusMedium: 'var(--unit-md)',
        borderRadiusLarge: 'var(--unit-lg)',

        // semantic






        /* SPACING */

        // cards

        cardWidth: 70,
        cardAspect: 1.5,
        
        // margins

        marginMainContainer: 'calc( var(--unit-md) * 2 )',

        /* Scrollbars */
        scrollbarTrackColor: 'rgba(0,0,0,0)',
        scrollbarThumbColor: 'var(--color-muted-blue)',
        scrollbarTrackWidth: 'var(--unit-xs)',
        scrollbarThumbOffset: 'var(--unit-3xs)',
        scrollbarThumbRoundness: 1,
        scrollbarThumbInset: 'var(--unit-3xs)',

        /* modal */
        textColorModal: 'var(--color-orange)',
        inputColorModal: 'var(--color-off-white)',
        borderColorModal: 'var(--color-orange)',
        backgroundColorModal: 'var(--blur-normal-background-color)',
        colorNeutralActionModal: 'var(--color-orange)',
        colorNeutralActionModalHover: 'var(--color-light-orange)',
        
        borderModal: 'var(--unit-3xs) solid var(--border-color-modal)',
        borderRadiusModal: 'var(--border-radius-large)',

    },
    presets: {

    }
})

const mutations = {
    /**
     * save store to file 
     */
    SAVE_FILE(state){
        themeStorage.store = state;
    },
    /**
     * load store from file
     */
    LOAD_FILE(state){
        if(themeStorage.store){
            for(const [key, value] of Object.entries(themeStorage.store)){
                Vue.set(state, key, value);
            }
        }
    },
    SET_FROM_OBJECT(state, {name, object}){
        name = presetPrefix + name;
        Logger.debug("Saving Object into preset:", name)
        Vue.set(state.presets, name, {...object});
        Vue.set(state, 'presets', {...state.presets})
    },
    /**
     * replace properties from object named savee with active object properties
     */
    SET_SAVEE(state, savee){
        savee = presetPrefix + savee;
        Logger.debug("Saving active Theme state to:", savee)
        if(!state.presets[savee]){
            state.presets[savee] = {}
        }
        for(const [key, value] of Object.entries(state.active)){
            Vue.set(state.presets[savee], key, value);
            
        }
        Vue.set(state, 'presets', {...state.presets})
    },
    /**
     * replace properties active theme object with change object properties
     */
    SET_ACTIVE(state, change){
        // change = presetPrefix + change;
        Logger.debug("Active Theme State changes:", change)
        for(const [key, value] of Object.entries(change)){
            Vue.set(state.active, key, value);
        }
    },
    SET_ACTIVE_THEME_NAME(state, name){
        Vue.set(state, 'activeThemeName', name);
    }
}

const actions = {
    /**
     * load state from file, create default if not exist 
     */
    initialize({commit, state}){
        const defaultState = state.active
        // Logger.debug("default state:", defaultState)
        commit('LOAD_FILE')
        if(!state.presets.default){
            commit('SET_FROM_OBJECT', {name: 'default', object: defaultState})
            commit('SET_ACTIVE_THEME_NAME', '_default')
            commit('SAVE_FILE')
        }
    },
    /**
     * update properties from object of properties
     */
    updateMany({commit}, changes){
        commit('SET_ACTIVE', changes)
    },
    /**
     * update single property from property / value pair
     */
    updateOne({commit}, {property, value} ){

        let changes = {}
        changes[property] = value;
        commit('SET_ACTIVE', changes)
    },
    /**
     * get saved theme object and replace active with it
     */
    setFromSaved({commit, state}, saved){ // pass name of saved theme object
        Logger.debug("Loading saved Theme:", saved)
        // saved = presetPrefix + saved;
        if(!state.presets[saved]){
            return
        }
        commit('SET_ACTIVE',state.presets[saved]);
        commit('SET_ACTIVE_THEME_NAME', saved)
        commit('SAVE_FILE')
    },
    /**
     * save active theme object to named theme object
     */
    saveFromActive({commit}, savee){ // pass name of theme object to save into
        commit('SET_SAVEE', savee);
        commit('SAVE_FILE');
    }
}

const getters = {
    getPresetList(state){
        let list = {}
        for(const key of Object.keys(state.presets)){
            let newKey = key
            while (newKey.charAt(0) === presetPrefix){
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


