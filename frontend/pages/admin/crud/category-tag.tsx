import React from 'react';

// [Components]
import Category from '@components/crud/Category';
import Tag from '@components/crud/Tag';
import Layout from '@components/layout/Layout';

// [Styles]
import styles from '@styles/pages/crud/CategoryTag.module.scss';

type Props = {};

export default function CategoryTagScreen({}: Props) {
    return (
        <Layout title="" description="">
            <div className="contain-xxl">
                <div className={styles.blocks}>
                    <Category
                        title="Categories"
                        subtitle="Categories subtitle"
                        copy="You should always have the option for copy"
                    />
                    <Tag
                        title="Tags"
                        subtitle="Tag subtitle"
                        copy="You should always have the option for copy"
                    />
                </div>
            </div>
        </Layout>
    );
}
