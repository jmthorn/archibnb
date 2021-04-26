'use strict';
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    listing_id: DataTypes.INTEGER,
    guest_id: DataTypes.INTEGER,
    review: DataTypes.TEXT
  }, {});
  Review.associate = function(models) {
    Review.belongsTo(models.Listing, { foreignKey: "listing_id" })
    Review.belongsTo(models.User, { foreignKey: "guest_id" })
  };
  return Review;
};