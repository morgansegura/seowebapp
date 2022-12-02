import { seo } from '@utils/seo';
import { validation } from '@utils/validation';
import { theme } from '@utils/theme';

export const config = {
    brand: {
        name: 'SEOWEBAPP',
        logo: ``,
        shortName: 'SEOWEBAPP',
        acronym: 'SWA',
    },
    settings: {
        siteIsLive: false,
        devMode: true,
        blog: true,
        cms: true,
        lms: true,
        store: true,
        subscription: true,
    },
    fonts: {
        array: [
            'Hind+Madurai:wght@300;400;500;600;700',
            'Merriweather:wght@300;400;700',
        ],
    },
    seo: { ...seo },
    theme: { ...theme },
    validation: { ...validation },
};
