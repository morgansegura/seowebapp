import Document, {
    Html,
    Head,
    Main,
    NextScript,
    DocumentContext,
    DocumentInitialProps,
} from 'next/document';
import { renderGoogleFontString } from 'utils/helpers';
// import { resetServerContext } from 'react-beautiful-dnd';

type Props = {};

class MyDocument extends Document<Props> {
    static async getInitialProps(
        ctx: DocumentContext
    ): Promise<DocumentInitialProps> {
        const initialProps = await Document.getInitialProps(ctx);
        // resetServerContext();
        return { ...initialProps };
    }
    render() {
        return (
            <Html>
                <Head>{renderGoogleFontString()}</Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;
