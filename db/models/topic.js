'use strict';
module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    'Topic',
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {},
  );
  Topic.associate = (models) => {
    // associations can be defined here
    Topic.hasMany(models.Banner, {
      foreignKey: 'topicId',
      as: 'banners',
    });
    Topic.hasMany(models.Post, {
      foreignKey: 'topicId',
      as: 'posts',
    });
  };
  return Topic;
};
