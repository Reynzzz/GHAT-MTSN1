'use strict';
const {
  Model
} = require('sequelize');
// const Guru = require('./guru')

module.exports = (sequelize, DataTypes) => {
  class gurujaga extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    // gurujaga.belongsTo(models.Guru, { foreignKey: 'guruId' });
    }
  }
  gurujaga.init({
    guruId: DataTypes.INTEGER,
    tanggal: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'gurujaga',
  });
  return gurujaga;
};