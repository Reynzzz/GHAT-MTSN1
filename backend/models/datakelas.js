'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class dataKelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      dataKelas.belongsTo(models.kelas, { foreignKey: 'kelasId', as: 'Kelas' });
      dataKelas.belongsTo(models.Guru, { foreignKey: 'guruId', as: 'Guru' });
    }
  }
  dataKelas.init({
    absenKelas: DataTypes.DATE,
    jumlahTidakHadir: DataTypes.INTEGER,
    details: DataTypes.TEXT,
    kelasId : DataTypes.INTEGER,
    guruId: {
      type: DataTypes.INTEGER,
      allowNull: true 
    }
  }, {
    sequelize,
    modelName: 'dataKelas',
  });
  return dataKelas;
};