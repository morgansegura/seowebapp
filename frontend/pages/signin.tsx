import { seo } from '@utils/seo';
// [Components]
import Layout from '@components/layout/Layout';
import FormSignin from '@components/layout/FormSignin';
// [Styles]
import styles from '@styles/pages/HomeScreen.module.css';

type SigninProps = {};

export default function SigninScreen({}: SigninProps) {
    const { title, description } = seo.registerScreen;
    return (
        <Layout title={title} description={description}>
            <div className="contain-xxl">
                <FormSignin
                    className="contain-sm"
                    title="Signin to your account"
                />
            </div>
        </Layout>
    );
}
