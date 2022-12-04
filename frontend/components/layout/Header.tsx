import React from 'react';
import Link from 'next/link';
import { config } from '@utils/config';
import useScrollDirection from '@hooks/useScrollDetection';

// [Components]
import Button from '@components/inputs/Button';
import Drawer, {
    DrawerProvider,
    DrawerTrigger,
} from '@components/navigation/Drawer';
import Sidebar from '@components/layout/Sidebar';

// [Styles]
import styles from '@styles/components/layout/Header.module.scss';
import { clsx } from 'clsx';

// [Icons]
import { MdOutlineDragHandle, MdOutlineMenu, MdEast } from 'react-icons/md';
import Logo from '@components/layout/Logo';

const { brand } = config;

type NavItem = {
    icon?: React.ElementType;
    name?: string;
    href?: string;
};
type HeaderProps = {
    className?: React.ReactNode;
    navigation?: NavItem[];
    open?: boolean;
    active?: string;
    setOpen?: Function;
};

export default function Header({
    className,
    open,
    navigation,
    // active,
    setOpen,
}: HeaderProps) {
    const scrollDirection = useScrollDirection();

    return (
        <div
            className={clsx(
                styles.header,
                scrollDirection === 'down'
                    ? styles.animateStickyDown
                    : scrollDirection === 'up'
                    ? styles.animateStickyUp
                    : ``
            )}
        >
            <header className={clsx(styles.appbar, className)}>
                <div className={clsx(styles.logo)}>
                    <Link href="/" className={styles.logoLink}>
                        <Logo className={styles.icon} />
                        <h1 className={styles.label}>{brand.name}</h1>
                    </Link>
                </div>

                <nav className={styles.nav}>
                    {navigation?.map((item: NavItem) => (
                        <Link
                            href={item?.href}
                            key={item?.name}
                            className={styles.item}
                        >
                            <span className="sr-only">{item?.name}</span>
                        </Link>
                    ))}

                    <Link href="/" className={clsx(styles.item)}>
                        Link1
                    </Link>

                    <DrawerProvider>
                        <DrawerTrigger>
                            <Button
                                className={styles[`menu-selector`]}
                                onClick={setOpen}
                                icon={
                                    <>
                                        {open ? (
                                            <MdOutlineDragHandle aria-hidden="true" />
                                        ) : (
                                            <MdOutlineMenu aria-hidden="true" />
                                        )}
                                    </>
                                }
                            />
                        </DrawerTrigger>
                        <Drawer anchor="right" theme="light" icon={<MdEast />}>
                            <Sidebar />
                        </Drawer>
                    </DrawerProvider>
                </nav>
            </header>
        </div>
    );
}
