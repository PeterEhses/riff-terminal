import isElectronFunct from 'is-electron';
import Logger from 'js-logger';


const isElectron = isElectronFunct()
    // if env is electron we can use nativ file interaction through fs (graceful-fs for error handling)
    // else wen need to use some web-native persistent storage (TODO)
let StorageInterface = undefined

if (isElectron) { 
    Logger.info("Enviromnemt is Electron")
    const Store = require('electron-store');

    StorageInterface = new Store();
    StorageInterface.getNamedStore = (name, location) => {
        return new Store({name: name, cwd: location})
    }
    // Logger.debug(StorageInterface);
} else {
    Logger.warn("Enviromnemt is not Electron. No Storage Interface implemented")
    // if this ever gets written, follow syntax of https://github.com/sindresorhus/electron-store#initrenderer to be compatible
    // also make sure that getNamedStore returns a new of the same store with unique storage
    StorageInterface = {
        set(){
            return true
        },
        get(){
            return undefined
        },
        detele(){
            return true
        },
        getNamedStore(){
            return this
        }
    }
}

StorageInterface.isElectron = isElectron
export default StorageInterface