'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ads = sequelize.define(
    'Ads',
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
    },
    {},
  );
  return Ads;
};
