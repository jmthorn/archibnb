'use strict';
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define('Image', {
    listing_id: DataTypes.INTEGER,
    url: DataTypes.STRING
  }, {});
  Image.associate = function(models) {
    Image.belongsTo(models.Listing, { foreignKey: "listing_id" })
  };
  return Image;
};