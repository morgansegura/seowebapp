import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import { create, getCategories, removeCategory } from '@actions/category';
import { useForm } from 'react-hook-form';

// [Components]
import TextInput from '@components/inputs/TextInput';
import Button from '@components/inputs/Button';
import useStorage from '@hooks/useStorage';

// [Styles]
import styles from '@styles/components/inputs/Category.module.scss';

// [Icons]
import { TiDeleteOutline } from 'react-icons/ti';
import clsx from 'clsx';

// [TS]
type CategoryProps = {
    className?: string;
    copy?: string;
    title?: string;
    subtitle?: string;
};
type ValuesProps = {
    name?: String;
    error?: boolean;
    success?: boolean;
    categories?: any;
    removed?: boolean;
    reload?: boolean;
};

export default function Category({
    className,
    copy,
    title,
    subtitle,
}: CategoryProps) {
    const [values, setValues] = useState<ValuesProps>({
        name: '',
        error: false,
        success: false,
        categories: [],
        removed: false,
        reload: false,
    });

    const { name, error, success, categories, removed, reload } = values;

    const { getCookie } = useStorage();
    const token = getCookie(`token`);
    const router = useRouter();

    useEffect(() => {
        loadCategories();
    }, [reload]);

    const loadCategories = () => {
        getCategories().then((data: any) => {
            if (data?.error) {
                console.log(data.error);
            } else {
                setValues({ ...values, categories: data });
            }
        });
    };

    const showCategories = () =>
        categories?.map(
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
                        title={`Delete ${c.name} category`}
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
            'Are you sure you want to delete this category?'
        );
        if (answer) {
            deleteCategory(slug);
        }
    };

    const deleteCategory = (slug: any) => {
        // console.log('delete', slug);
        removeCategory(slug, token).then((data) => {
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
                    '11000 duplicate key error collection: seowebapp.categories index: slug already exists'
                ) {
                    toast.error(`Category ${name} already exists`);
                } else {
                    toast.error(result?.error);
                    setValues({
                        ...values,
                        error: result?.error,
                        success: false,
                    });
                }
                // console.log(result);
            } else {
                setValues({
                    ...values,
                    categories: [...values.categories, result],
                    success: true,
                });
                reset({ name: '' });
                toast.success('Category successfully created');
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
                    placeholder={'Category name'}
                    watch={watch}
                    register={{ ...register('name') }}
                />
                <br />
                <Button style="action-button" label="Create Category" />
                <br />
            </form>
            <br />
            <div className={styles['list']}>{showCategories()}</div>
        </div>
    );
}
