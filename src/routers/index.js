const siteRouter = require('./siteRouter');
const courseRouter = require('./courseRouter');
const meRouter = require('./meRouter');

const router = (app) => {
    app.use('/course', courseRouter);
    app.use('/me', meRouter);
    app.use('/', siteRouter);
};

module.exports = router;
