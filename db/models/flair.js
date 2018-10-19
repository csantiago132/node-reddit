'use strict';
module.exports = (sequelize, DataTypes) => {
  const Flair = sequelize.define(
    'Flair',
    {
      name: DataTypes.STRING,
      color: DataTypes.STRING,
    },
    {},
  );
  return Flair;
};
