import React from 'react';
import Head from 'next/head';
import { config } from '@utils/config';

const { brand } = config;

type LayoutProps = {
    children?: React.ReactNode;
    description: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    title?: string;
    url?: string;
    path?: string;
    image?: string;
};

export default function Layout({
    children,
    description,
    image,
    title,
    path,
}: LayoutProps) {
    return (
        <>
            <Head>
                <title>{title}</title>
                <meta property="og:title" content={title} />
                <meta name="description" content={description} />
                <meta property="og:description" content={description} />
                <meta property="og:url" content={path} />
                <meta property="og:image" content={image} />
                <meta property="og:image:width" content="1200" />
                <meta property="og:image:height" content="675" />
                <meta property="og:locale" content="en" />
                <meta name="twitter:card" content="summary_large_image" />
                <link rel="icon" href="/favicon.ico" />
                {/* https://developers.google.com/search/docs/beginner/seo-starter-guide */}
                <meta property="og:site_name" content={brand.name} />
                <meta property="og:type" content="website" />
                <meta name="theme-color" content="#ffffff" />
                <meta charSet="utf-8" />
                <meta content="IE=Edge" httpEquiv="X-UA-Compatible" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                {/* <link
                    rel="manifest"
                    href="/_pwa/developers/manifest.json"
                    crossOrigin="use-credentials"
                ></link> */}
                <meta name="session_expiry" content="0" />

                {children}
            </Head>
        </>
    );
}
