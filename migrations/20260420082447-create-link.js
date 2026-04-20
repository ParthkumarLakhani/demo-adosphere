'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Links', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },

      user_id: {
        type: Sequelize.INTEGER,
        defaultValue: Sequelize.UUIDV4,
        references: {
          model: 'user',
          key: 'id'
        }
      },

      original_url: {
        type: Sequelize.STRING,
        allowNull: false
      },

      short_code: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      click_count: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },

      timestamps: true,
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Links');
  }
};