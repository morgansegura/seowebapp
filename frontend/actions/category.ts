import fetch from 'isomorphic-fetch';

export const create = async (category: any, token: any) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/category`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(category),
        });
        console.log(res);
        return await res.json();
    } catch (err) {
        return console.log(err);
    }
};

export const getCategories = async () => {
    try {
        const res = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/categories`,
            {
                method: 'GET',
            }
        );

        return await res.json();
    } catch (err) {
        return console.log(err);
    }
};

export const singleCategory = async (slug: any) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/category/${slug}`,
            {
                method: 'GET',
            }
        );
        return await response.json();
    } catch (err) {
        console.log(err);
    }
};

export const removeCategory = async (slug: any, token: any) => {
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/category/${slug}`,
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
