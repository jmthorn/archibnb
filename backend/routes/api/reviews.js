const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');


const router = express.Router();


router.post(
  '/',
  // reviewValidations.validateCreate,
  asyncHandler(async function (req, res) {
    console.log("HELLOOOOO!", req.body)
    const newReview = await db.Review.create(req.body);
    console.log("BACKEND", newReview)
    return res.json(newReview)
    // return res.redirect(`${req.baseUrl}/${id}`);
  })
);





module.exports = router;