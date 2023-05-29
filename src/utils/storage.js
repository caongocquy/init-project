'use strict'

import AsyncStorage from '@react-native-community/async-storage';


export default class Storage {
    static STORAGE_KEY = "_StorageKey_";

    static getString(key: string): string {
        return _get(key);
    }

    static getInt(key: string): number {
        return _get(key).then((value) => parseInt(value));
    }

    static getArrayInt(key: string): Array<number> {
        return _get(key).then((value) => {
            if (value == null) {
                return null;
            } else {
                return JSON.parse("[" + value + "]");
            }
        });
    }

    static getArrayString(key: string): Array<string> {
        return _get(key).then((value) => {
            if (value == null) {
                return null;
            } else {
                return value.split(",");
            }

        });
    }

    static getDictionary(key: string) {
        return _getMulti(key).then((value) => {

            if (!value) return null;
            return Object.keys(value).length == 0 ? null : value;
        });
    }

    static getArrayObject(key: string) {
        let length = _get(key).then((value) => parseInt(value));

        let res = [];
        for (let i = 0; i < length; i++) {
            let value = _getMulti(key + i);
            res.push(value);
        }
        return res;
    }

    static getDictionaryObject(key: string) {
        let listKeys = _get(key).then((value) => {
            if (value == null) {
                return null;
            } else {
                return value.split(",");
            }
        });
        let dictionary = {};
        for (let pairKey in listKeys) {
            dictionary[listKeys[pairKey]] = _getMulti(key + listKeys[pairKey]);
        }
        return Object.keys(dictionary).length == 0 ? null : dictionary;
    }

    static setInt(key: string, value: number) {
        return _set(key, value.toString()).then(() => value.toString());
    }

    static setString(key: string, value: string) {
        return _set(key, value).then(() => value);
    }

    static setArrayInt(key: string, value: Array<number>) {
        return _set(key, value.toString()).then(() => value);
    }

    static setArrayString(key: string, value: Array<string>) {
        return _set(key, value.toString()).then(() => value);
    }


    /**
     * [{},{}]
     */
    static setArrayObject(key: string, dictionary: Array<object>) {        
        _set(key, dictionary.length.toString());

        for (let index in dictionary) {
            _setMulti(key + index, dictionary[index]);
        }
        return dictionary;
    }

    /*
    {
        "" : "",
        "" : "",
    }
    Dictionary<string,string>
    */
    static setDictionary(key: string, dictionary: object) {
        return _setMulti(key, dictionary).then(() => dictionary);
    }

    /*
    {
        "" : {
            
        },
        
        "" : {
            
        }
    }
    Dictionary<string,Dictionary<string,string>>
    */
    static setDictionaryObject(key: string, dictionary: object) {
        try {
            let keys = [];
            for (var pairKey in dictionary) {
                _setMulti(key + pairKey, dictionary[pairKey]);
                keys.push(pairKey);
            }
            _set(key, keys.toString());
            return dictionary;
        } catch (error) {
            console.log("Storage error _setMultiObject : ", error);
            return null;
        }

        // return _setMultiObject(key, dictionary).then(() => dictionary);
    }

    static remove(key: string) {
        return _remove(key);
    }

    static removeDictionary(key: string) {
        return _removeMulti(key);
    }

    static clear() {
        try {
            return AsyncStorage.clear();
        } catch (error) {
            console.log("Storage error clear : " + error.message);
            return null;
        }
    }

    static getKeys() {
        try {
            return AsyncStorage.getAllKeys();
        } catch (error) {
            console.log("Storage error getKeys : " + error.message);
            return null;
        }
    }
}
function _get(key: string) {
    try {
        // console.log("Get : " + Storage.STORAGE_KEY + key);
        return AsyncStorage.getItem(Storage.STORAGE_KEY + key);
    } catch (error) {
        console.log("Storage error _get : " + error.message);
        return null;
    }
}

function _set(key: string, value) {
    try {
        if (!value) {
            return AsyncStorage.removeItem(Storage.STORAGE_KEY + key);
        } else {
            return AsyncStorage.setItem(Storage.STORAGE_KEY + key, value);
        }
    } catch (error) {
        console.log("Storage error _set : " + error.message);
        return null;
    }
}
/*
    Dictionary<stirng,string> a = new Dictionary<string,string>
    a.Add("k1","v1");
    a.Add("k2","v2");

    multiSet([['k1', 'val1'], ['k2', 'val2']], cb);

    _setMulti("key",{ k1 : "v1", k2 : "v2"})
    Dictionary<string,string>
*/

/**
 *
 * Dictionary<string,<string,string>>
    userAccounts = {
        fbid : {
            id : ,
            name : ,b 
        }
    }
    _setMulti2 ("userAccounts" , dictionary<string,<string,string>>)
 */
function _setMulti(key: string, dictionary: object) {
    try {
        var values = [];
        var keys = [];
        for (let pairKey in dictionary) {
            let value = (dictionary[pairKey] === undefined) ? "" : dictionary[pairKey].toString();
            values.push([Storage.STORAGE_KEY + key + pairKey, value]);
            keys.push(pairKey);
        }
        var mainKey = AsyncStorage.setItem(Storage.STORAGE_KEY + key, keys.toString());

        return AsyncStorage.multiSet(values);

        //Storage error _setMulti : Cannot read property 'toString' of null
        // remove old key - value
    } catch (error) {
        console.log("Storage error _setMulti : " + error.message);
        return null;
    }
}
/*
    multiGet(['k1', 'k2'], cb) -> cb([['k1', 'val1'], ['k2', 'val2']])

    _getMulti("key") => { k1 : "v1", k2 : "v2"}
*/
function _getMulti(key: string) {
    try {
        var mainKey = AsyncStorage.getItem(Storage.STORAGE_KEY + key);
        if (!mainKey) {
            throw new Error("Key is empty : " + key);
        }
        var keys = mainKey.split(",");
        var ks = []
        for (var k in keys) {
            ks.push(Storage.STORAGE_KEY + key + keys[k]);
        }
        var values = AsyncStorage.multiGet(ks);
        var dictionary = {}
        for (var pair in values) {
            if (values[pair][1]) {
                dictionary[values[pair][0].replace(Storage.STORAGE_KEY + key, "")] = values[pair][1].toString();
            }
        }
        return dictionary;
    } catch (error) {

        console.log("Storage error : " + error.message);
        return null;
    }
}

function _remove(key: string) {
    // remove one or multi
    try {
        return AsyncStorage.removeItem(Storage.STORAGE_KEY + key);
        // check main key have child key or not
    } catch (error) {
        console.log("Storage error _remove : " + error.message);
        return null;
    }
}

//
// multiRemove(keys: Array<string>, callback?: ?(errors: ?Array<Error>) => void)
//
function _removeMulti(key: string) {
    try {
        var mainKey = AsyncStorage.getItem(Storage.STORAGE_KEY + key);
        if (!mainKey) {
            throw new Error("Key is empty");
        }
        var keys = mainKey.split(",");
        var ks = []
        for (var k in keys) {
            ks.push(Storage.STORAGE_KEY + key + keys[k]);
        }
        AsyncStorage.multiRemove(ks);
        return AsyncStorage.removeItem(Storage.STORAGE_KEY + key);
    } catch (error) {
        console.log("Storage error : " + error.message);
        return null;
    }
}
