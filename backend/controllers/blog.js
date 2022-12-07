const formidable = require('formidable');
const slugify = require('slugify');
const stripHtml = require('string-strip-html');
const _ = require('lodash');
const fs = require('fs');
const { smartTrim } = require('../helpers/blog');

// [Handlers]
const { errorHandler } = require('../helpers/dbErrorHandler');

// [Models]
const Blog = require('../models/blog');
const Category = require('../models/category');
const Tag = require('../models/tag');

exports.create = (req, res) => {
    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, files) => {
        console.log('REQ', req.auth);
        if (err) {
            console.log('EROR >>>', err);
            return res.status(400).json({
                error: 'Image could not upload',
            });
        }

        const { title, body, categories, tags } = fields;

        if (!title || !title.length) {
            return res.status(400).json({
                error: 'Title is required',
            });
        }

        if (!body || body.length < 200) {
            return res.status(400).json({
                error: 'Content should have at least 200 characters',
            });
        }

        if (!categories || categories.length === 0) {
            return res.status(400).json({
                error: 'At least one category is required',
            });
        }

        if (!tags || tags.length === 0) {
            return res.status(400).json({
                error: 'At least one tag is required',
            });
        }

        let blog = new Blog();
        blog.title = title;
        blog.body = body;
        blog.excerpt = smartTrim(body, 320, ' ', ' ...');
        blog.slug = slugify(title).toLowerCase();
        blog.metaTitle = `${title} | ${process.env.APP_NAME}`;
        blog.metaDescription = stripHtml(body.substring(0, 160)).result;
        blog.postedBy = req.auth._id;
        console.log('BLOG', blog);

        // categories and tags
        let arrayOfCategories = categories && categories.split(',');
        let arrayOfTags = tags && tags.split(',');

        if (files.featuredImage) {
            if (files.featuredImage.size > 10000000) {
                return res.status(400).json({
                    error: 'Image should be no larger than 2MB',
                });
            }
            blog.featuredImage.data = fs.readFileSync(
                files.featuredImage.filepath
            );
            blog.featuredImage.contentType = files.featuredImage.type;
        }

        blog.save((err, result) => {
            if (err) {
                console.log('BLOG SAVE ERROR =====>', err);
                return res.status(400).json({
                    error: errorHandler(err),
                });
            }
            // res.json(result);
            Blog.findByIdAndUpdate(
                result._id,
                { $push: { categories: arrayOfCategories } },
                { new: true }
            ).exec((err, result) => {
                if (err) {
                    return res.status(400).json({
                        error: errorHandler(err),
                    });
                } else {
                    Blog.findByIdAndUpdate(
                        result._id,
                        { $push: { tags: arrayOfTags } },
                        { new: true }
                    ).exec((err, result) => {
                        if (err) {
                            return res.status(400).json({
                                error: errorHandler(err),
                            });
                        } else {
                            res.json(result);
                        }
                    });
                }
            });
        });
    });
};
