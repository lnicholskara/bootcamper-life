module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define(
    "User",
    {
      //New Users Setup
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
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
      graduated_yet: { type: DataTypes.BOOLEAN, allowNull: true },
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
      github_link: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isUrl: true }
      },
      active: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false
      }
    },
    {
      freezeTableName: true
    }
  );
  //Count Number of Posts
  User.associate = function(models) {
    User.hasMany(models.Post, {});
  };
  //Count Number of Comments
  User.associate = function(models) {
    User.hasMany(models.Comment, {});
  };
  return User;
};