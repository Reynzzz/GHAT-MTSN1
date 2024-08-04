'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Gurus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        unique:true
      },
      Golongan: {
        type: Sequelize.STRING
      },
      umur: {
        type: Sequelize.INTEGER
      },
      password: {
        type: Sequelize.STRING
      },
      jenisKelamin: {
        type: Sequelize.STRING
      },
      role : {
        type : Sequelize.STRING
      },
      type : {
        type : Sequelize.STRING
      },
      jadwalGuruJagaFrom : {
        type : Sequelize.DATE
      },
      jadwalGuruJagaTo : {
        type : Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Gurus');
  }
};