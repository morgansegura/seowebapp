import React, {
    createContext,
    useContext,
    useEffect,
    useRef,
    useState,
} from 'react';
import clsx from 'clsx';
// [Components]
import Backdrop from '@components/utils/Backdrop';
// [Styles]
import styles from '@styles/components/navigation/Drawer.module.scss';
// [Icons]
import { MdOutlineClose } from 'react-icons/md';

type DrawerTriggerProps = {
    children?: React.ReactNode;
    className?: string;
};

export const DrawerContext = createContext<any | null>(null);

export function DrawerProvider({ children }: DrawerTriggerProps) {
    const [open, setOpen] = useState(false);

    return (
        <DrawerContext.Provider value={[open, setOpen]}>
            {children}
        </DrawerContext.Provider>
    );
}

export function DrawerTrigger({ className, children }: DrawerTriggerProps) {
    const triggerRef = useRef<HTMLDivElement>(null);
    const [open, setOpen] = useContext(DrawerContext);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    useEffect(() => {
        const keyPressBlur = () => {
            setOpen(false);
        };
        const close = (e: any) => {
            if (e.keyCode === 27) {
                keyPressBlur();
            }
        };
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
    }, [setOpen]);

    return (
        <div
            ref={triggerRef}
            onClick={toggleDrawer}
            className={clsx(styles[`drawer-trigger`], className)}
        >
            {children}
        </div>
    );
}

type DrawerProps = {
    accessories?: string;
    anchor?: string;
    children?: React.ReactNode;
    className?: string;
    copy?: string;
    icon?: React.ReactNode;
    forceClose?: boolean;
    theme?: string;
    title?: string;
};

export default function Drawer({
    accessories,
    anchor,
    children,
    className,
    copy,
    icon,
    theme,
    title,
    forceClose = false,
}: DrawerProps) {
    const [open, setOpen] = useContext(DrawerContext);

    useEffect(() => {
        if (forceClose === true) {
            setOpen(false);
        }
    }, [forceClose, setOpen]);

    return (
        <div
            className={clsx(
                styles[`drawer`],
                className,
                open
                    ? styles[`drawer--is-visible`]
                    : styles[`drawer--is-hidden`],
                theme === 'dark' ? styles[`theme-dark`] : styles[`theme-light`],
                accessories === 'dark'
                    ? styles[`accessories-dark`]
                    : styles[`accessories-light`],
                anchor === 'top'
                    ? styles[`drawer-top`]
                    : anchor === 'right'
                    ? styles[`drawer-right`]
                    : anchor === 'bottom'
                    ? styles[`drawer-bottom`]
                    : styles[`drawer-left`]
            )}
        >
            <Backdrop
                onClick={() => setOpen(false)}
                className={clsx(
                    styles[`backdrop`],
                    open
                        ? styles[`backdrop--is-visible`]
                        : styles[`backdrop--is-hidden`]
                )}
                theme={theme}
            />
            <div className={styles[`drawer-container`]}>
                {title && (
                    <header className={styles[`drawer-header`]}>
                        {title && (
                            <div className={styles[`drawer-title`]}>
                                {title}
                            </div>
                        )}
                        {copy && (
                            <div className={styles[`drawer-copy`]}>{copy}</div>
                        )}
                    </header>
                )}
                <div className={styles[`drawer-content`]}>{children}</div>
                <div
                    onClick={() => setOpen(false)}
                    className={styles[`drawer-close`]}
                >
                    {icon ? icon : <MdOutlineClose />}
                </div>
            </div>
        </div>
    );
}
