import React, { useEffect, useState, useRef, forwardRef } from 'react';

// [Styles]
import styles from '@styles/components/inputs/TextInput.module.scss';
import fs from '@styles/components/layout/Form.module.scss';
import clsx from 'clsx';

type TextInputProps = {
    className?: string;
    watch?: any;
    disabled?: boolean;
    errors?: any;
    icon?: React.ReactNode;
    iconLocation?: string;
    message?: string;
    id?: string;
    label?: React.ReactNode;
    name?: string;
    onChange?: Function;
    placeholder?: React.ReactNode;
    register?: any;
    required?: boolean;
    autoFocus?: boolean;
    type?: string;
    value?: any;
};

type HandleInputStateProps = {
    focus: boolean;
    blur: boolean;
};

const TextInput = (
    {
        className,
        disabled = false,
        watch,
        errors,
        icon,
        iconLocation,
        id,
        label,
        name,
        onChange,
        placeholder,
        register,
        message,
        autoFocus = false,
        required = false,
        type,
    }: TextInputProps,
    ref: React.RefObject<any>
) => {
    const [inputState, setInputState] = useState({
        focus: false,
        blur: true,
    });
    const stateRef = useRef(null);

    const handleInputState = ({ focus, blur }: HandleInputStateProps) => {
        if (focus) setInputState({ focus, blur });

        if (blur) setInputState({ focus, blur });

        if (watch && watch(`${name}`) && watch(`${name}`).length > 0)
            setInputState({ focus: true, blur: false });
    };

    const keyPressBlur = () => {
        if (watch && watch(`${name}`) && watch(`${name}`).length > 0) {
            setInputState({ focus: true, blur: false });
        } else {
            setInputState({
                focus: false,
                blur: true,
            });
        }
    };

    const checkState = async () => {
        if (watch && watch(`${name}`) && watch(`${name}`).length > 0) {
            setInputState({ focus: true, blur: false });
        }
    };

    const classList = `${label ? `${styles['input-with-label']} ` : ``}${
        icon ? `${styles['input-with-icon']} ` : ``
    }${
        iconLocation
            ? iconLocation === 'right'
                ? `${styles['input-with-icon-right']} `
                : `${styles['input-with-icon-left']} `
            : ``
    }${inputState.focus ? `${styles['input-change-focus']} ` : ``}${
        inputState.blur ? `${styles['input-change-blur']} ` : ``
    }${className}`;

    useEffect(() => {
        (async () => {
            checkState();
        })();
        const close = (e: any) => {
            if (e.keyCode === 27) {
                keyPressBlur();
            }
        };
        window.addEventListener('keydown', close);
        return () => window.removeEventListener('keydown', close);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [watch]);

    return (
        <div className={classList} ref={ref}>
            {label && (
                <label htmlFor={id} className={styles.label}>
                    {label}
                </label>
            )}
            <div
                className={clsx(
                    type === 'textarea' ? styles.textarea : styles['text-input']
                )}
            >
                {icon && <div className={styles.icon}>{icon}</div>}

                {placeholder && (
                    <div className={styles.placeholder}>{placeholder}</div>
                )}

                {type === 'textarea' ? (
                    <textarea
                        id={id}
                        ref={stateRef}
                        name={name}
                        disabled={disabled}
                        required={required}
                        onChange={onChange}
                        autoFocus={autoFocus}
                        {...register}
                        onFocus={() =>
                            handleInputState({ focus: true, blur: false })
                        }
                        onBlur={() =>
                            handleInputState({ focus: false, blur: true })
                        }
                    />
                ) : (
                    <input
                        id={id}
                        ref={stateRef}
                        type={type}
                        name={name}
                        disabled={disabled}
                        required={required}
                        onChange={onChange}
                        autoFocus={autoFocus}
                        {...register}
                        onFocus={() =>
                            handleInputState({ focus: true, blur: false })
                        }
                        onBlur={() =>
                            handleInputState({ focus: false, blur: true })
                        }
                    />
                )}
            </div>
            <span className={styles.message}>{message}</span>
            {errors && <div className={styles.error}>{errors}</div>}
        </div>
    );
};

export default forwardRef(TextInput);
