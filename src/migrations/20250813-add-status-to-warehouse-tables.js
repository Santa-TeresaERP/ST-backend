'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('warehouse_products', 'status', {
      type: Sequelize.STRING,
      allowNull: true,
    })
    await queryInterface.addColumn('warehouse_movement_products', 'status', {
      type: Sequelize.STRING,
      allowNull: true,
    })
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('warehouse_products', 'status')
    await queryInterface.removeColumn('warehouse_movement_products', 'status')
  },
}
