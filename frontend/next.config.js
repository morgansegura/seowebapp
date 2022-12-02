const path = require('path');

module.exports = {
    // reactStrictMode: true,
    trailingSlash: true,
    images: {
        domains: [
            'res.cloudinary.com',
            'images.pexels.com',
            'pinata.qodeinteractive.com',
        ],
    },
    sassOptions: {
        includePaths: [path.join(__dirname, 'styles')],
    },
};
