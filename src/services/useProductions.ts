import Production from '@models/production'
import Product from '@models/product'
import PlantProduction from '@models/plant_production'
import { productionAttributes } from '@type/production/production'
import { productionValidation } from 'src/schemas/production/productionSchema'
import { Identifier } from 'sequelize'

class useProductions {
  // Crear un registro de producción
  static async createProduction(body: productionAttributes) {
    const validation = productionValidation(body)

    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const {
      productId,
      quantityProduced,
      productionDate,
      observation,
      plant_id,
    } = validation.data

    // Verificar que el producto existe
    const productExists = await Product.findByPk(productId)
    if (!productExists) {
      return { error: 'El producto no existe' }
    }

    // Verificar que la planta existe
    const plantExists = await PlantProduction.findByPk(plant_id)
    if (!plantExists) {
      return { error: 'La planta no existe' }
    }

    const newProduction = await Production.create({
      productId,
      quantityProduced,
      productionDate,
      observation: observation ?? '',
      plant_id,
    })
    return newProduction
  }

  // Obtener todos los registros de producción
  static async getProductions() {
    const productions = await Production.findAll({
      include: [
        {
          model: Product,
        },
        {
          model: PlantProduction,
        },
      ],
      order: [['productionDate', 'DESC']],
    })
    return productions
  }

  // Obtener un registro de producción por su ID
  static async getProduction(id: Identifier | undefined) {
    if (!id) {
      return { error: 'El ID del registro de producción es requerido' }
    }

    const production = await Production.findByPk(id, {
      include: [
        {
          model: Product,
        },
        {
          model: PlantProduction,
        },
      ],
    })

    if (!production) {
      return { error: 'Registro de producción no encontrado' }
    }

    return production
  }

  // Actualizar un registro de producción
  static async updateProduction(id: string, body: productionAttributes) {
    const validation = productionValidation(body)

    if (!validation.success) {
      return { error: validation.error.errors }
    }

    const production = await Production.findByPk(id)
    if (!production) {
      return { error: 'El registro de producción no existe' }
    }

    const {
      productId,
      quantityProduced,
      productionDate,
      observation,
      plant_id,
    } = validation.data

    // Verificar que el producto existe
    if (productId) {
      const productExists = await Product.findByPk(productId)
      if (!productExists) {
        return { error: 'El producto no existe' }
      }
    }

    // Verificar que la planta existe
    if (plant_id) {
      const plantExists = await PlantProduction.findByPk(plant_id)
      if (!plantExists) {
        return { error: 'La planta no existe' }
      }
    }

    await production.update({
      productId,
      quantityProduced,
      productionDate,
      observation,
      plant_id,
    })
    return production
  }

  // Eliminar un registro de producción
  static async deleteProduction(id: string) {
    const production = await Production.findByPk(id)

    if (!production) {
      return { error: 'El registro de producción no existe' }
    }

    await production.destroy()
    return { message: 'Registro de producción eliminado correctamente' }
  }

  // Obtener producción por producto
  static async getProductionByProduct(productId: string) {
    const productions = await Production.findAll({
      where: { productId },
      include: [
        {
          model: Product,
        },
        {
          model: PlantProduction,
        },
      ],
      order: [['productionDate', 'DESC']],
    })
    return productions
  }

  // Obtener producción por planta
  static async getProductionByPlant(plant_id: string) {
    const productions = await Production.findAll({
      where: { plant_id },
      include: [
        {
          model: Product,
        },
        {
          model: PlantProduction,
        },
      ],
      order: [['productionDate', 'DESC']],
    })
    return productions
  }
}

export default useProductions
