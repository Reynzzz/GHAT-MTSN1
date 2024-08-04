'use strict';
const {
  Model
} = require('sequelize');
const {hash} = require('../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class Guru extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Guru.hasMany(models.Absensi, { foreignKey: 'guruId', as: 'Absensis' });
      Guru.belongsToMany(models.kelas, { through: models.guruKelas, foreignKey: 'guruId', as: 'Kelases' });
    }

    // Instance method to get decrypted password
    getDecryptedPassword() {
      return decryptPassword(this.password);
    }
  }
  
  Guru.init({
    username: {
      type: DataTypes.STRING,
      unique : {
        args : true , msg : 'username already in use'
      },
    },
    Golongan: DataTypes.STRING,
    umur: DataTypes.INTEGER,
    jenisKelamin: DataTypes.STRING,
    password: DataTypes.STRING,
    role : DataTypes.STRING,
    type :DataTypes.STRING,
    jadwalGuruJagaFrom : DataTypes.DATE,
    jadwalGuruJagaTo : DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Guru',
  
  });
  Guru.beforeCreate(guru => {
    guru.password = hash(guru.password)
  })
  return Guru;
};
