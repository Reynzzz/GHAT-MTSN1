'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Absensi extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Absensi.belongsTo(models.Guru, { foreignKey: 'guruId', as: 'Guru' });
      Absensi.belongsTo(models.kelas, { foreignKey: 'kelasId', as: 'Kelas' });
    }
  }
  Absensi.init({
    tanggalAbsen: DataTypes.DATE,
    foto_absen: DataTypes.STRING,
    keterangan : DataTypes.STRING,
    materiAjar : DataTypes.STRING,
    statusAbsen : DataTypes.BOOLEAN,
    statusJaga : DataTypes.BOOLEAN,
    statusKelas : DataTypes.BOOLEAN,
    jadwalKelas : DataTypes.DATE,
    guruId: DataTypes.INTEGER,
    kelasId: DataTypes.INTEGER,
    deskripsiKelas : DataTypes.STRING

  }, {
    sequelize,
    modelName: 'Absensi',
  });
  return Absensi;
};