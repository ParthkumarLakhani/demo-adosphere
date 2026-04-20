module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define('link', {

    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
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
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    }

  }, {
    timestamps: true,
  });

  return Link;
};