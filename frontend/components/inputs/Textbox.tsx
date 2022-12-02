import React, { useRef, useState, useContext } from 'react';

// [Styles]
import styles from '@styles/components/inputs/Textbox.module.scss';
import clsx from 'clsx';

type TextBoxProps = {
    className?: string;
    errors?: string;
    getValues?: any;
    setValues?: any;
    id?: any;
    name: string;
    placeholder?: string;
    [x: string]: any;
};

export function Textbox({
    className,
    id,
    getValues,
    name,
    placeholder,
    setValues,
}: TextBoxProps) {
    const [focus, setFocus] = useState(false);
    const [dirty, setDirty] = useState(false);
    const inputRef = useRef(null);

    const handleValues = (e: any) => {
        if (e.currentTarget?.textContent) {
            setDirty(true);
            setValues({ ...getValues, [name]: e.currentTarget?.textContent });
        }
    };

    const handleSetFocus = () => {
        setFocus(true);
    };

    const handleSetBlur = () => {
        setFocus(false);
        setDirty(false);
    };

    return (
        <div
            id={id}
            ref={inputRef}
            className={clsx(
                styles[`text-box`],
                focus
                    ? styles[`textbox--is-focussed`]
                    : styles[`textbox--is-blurred`],
                className
            )}
            role="textbox"
            contentEditable
            suppressContentEditableWarning
            onInput={(e: any) => handleValues(e)}
            onFocus={handleSetFocus}
            onBlur={handleSetBlur}
        >
            {placeholder}
        </div>
    );
}
