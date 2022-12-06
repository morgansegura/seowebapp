import React, { Fragment } from 'react';
import Link from 'next/link';
import { isAuth, signout } from 'actions/auth';
import toast from 'react-hot-toast';
import { useRouter } from 'next/router';
// [Hooks]
// import useRole from '@hooks/useRole';
// [Styles]
import clsx from 'clsx';
import styles from '@styles/components/layout/Sidebar.module.scss';
// [Icons]
import {
    MdOutlineAutoStories,
    MdOutlineImage,
    MdOutlineShield,
    MdOutlineStore,
    MdSchool,
    MdWeb,
    MdEast,
} from 'react-icons/md';

import Button from '@components/inputs/Button';

type NavItem = {
    icon?: React.ReactNode;
    label?: string;
    href?: string;
};

type SidebarProps = {
    children?: React.ReactNode;
    open?: boolean;
    active?: string;
    nav?: NavItem[];
    setOpen?: Function;
};

export default function Sidebar({ open, setOpen }: SidebarProps) {
    // const { hasAccess } = useRole();

    const router = useRouter();

    const handleSignout = () => {
        signout(() => {
            toast.success('Signed out successfully');
            router.push('/signin');
        });
    };

    const navigation = [
        {
            icon: <MdOutlineAutoStories />,
            label: 'Blog',
            level: 'Subscriber',
            href: '/blog',
            active: false,
        },
        {
            icon: <MdOutlineImage />,
            label: 'Media',
            level: 'Author',
            href: '/admin/media',
            active: false,
        },
        {
            icon: <MdWeb />,
            label: 'Website',
            level: 'Editor',
            href: '/admin/website',
            active: false,
        },
        {
            icon: <MdSchool />,
            label: 'Courses',
            level: 'Editor',
            href: '/admin/courses',
            active: false,
        },
        {
            icon: <MdOutlineStore />,
            label: 'Store',
            level: 'Editor',
            href: '/admin/store',
            active: false,
        },
        {
            icon: <MdOutlineShield />,
            label: 'Users',
            level: 'Admin',
            href: '/admin/users',
            active: false,
        },
    ];

    return (
        <>
            <div className={clsx(styles.sidebar)}>
                <div className={styles.sidebarInner}>
                    <div className={styles.sidebarNav}>
                        {navigation?.map((item: any) => (
                            <Fragment key={item.label}>
                                {isAuth() && item?.level === 'Admin' ? (
                                    <Link
                                        href={item?.href}
                                        className={styles.item}
                                    >
                                        {item?.icon && (
                                            <div className={styles.icon}>
                                                {item?.icon}
                                            </div>
                                        )}
                                        <div className={styles.label}>
                                            {item?.label}
                                        </div>
                                    </Link>
                                ) : (
                                    <Link
                                        href={item?.href}
                                        className={styles.item}
                                    >
                                        {item?.icon && (
                                            <div className={styles.icon}>
                                                {item?.icon}
                                            </div>
                                        )}
                                        <div className={styles.label}>
                                            {item?.label}
                                        </div>
                                    </Link>
                                )}
                            </Fragment>
                        ))}

                        {isAuth() === false ? (
                            <>
                                <Button
                                    href="/register"
                                    style="action-button"
                                    label="Register"
                                />
                                <Button
                                    href="/signin"
                                    style="action-button"
                                    label="Signin"
                                />
                            </>
                        ) : (
                            <Button
                                onClick={handleSignout}
                                style="action-button"
                                label="Signout"
                            />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
