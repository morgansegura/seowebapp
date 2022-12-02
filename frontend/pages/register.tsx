import { seo } from '@utils/seo';
// [Components]
import Layout from '@components/layout/Layout';
import FormRegister from '@components/layout/FormRegister';
// [Styles]
import styles from '@styles/pages/HomeScreen.module.css';

type Props = {};

export default function RegisterScreen({}: Props) {
    const { title, description } = seo.registerScreen;
    return (
        <Layout title={title} description={description}>
            <div className="contain-xxl">
                <FormRegister
                    className="contain-sm"
                    title="Create an account"
                />
            </div>
        </Layout>
    );
}
