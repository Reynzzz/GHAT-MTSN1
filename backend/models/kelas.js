'use strict';
const {
  Model
} = require('sequelize');
const bcryptjs = require("bcryptjs");
const {hash} = require('../helper/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class kelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // kelas.belongsToMany(models.Guru, { through: models.guruKelas, foreignKey: 'kelasId', as: 'Gurus' });
      kelas.hasMany(models.Absensi, { foreignKey: 'kelasId', as: 'Absensis' });
      kelas.hasMany(models.dataKelas, { foreignKey: 'kelasId', as: 'DataKelas' }); 
    }
    getDecryptedPassword() {
      return decryptPassword(this.password);
    }
  }
  kelas.init({
    name: DataTypes.STRING,
    password : DataTypes.STRING
  },{
    hooks: {
        beforeCreate(instance, option) {          
            if (instance.password) {
                let salt = bcryptjs.genSaltSync(10);
                let hash = bcryptjs.hashSync(instance.password, salt);
                instance.password = hash;
            }
        },
        beforeUpdate(instance, option) {
            if (instance.changed('password')) {
                let salt = bcryptjs.genSaltSync(10);
                let hash = bcryptjs.hashSync(instance.password, salt);
                instance.password = hash;
            }
        }
    },
    sequelize,
    modelName: "kelas",
    defaultScope: {
        attributes: { exclude: ['password'] }
    },
    scopes: {
        withPassword: {
            attributes: {}
        }
    }
}
  )
  return kelas;
};