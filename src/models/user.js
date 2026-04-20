const Sequelize = require('sequelize');
const db = require('../config/database');

const User = db.define('user', {

  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
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
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },
  
  timestamps: true,

});

module.exports = User;