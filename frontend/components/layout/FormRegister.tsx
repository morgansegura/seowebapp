import React, { useState } from 'react';
import { registration } from 'actions/auth';
import toast from 'react-hot-toast';
import { useForm } from 'react-hook-form';
// [Components]
import Button from '@components/inputs/Button';
import TextInput from '@components/inputs/TextInput';

// [Styles]
import styles from '@styles/components/layout/Form.module.scss';
import clsx from 'clsx';
import { useRouter } from 'next/router';

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
            const result = await registration({
                firstName,
                lastName,
                email,
                password,
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success('Successfully registered');
                router.push('/signin');
            }
        } catch (err) {
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
                <div className={clsx(styles['field-group'], styles['cols-2'])}>
                    <TextInput
                        className={clsx(styles.input, styles['input-required'])}
                        id="firstName"
                        name="firstName"
                        type="text"
                        placeholder="First Name"
                        watch={watch}
                        register={{
                            ...register('firstName'),
                        }}
                        errors={errors?.firstName?.message}
                    />
                    <TextInput
                        className={clsx(styles.input, styles.inputOutline)}
                        id="lastName"
                        name="lastName"
                        type="text"
                        placeholder="Last Name"
                        watch={watch}
                        register={{
                            ...register('lastName'),
                        }}
                        errors={errors?.lastName?.message}
                    />
                </div>

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
                        ...register('password', {
                            required: 'Please enter a password.',
                            minLength: {
                                value: 6,
                                message:
                                    'Password must be longer than 6 characters',
                            },
                        }),
                    }}
                    errors={errors?.password?.message}
                />

                <Button style="auth-submit" label="Submit" />
            </div>
        </form>
    );
}
