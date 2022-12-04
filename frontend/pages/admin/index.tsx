import { seo } from '@utils/seo';
// [Components]
import Layout from '@components/layout/Layout';
import Admin from '@components/layout/Admin';

// [Styles]
// import styles from '@styles/pages/HomeScreen.module.css';

export default function AdminScreen() {
    const { title, description } = seo.adminScreen;

    return (
        <Layout title={title} description={description}>
            <Admin>
                <div className="contain-xxl">
                    <h1>Admin Dashboard</h1>
                </div>
            </Admin>
        </Layout>
    );
}
