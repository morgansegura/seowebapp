import { seo } from '@utils/seo';
// [Components]
import Layout from '@components/layout/Layout';
import Private from '@components/layout/Private';

// [Styles]
// import styles from '@styles/pages/HomeScreen.module.css';

export default function UserScreen() {
    const { title, description } = seo.userScreen;

    return (
        <Layout title={title} description={description}>
            <Private>
                <div className="contain-xxl">
                    <h1>User Dashboard</h1>
                </div>
            </Private>
        </Layout>
    );
}
