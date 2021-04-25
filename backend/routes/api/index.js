// backend/routes/api/index.js
const router = require('express').Router();
const sessionRouter = require('./session.js');
const usersRouter = require('./users.js');
const listingsRouter = require('./listings.js');

router.use('/listings', listingsRouter);

router.use('/session', sessionRouter);

router.use('/users', usersRouter);






module.exports = router;