// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const listingsRouter = require('./listings.js');
const reviewsRouter = require('./reviews.js');
const bookingsRouter = require('./bookings.js');

router.use('/listings', listingsRouter);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);

router.use('/reviews', reviewsRouter);

router.use('/bookings', bookingsRouter);






module.exports = router;