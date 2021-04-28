const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');


const router = express.Router();


router.get('/:id', asyncHandler(async function(req, res) {
  const reviews = await db.Review.findAll({
    where: {
      listing_id: req.params.id
    }, 
    include: { model:db.User},
    order: [['updatedAt', 'DESC']]
  });
  return res.json(reviews)

}))

router.post(
  '/',
  // reviewValidations.validateCreate,
  asyncHandler(async function (req, res) {
    const review = await db.Review.create(req.body);
    const newReview = await db.Review.findOne({
      where: {
        id: review.id
      },
      include: { model:db.User}
    })
    return res.json(newReview)
    // return res.redirect(`${req.baseUrl}/${id}`);
  })
);





module.exports = router;