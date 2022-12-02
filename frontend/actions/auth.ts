import fetch from 'isomorphic-fetch';
import Cookies from 'js-cookie';

export const registration = async (user: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/register`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        return await res.json();
    } catch (err) {
        return console.log(err);
    }
};

export const signin = async (user: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/signin`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(user),
        });
        return await res.json();
    } catch (err) {
        return console.log(err);
    }
};

export const signout = async (next: Function) => {
    removeCookie('token');
    removeLocalStorage('user');
    next();

    try {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/signout`, {
            method: 'GET',
        });
        console.log('Signout successful');
    } catch (err) {
        return console.log(err);
    }
};

export const setCookie = (key: string, value: any) => {
    if (typeof window !== 'undefined') {
        return Cookies.set(key, value, {
            expires: 1,
        });
    }
};

export const removeCookie = (key: string) => {
    if (typeof window !== 'undefined') {
        return Cookies.remove(key);
    }
};

export const getCookie = (key: string) => {
    if (typeof window !== 'undefined') {
        return Cookies.get(key);
    }
};

export const setLocalStorage = (key: string, value: any) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const removeLocalStorage = (key: string) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem(key);
    }
};

export const authenticate = (data: any, next: Function) => {
    setCookie('token', data.token);
    setLocalStorage('user', data.user);
    next();
};

export const isAuth = () => {
    if (typeof window !== 'undefined') {
        const cookieChecked: any = getCookie('token');

        if (cookieChecked) {
            if (localStorage.getItem('user')) {
                return JSON.parse(localStorage.getItem('user'));
            } else {
                return false;
            }
        }
    }
};
