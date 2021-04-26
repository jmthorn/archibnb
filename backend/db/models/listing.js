'use strict';
module.exports = (sequelize, DataTypes) => {
  const Listing = sequelize.define('Listing', {
    name: DataTypes.STRING,
    architect: DataTypes.STRING,
    address: DataTypes.STRING,
    latitude: DataTypes.FLOAT,
    longitude: DataTypes.FLOAT,
    price: DataTypes.INTEGER,
    guests: DataTypes.INTEGER,
    bedrooms: DataTypes.INTEGER,
    baths: DataTypes.INTEGER,
    year_built: DataTypes.INTEGER,
    description: DataTypes.TEXT,
    host_id: DataTypes.STRING
  }, {});
  Listing.associate = function(models) {
    Listing.hasMany(models.Image, { foreignKey: "listing_id" })
    Listing.hasMany(models.Review, { foreignKey: "listing_id" })
    Listing.hasMany(models.Booking, { foreignKey: "listing_id" })
    Listing.belongsTo(models.User, {foreignKey: 'host_id'})
  };
  return Listing;
};