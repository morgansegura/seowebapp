import type { AppProps } from 'next/app';
import { Toaster } from 'react-hot-toast';
import NProgress from 'nprogress';
import Router from 'next/router';

// [Styles]
import '@styles/config/normalize.scss';
import '@styles/globals.scss';
import '@styles/vendors/nprogress.scss';

Router.events.on('routeChangeStart', (url) => NProgress.start());
Router.events.on('routeChangeComplete', (url) => NProgress.done());
Router.events.on('routeChangeError', (url) => NProgress.done());

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <>
            <Component {...pageProps} />
            <Toaster position="bottom-center" />
        </>
    );
}
