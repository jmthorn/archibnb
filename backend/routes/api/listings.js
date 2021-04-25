const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');


const router = express.Router();


router.get('/', asyncHandler(async function (req, res) {
  const listings = await db.Listing.findAll();
  return res.json(listings);
}));


router.get('/:id', asyncHandler(async function(req, res) {
  const listing = await db.Listing.findOne(req.params.id);
  return res.json(listing);
}));


module.exports = router;