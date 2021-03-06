const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');


const router = express.Router();


router.get('/', asyncHandler(async function (req, res) {
  const listings = await db.Listing.findAll({include: [{ model:db.Image}, {model:db.Booking}]});
  return res.json(listings);
}));


router.get('/:id', asyncHandler(async function(req, res) {
  const listing = await db.Listing.findByPk(req.params.id, {
    include: [{ model:db.Image}, {model:db.Booking}, {model: db.Review}],
  });
  
  return res.json(listing);
}));




module.exports = router;