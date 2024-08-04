'use strict';
const {
  Model
} = require('sequelize');
const Guru = require('./guru')
const kelas = require('./kelas')
module.exports = (sequelize, DataTypes) => {
  class guruKelas extends Model {
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
  guruKelas.init({
    name: DataTypes.STRING,
    guruId: DataTypes.INTEGER,
    kelasId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'guruKelas',
  });
  return guruKelas;
};