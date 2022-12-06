import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { create, getTags, removeTag } from '@actions/tag';
import { useForm } from 'react-hook-form';

// [Components]
import TextInput from '@components/inputs/TextInput';
import Button from '@components/inputs/Button';
import useStorage from '@hooks/useStorage';

// [Styles]
import styles from '@styles/components/inputs/Tag.module.scss';

// [Icons]
import { TiDeleteOutline } from 'react-icons/ti';
import clsx from 'clsx';

// [TS]
type TagProps = {
    className?: string;
    copy?: string;
    title?: string;
    subtitle?: string;
};
type ValuesProps = {
    name?: String;
    error?: boolean;
    success?: boolean;
    tags?: any;
    removed?: boolean;
    reload?: boolean;
};

export default function Tag({ className, copy, title, subtitle }: TagProps) {
    const [values, setValues] = useState<ValuesProps>({
        name: '',
        error: false,
        success: false,
        tags: [],
        removed: false,
        reload: false,
    });

    const { name, error, success, tags, removed, reload } = values;

    const { getCookie } = useStorage();
    const token = getCookie(`token`);
    const router = useRouter();

    useEffect(() => {
        loadTags();
    }, [reload]);

    const loadTags = () => {
        getTags().then((data: any) => {
            if (data?.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, tags: data });
            }
        });
    };

    const showtags = () =>
        tags?.map(
            (
                c: {
                    slug: any;
                    name:
                        | boolean
                        | React.ReactChild
                        | React.ReactFragment
                        | React.ReactPortal;
                },
                i: React.Key
            ) => {
                return (
                    <Button
                        onClick={() => deleteConfirm(c.slug)}
                        title={`Delete ${c.name} tag`}
                        style="pill-with-icon-right"
                        key={i}
                        label={c.name}
                        icon={<TiDeleteOutline />}
                    />
                );
            }
        );

    const deleteConfirm = (slug: any) => {
        let answer = window.confirm(
            'Are you sure you want to delete this tags?'
        );
        if (answer) {
            deleteTag(slug);
        }
    };

    const deleteTag = (slug: any) => {
        // console.log('delete', slug);
        removeTag(slug, token).then((data) => {
            if (data.error) {
                console.log(data.error);
            } else {
                setValues({
                    ...values,
                    error: false,
                    success: false,
                    name: '',
                    removed: !removed,
                    reload: !reload,
                });
            }
        });
    };

    const {
        handleSubmit,
        register,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const submitHandler = async ({ name }) => {
        try {
            const result = await create({ name }, token);

            if (result?.error) {
                if (
                    result?.error ===
                    '11000 duplicate key error collection: seowebapp.tags index: slug already exists'
                ) {
                    toast.error(`Tag ${name} already exists`);
                } else {
                    setValues({
                        ...values,
                        error: result?.error,
                        success: false,
                    });
                    toast.error(result?.error);
                }
                // console.log(result);
            } else {
                setValues({
                    ...values,
                    tags: [...values.tags, result],
                    success: true,
                });
                reset({ name: '' });
                toast.success('Tag successfully created');
                // router.push('/signin');
            }
        } catch (err) {
            // console.log(err);
            toast.error(err);
        }
    };

    return (
        <div className={clsx(styles.container, className)}>
            {title || subtitle || copy ? (
                <header className={styles.header}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    {copy && <p className={styles.copy}>{copy}</p>}
                </header>
            ) : (
                ''
            )}
            <form
                className={styles.form}
                onSubmit={handleSubmit(submitHandler)}
            >
                <TextInput
                    id="name"
                    name="name"
                    type="text"
                    placeholder={'Tag Name'}
                    watch={watch}
                    register={{ ...register('name') }}
                />
                <br />
                <Button style="action-button" label="Create Tag" />
                <br />
            </form>
            <br />
            <div className={styles['list']}>{showtags()}</div>
        </div>
    );
}
