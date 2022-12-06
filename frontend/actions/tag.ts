import fetch from 'isomorphic-fetch';

export const create = async (tag: any, token: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tag`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(tag),
        });
        console.log(res);
        return await res.json();
    } catch (err) {
        return console.log(err);
    }
};

export const getTags = async () => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/tags`, {
            method: 'GET',
        });

        return await res.json();
    } catch (err) {
        return console.log(err);
    }
};

export const singleTag = async (slug: any) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/tag/${slug}`,
            {
                method: 'GET',
            }
        );
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};

export const removeTag = async (slug: any, token: any) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/tag/${slug}`,
            {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
            }
        );
        return await response.json();
    } catch (err) {
        return console.log(err);
    }
};
