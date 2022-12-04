import React, { useState } from 'react';
import { signin, authenticate } from 'actions/auth';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { isAuth } from 'actions/auth';

// [Components]
import Button from '@components/inputs/Button';
import TextInput from '@components/inputs/TextInput';

// [Styles]
import styles from '@styles/components/layout/Form.module.scss';
import clsx from 'clsx';

type FormProps = {
    active?: string;
    copy?: string;
    className?: string;
    children?: React.ReactNode;
    contentWidth?: string;
    description?: string;
    error?: boolean;
    loading?: boolean;
    title?: string;
    subtitle?: string;
};

type RegisterProps = {
    firstName: string;
    lastName?: string;
    email: string;
    password: string;
    error?: string | boolean;
    loading: boolean;
    message?: string;
    showForm?: boolean;
};

export default function FormRegister({
    className,
    copy,
    title,
    subtitle,
}: FormProps) {
    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        error: '',
        loading: false,
        message: '',
        showForm: true,
    });

    const router = useRouter();

    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm<RegisterProps>();

    const submitHandler = async ({
        firstName,
        lastName,
        email,
        password,
    }: RegisterProps) => {
        try {
            const result = await signin({
                email,
                password,
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                authenticate(result, () => {
                    toast.success('Signin successful');

                    if (isAuth() && isAuth().role === 1) {
                        router.push('/admin');
                    } else {
                        router.push('/user');
                    }
                });
            }
        } catch (err) {
            // toast.error(getError(err));
            toast.error(err);
        }
    };

    return (
        <form
            className={clsx(styles.form, className)}
            onSubmit={handleSubmit(submitHandler)}
        >
            {title || subtitle || copy ? (
                <header className={styles.header}>
                    {title && <h3 className={styles.title}>{title}</h3>}
                    {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
                    {copy && <p className={styles.copy}>{copy}</p>}
                </header>
            ) : (
                ''
            )}
            <div className={styles['form-content']}>
                <TextInput
                    className={clsx(styles.input, styles.inputOutline)}
                    id="email"
                    name="email"
                    type="email"
                    placeholder="Enter Your Email"
                    watch={watch}
                    register={{
                        ...register('email', {
                            required: 'Please enter an email.',
                            pattern: {
                                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$/i,
                                message: 'Please enter a valid email.',
                            },
                        }),
                    }}
                    errors={errors?.email?.message}
                />
                <TextInput
                    className={clsx(styles.input, styles.inputOutline)}
                    id="password"
                    name="password"
                    type="password"
                    placeholder="Enter a Password"
                    watch={watch}
                    register={{
                        ...register('password'),
                    }}
                    errors={errors?.password?.message}
                />

                <Button style="auth-submit" label="Submit" />
            </div>
        </form>
    );
}
