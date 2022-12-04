import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { isAuth } from '@actions/auth';

type AdminProps = {
    children: React.ReactNode;
};

export default function Admin({ children }: AdminProps) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!isAuth()) {
            Router.push('/signin');
        } else if (isAuth().role !== 1) {
            Router.push('/');
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <>
            {loading ? (
                <div className="">
                    <h1>Go Away!</h1>
                </div>
            ) : (
                children
            )}
        </>
    );
}
