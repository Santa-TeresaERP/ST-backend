'use strict'

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('buys_products', {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false,
      },
      warehouse_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'warehouses',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      product_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'products',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      quantity: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      unit_price: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      total_cost: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      supplier_id: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
          model: 'suppliers',
          key: 'id',
        },
        onUpdate: 'CASCADE',
        onDelete: 'RESTRICT',
      },
      entry_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      status: {
        type: Sequelize.BOOLEAN,
        allowNull: true,
        defaultValue: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    })

    // Agregar índices para mejorar el rendimiento
    await queryInterface.addIndex('buys_products', ['warehouse_id'])
    await queryInterface.addIndex('buys_products', ['product_id'])
    await queryInterface.addIndex('buys_products', ['supplier_id'])
    await queryInterface.addIndex('buys_products', ['entry_date'])
  },

  async down(queryInterface) {
    await queryInterface.dropTable('buys_products')
  },
}
