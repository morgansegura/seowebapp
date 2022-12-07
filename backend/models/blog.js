const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

const blogSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            trim: true,
            min: 3,
            max: 160,
            required: true,
        },
        slug: {
            type: String,
            unique: true,
            index: true,
        },
        body: {
            type: {},
            trim: true,
            min: 200,
            max: 2000000,
        },
        excerpt: {
            type: String,
            max: 1000,
        },
        metaTitle: {
            type: String,
        },
        metaDescription: {
            type: {},
        },
        featuredImage: {
            data: Buffer,
            contentType: String,
        },
        category: [{ type: ObjectId, ref: 'Category', required: true }],
        tag: [{ type: ObjectId, ref: 'Tag' }],
        postedBy: [{ type: ObjectId, ref: 'User' }],
    },
    { timestamp: true }
);

module.exports = mongoose.model('Blog', blogSchema);
