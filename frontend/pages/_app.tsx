import type { AppProps } from 'next/app';
import type { NextComponentType } from 'next';
import { SessionProvider, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { Toaster } from 'react-hot-toast';

// [Styles]
import '@styles/config/normalize.scss';
import '@styles/globals.scss';

type CustomAppProps = AppProps & {
    Component: NextComponentType & {
        auth?: {
            adminOnly: boolean;
            name: string;
            email: string;
            image: string;
            _id: string;
            isAuth: boolean;
            role: string;
        };
    };
};

export default function App({
    Component,
    pageProps: { session, ...pageProps },
}: AppProps) {
    return (
        <>
            {/* <SessionProvider session={session}>
                {Component?.auth ? (
                    <Auth
                        role={Component.auth.role}
                        adminOnly={Component.auth.adminOnly}
                    >
                        <Component {...pageProps} />
                    </Auth>
                ) : (
                    <Component {...pageProps} />
                )}
            </SessionProvider> */}
            <Component {...pageProps} />
            <Toaster position="bottom-center" />
        </>
    );
}

// type AuthProps = {
//     children?: React.ReactNode;
//     adminOnly?: boolean;
//     role: string;
// };

// function Auth({ children, adminOnly }: AuthProps) {
//     const router = useRouter();
//     const { status, data: session } = useSession({
//         required: true,
//         onUnauthenticated() {
//             router.push('/unauthorized?message=login required');
//         },
//     });
//     if (status === 'loading') {
//         return <div>...Loading</div>;
//     }

//     // [Auth Users]
//     if (adminOnly && !session?.user?.isAuth) {
//         router.push('/unauthorized?message=admin login required');
//     }

//     return <>{children}</>;
// }
