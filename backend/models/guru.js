'use strict';
const {
  Model
} = require('sequelize');
const {hash} = require('../helper/bcrypt')
const bcryptjs = require("bcryptjs");
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
  },
  {
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
    modelName: "Guru",
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
  return Guru;
};
