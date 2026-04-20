const Sequelize = require('sequelize');
const db = require('../config/database');

const Link = db.define('link', {

  id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },

  user_id: {
    type: DataTypes.UUID,
    defaultValue: Sequelize.UUIDV4,
    references: {
      model: 'user', 
      key: 'id'      
    }
  },

  original_url: {
    type: DataTypes.STRING,
    allowNull: false
  },

  short_code: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  click_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },

  created_at: {
    type: Sequelize.DATE,
    defaultValue: Sequelize.NOW,
  },

  timestamps: true,

});

module.exports = Link;