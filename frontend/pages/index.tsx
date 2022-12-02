import { seo } from '@utils/seo';
// [Components]
import Layout from '@components/layout/Layout';
import Slider from '@components/inputs/Slider';
// [Styles]
import styles from '@styles/pages/HomeScreen.module.css';

export default function HomeScreen() {
    const { title, description } = seo.homeScreen;

    const options = {
        spaceBetween: 0,
        slidesPerView: 1,
    };
    const slides = [
        {
            slideId: 0,
            title: 'Slide 1',
            supertitle: 'Quick and Snazzy',
            copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum',
            src: 'https://pinata.qodeinteractive.com/wp-content/uploads/2016/11/h-grid-slide1-graphic.png',
            video: '',
            options: {
                style: {
                    background: `linear-gradient(135deg,rgb(74,234,220) 0%,rgb(151,120,209) 20%,rgb(207,42,186) 40%,rgb(238,44,130) 60%,rgb(251,105,98) 80%,rgb(254,248,76) 100%)`,
                },
                theme: 'dark',
                layout: '',
                width: 200,
                height: 200,
                // sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
            },
        },
        {
            slideId: 1,
            title: 'Slide 2',
            supertitle: 'Quick and Snazzy',
            copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum',
            src: 'https://pinata.qodeinteractive.com/wp-content/uploads/2016/11/h-grid-slide1-graphic.png',
            video: '',
            options: {
                style: {
                    background: `linear-gradient(135deg,rgb(202,248,128) 0%,rgb(113,206,126) 100%)`,
                },
                theme: 'light',
                layout: '',
                width: 100,
                height: 100,
                // sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
            },
        },
        {
            slideId: 2,
            title: 'Slide 3',
            supertitle: 'Quick and Snazzy',
            copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum',
            src: 'https://pinata.qodeinteractive.com/wp-content/uploads/2016/11/h-grid-slide1-graphic.png',
            video: '',
            options: {
                style: {
                    background: `linear-gradient(135deg,rgb(255,203,112) 0%,rgb(199,81,192) 50%,rgb(65,88,208) 100%)`,
                },
                theme: 'light',
                layout: '',
                width: 100,
                height: 100,
                // sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
            },
        },
        {
            slideId: 3,
            title: 'Slide 4',
            supertitle: 'Quick and Snazzy',
            copy: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum',
            src: 'https://pinata.qodeinteractive.com/wp-content/uploads/2016/11/h-grid-slide1-graphic.png',
            video: '',
            options: {
                style: {
                    background: `linear-gradient(135deg,rgb(255,245,203) 0%,rgb(182,227,212) 50%,rgb(51,167,181) 100%)`,
                },
                theme: 'light',
                layout: '',
                width: 100,
                height: 100,
                // sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
            },
        },
    ];

    return (
        <Layout title={title} description={description}>
            <Slider options={options} slides={slides} />
        </Layout>
    );
}
