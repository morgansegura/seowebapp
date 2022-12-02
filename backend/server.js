const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

// [Routes]
const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');

// [App]
const app = express();

// [DB]
mongoose
    .connect(`${process.env.MONGO_URI}`, {
        useNewUrlParser: true,
    })
    .then(() => console.log(`DB Connected => ${process.env.MONGO_URI}`))
    .catch((err) => console.log('DB Error => ', err));

// [Middlewares]
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());

// [CORS]
if (process.env.NODE_ENV === 'development') {
    app.use(cors({ origin: `${process.env.CLIENT_URL}` }));
}
// [Routes Middleware]
app.use('/api', authRoutes);
app.use('/api', blogRoutes);

// [Port]
const port = process.env.PORT || 4000;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
