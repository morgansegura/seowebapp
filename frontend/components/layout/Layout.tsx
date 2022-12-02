import React, { useState } from 'react';

// [Components]
import HeadContent from '@components/layout/HeadContent';
import Header from '@components/layout/Header';
// import Sidebar from '@components/layout/Sidebar';

// [Styles]
import clsx from 'clsx';
import styles from '@styles/components/layout/Layout.module.scss';

type LayoutProps = {
    active?: string;
    className?: string;
    children?: React.ReactNode;
    contentWidth?: string;
    description: string;
    error?: boolean;
    loading?: boolean;
    title?: string;
};

export default function Layout({
    active,
    children,
    className,
    description,
    title,
}: LayoutProps) {
    return (
        <div className={styles.body}>
            {/* https://developers.google.com/search/docs/beginner/seo-starter-guide */}
            <HeadContent title={title} description={description} />
            <div className={clsx(styles.wrapper, className)}>
                <main className={clsx(styles.main)}>
                    <div className={clsx(styles.contain)}>
                        <Header active={active} />
                        <div className={clsx(styles.content)}>{children}</div>
                    </div>
                </main>
            </div>
        </div>
    );
}
