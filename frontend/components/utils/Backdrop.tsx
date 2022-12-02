import React from 'react';
import clsx from 'clsx';
// [Styles]
import styles from '@styles/components/utils/Backdrop.module.scss';

type BackdropProps = {
    className?: string;
    onClick?: Function;
    theme?: string;
};

export default function Backdrop({ className, onClick, theme }: BackdropProps) {
    return (
        <div
            onClick={() => onClick()}
            className={clsx(
                styles.backdrop,
                theme ? styles[`backdrop-${theme}`] : styles[`backdrop-light`],
                className
            )}
        />
    );
}
