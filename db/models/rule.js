'use strict';
module.exports = (sequelize, DataTypes) => {
  const Rule = sequelize.define(
    'Rule',
    {
      description: DataTypes.STRING,
      topicId: {
        type: DataTypes.INTEGER,
        onDelete: 'CASCADE',
        references: {
          model: 'Topics',
          key: 'id',
          as: 'topicId',
        },
      },
    },
    {},
  );
  Rule.associate = (models) => {
    // associations can be defined here
    Rule.belongsTo(models.Topic, {
      foreignKey: 'topicId',
      onDelete: 'CASCADE',
    });
  };
  return Rule;
};
