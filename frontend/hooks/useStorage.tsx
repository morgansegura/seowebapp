import Cookies from 'js-cookie';

type StorageType = 'session' | 'local';
type UseStorageReturnValue = {
    getStorage: (key: string, type?: StorageType) => string;
    setStorage: (key: string, value: string, type?: StorageType) => boolean;
    removeStorage: (key: string, type?: StorageType) => void;
    getCookie: (key: string) => any;
    setCookie: (key: string, value: any) => void;
    removeCookie: (key: string) => void;
};

const useStorage = (): UseStorageReturnValue => {
    const storageType = (
        type?: StorageType
    ): 'localStorage' | 'sessionStorage' => `${type ?? 'local'}Storage`;

    const isBrowser: boolean = ((): boolean => typeof window !== 'undefined')();

    const getStorage = (key: string, type?: StorageType): string => {
        return isBrowser ? window[storageType(type)][key] : '';
    };

    const setStorage = (
        key: string,
        value: string,
        type?: StorageType
    ): boolean => {
        if (isBrowser) {
            window[storageType(type)].setItem(key, JSON.stringify(value));
            return true;
        }

        return false;
    };

    const removeStorage = (key: string, type?: StorageType): void => {
        if (isBrowser) {
            window[storageType(type)].removeItem(key);
        }
    };

    const setCookie = (key: string, value: any): any => {
        if (isBrowser) {
            return Cookies.set(key, value, {
                expires: 1,
            });
        }
    };

    const removeCookie = (key: any): void => {
        if (isBrowser) {
            return Cookies.remove(key);
        }
    };

    const getCookie = (key: any): any => {
        if (isBrowser) {
            return Cookies.get(key);
        }
    };

    return {
        getCookie,
        setCookie,
        removeCookie,
        getStorage,
        setStorage,
        removeStorage,
    };
};

export default useStorage;
