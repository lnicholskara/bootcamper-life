module.exports = function(sequelize, DataTypes) {
  //Sequelize - MySQL table setup
  var Comment = sequelize.define(
    "Comment",
    {
      body: {
        type: DataTypes.TEXT,
        allowNull: false
      },
      active: { type: DataTypes.BOOLEAN, defaultValue: true },
      votes: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
        validate: { isInt: true }
      }
    },
    {
      freezeTableName: true
    }
  );
  //Associate Comment to User and Post
  Comment.associate = function(models) {
    Comment.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
    Comment.belongsTo(models.Post, {
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Comment;
};
