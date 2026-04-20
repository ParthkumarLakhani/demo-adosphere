const { Sequelize } = require('sequelize');
require('dotenv').config();
const userModel = require('../models/user.js')
const linkModel = require('../models/link.js');

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
      port: process.env.DB_PORT || 1433,
        host: process.env.DB_HOST,
        dialect: 'postgres',
        dialectOptions: {
            options: {
                encrypt: true,
                trustServerCertificate: true, // For local development
            }
        }
    }
);

const db = {};
db.Sequelize = sequelize;

User = userModel(sequelize);
Link = linkModel(sequelize);


module.exports = db;