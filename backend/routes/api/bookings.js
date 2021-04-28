const express = require('express');
const asyncHandler = require('express-async-handler');
const db = require('../../db/models');


const router = express.Router();


// router.get('/:id', asyncHandler(async function(req, res) {
//   const bookings = await db.Booking.findAll({
//     where: {
//       guest_id: req.params.id
//     }, 
//     include: [{ model:db.User},{ model:db.Listing}],
//     order: [['updatedAt', 'DESC']]
//   });
//   return res.json(bookings)

// }))

router.post(
  '/',
  asyncHandler(async function (req, res) {
    const booking = await db.Booking.create(req.body);
    const newBooking = await db.Booking.findOne({
      where: {
        id: booking.id
      },
      include: { model:db.User}
    })
    return res.json(newBooking)
  })
);
