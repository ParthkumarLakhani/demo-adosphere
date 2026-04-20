module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }

  }, {
    timestamps: true,
  });

  return User;
};