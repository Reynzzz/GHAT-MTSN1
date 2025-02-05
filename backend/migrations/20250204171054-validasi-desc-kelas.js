'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Absensis', 'deskripsiKelas', {
      type: Sequelize.STRING,
      allowNull: true,       
      defaultValue: 'default' 
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('Absensis', 'deskripsiKelas');
  }
};
