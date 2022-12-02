type StorageType = 'session' | 'local'
type UseStorageReturnValue = {
    getStorage: (key: string, type?: StorageType) => string
    setStorage: (key: string, value: string, type?: StorageType) => boolean
    removeStorage: (key: string, type?: StorageType) => void
}

const useStorage = (): UseStorageReturnValue => {
    const storageType = (type?: StorageType): 'localStorage' | 'sessionStorage' =>
        `${type ?? 'session'}Storage`

    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')()

    const getStorage = (key: string, type?: StorageType): string => {
        return isBrowser ? window[storageType(type)][key] : ''
    }

    const setStorage = (key: string, value: string, type?: StorageType): boolean => {
        if (isBrowser) {
            window[storageType(type)].setItem(key, value)
            return true
        }

        return false
    }

    const removeStorage = (key: string, type?: StorageType): void => {
        if (isBrowser) {
            window[storageType(type)].removeItem(key)
        }
    }

    return {
        getStorage,
        setStorage,
        removeStorage,
    }
}

export default useStorage
