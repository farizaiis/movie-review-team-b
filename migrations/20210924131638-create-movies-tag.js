'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('MoviesTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tagsId: {
        type: Sequelize.INTEGER,
        references: {
          model : "Tags",
          key : "id"
        },
        onUpdate : "CASCADE",
        onDelete : "CASCADE"
      },
      moviesId: {
        type: Sequelize.INTEGER,
        references: {
          model : "Movies",
          key : "id"
        },
        onUpdate : "CASCADE",
        onDelete : "CASCADE"
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
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('MoviesTags');
  }
};