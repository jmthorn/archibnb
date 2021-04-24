// const express = require('express');
// const asyncHandler = require('express-async-handler');
// const { check, validationResult } = require('express-validator');
// const db = require('../db/models');

// const listingValidations = require('../../validations/listings');


// const router = express.Router();


// router.get('/', asyncHandler(async function (req, res) {
//   const listings = await db.Listing.findAll();
//   return res.json(listings);
// }));


// router.post(
//   '/',
//   listingValidations.validateCreate,
//   asyncHandler(async function (req, res) {
//     const id = await PokemonRepository.create(req.body);
//     return res.redirect(`${req.baseUrl}/${id}`);
//   })
// );


// router.get('/:id', asyncHandler(async function(req, res) {
//   const listing = await db.Listing.findOne(req.params.id);
//   return res.json(listing);
// }));
