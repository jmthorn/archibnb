'use strict';
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define('Booking', {
    listing_id: DataTypes.INTEGER,
    guest_id: DataTypes.INTEGER,
    start_date: DataTypes.DATE,
    end_date: DataTypes.DATE
  }, {});
  Booking.associate = function(models) {
    Booking.belongsTo(models.User, {foreignKey: 'guest_id'})
    Booking.belongsTo(models.Listing, {foreignKey: 'listing_id'})
  };
  return Booking;
};