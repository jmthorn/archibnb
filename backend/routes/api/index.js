// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const listingsRouter = require('./listings.js');
const reviewsRouter = require('./reviews.js');

router.use('/listings', listingsRouter);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/reviews', reviewsRouter);






module.exports = router;