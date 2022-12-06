import useStorage from '@hooks/useStorage';
import fetch from 'isomorphic-fetch';

const {
    removeStorage,
    setStorage,
    getStorage,
    getCookie,
    removeCookie,
    setCookie,
} = useStorage();

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
    removeStorage('user');
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

export const authenticate = (data: any, next: Function) => {
    setCookie('token', data.token);
    setStorage('user', data.user);
    next();
};

export const isAuth = () => {
    const cookieChecked: any = getCookie('token');

    if (cookieChecked) {
        if (getStorage('user')) {
            return JSON.parse(getStorage('user'));
        } else {
            return false;
        }
    }
};
