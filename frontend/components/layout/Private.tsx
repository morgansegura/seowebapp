import React, { useEffect, useState } from 'react';
import Router from 'next/router';
import { isAuth } from '@actions/auth';

type PrivateProps = {
    children: React.ReactNode;
};

export default function Private({ children }: PrivateProps) {
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        if (!isAuth()) {
            Router.push('/signin');
        } else {
            setLoading(false);
        }
    }, []);

    return <>{loading ? <h1>Go Away!</h1> : children}</>;
}
