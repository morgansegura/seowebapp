import React from 'react';
import Link from 'next/link';
import { clsx } from 'clsx';
// [Styles]
import styles from '@styles/components/inputs/Button.module.scss';

type ButtonProps = {
    as?: any;
    className?: string;
    disabled?: boolean;
    href?: string;
    icon?: React.ReactNode;
    label?: React.ReactNode;
    onClick?: React.SyntheticEvent | Function;
    style?: string;
    title?: string;
    type?: string;
};

export default function Button({
    as: Tag = 'button',
    className,
    disabled = false,
    href,
    icon,
    label,
    onClick,
    style,
    title,
    type,
}: ButtonProps) {
    return <>
        {href ? (
            <Tag type={type}>
                <Link
                    href={href}
                    data-title={title}
                    className={clsx(
                        styles.button,
                        className && className,
                        disabled && styles.disabled,
                        style && styles[style]
                    )}>

                    {icon && icon}
                    {label && label}

                </Link>
            </Tag>
        ) : (
            <Tag
                className={clsx(
                    styles.button,
                    className && className,
                    disabled && styles.disabled,
                    style && styles[style]
                )}
                data-title={title}
                onClick={onClick}
                type={type}
            >
                {icon && icon}
                {label && label}
            </Tag>
        )}
    </>;
}
