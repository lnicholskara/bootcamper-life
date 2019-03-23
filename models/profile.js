module.exports = function(sequelize, DataTypes) {
  var Users = sequelize.define(
    "users",
    {
      //New Users Setup
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 70]
        }
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 70]
        }
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true }
      },
      school: { type: DataTypes.STRING, allowNull: false },
      graduated_yet: { type: DataTypes.BOOLEAN, allowNull: false },
      city: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1, 70]
        }
      },
      state: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { len: [2] }
      },
      github: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isUrl: true }
      },
      active: { type: DataTypes.BOOLEAN, defaultValue: true },
      password_hash: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );
  //Count Number of Posts
  Users.associate = function(models) {
    Users.hasMany(models.Post, {});
  };
  //Count Number of Comments
  Users.associate = function(models) {
    Users.hasMany(models.Comment, {});
  };
  return Users;
};
