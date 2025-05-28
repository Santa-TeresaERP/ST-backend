import Production from '@models/production'
import { productionAttributes } from '@type/production/production'
import { productionValidation } from 'src/schemas/production/productionSchema'
import Product from '@models/product'
import PlantProduction from '@models/plant_production'
import RecipeProductResource from '@models/recipe_product_resource'
import RecipeProductConection from '@models/recipe_product_conections'
import WarehouseResource from '@models/warehouseResource'
import Resource from '@models/resource'

const serviceCreateProduction = async (body: productionAttributes) => {
  const validation = productionValidation(body)
  if (!validation.success) return { error: validation.error.errors }

  const { productId, quantityProduced, productionDate, observation, plant_id } =
    validation.data

  const product = await Product.findByPk(productId)
  if (!product) return { error: 'El producto no existe' }

  const plant = await PlantProduction.findByPk(plant_id)
  if (!plant) return { error: 'La planta no existe' }

  const newProduction = await Production.create({
    productId,
    quantityProduced,
    productionDate,
    observation: observation ?? '',
    plant_id,
  })

  // 🔁 Procesar recetas y descontar recursos del almacén
  const recetas = await RecipeProductResource.findAll({
    where: { product_id: productId },
  })

  const resumenRecursos: {
    recurso_id: string
    nombre: string
    cantidad_total: number
    unidad: string
  }[] = []

  for (const receta of recetas) {
    const conexiones = await RecipeProductConection.findAll({
      where: { recipe_id: receta.id },
    })

    for (const conexion of conexiones) {
      const cantidadTotal =
        parseFloat(receta.quantity_required.toString()) * quantityProduced

      const entradas = await WarehouseResource.findAll({
        where: { resource_id: conexion.resource_id },
        order: [['entry_date', 'ASC']],
      })

      let cantidadRestante = cantidadTotal

      for (const entrada of entradas) {
        if (cantidadRestante <= 0) break

        const cantidadDisponible = entrada.quantity
        const cantidadADescontar = Math.min(
          cantidadDisponible,
          cantidadRestante,
        )

        entrada.quantity -= cantidadADescontar
        await entrada.save()

        cantidadRestante -= cantidadADescontar
      }

      const recurso = await Resource.findByPk(conexion.resource_id)
      if (!recurso) continue

      const yaExiste = resumenRecursos.find(
        (r) => r.recurso_id === conexion.resource_id,
      )
      if (!yaExiste) {
        resumenRecursos.push({
          recurso_id: conexion.resource_id,
          nombre: recurso.name,
          cantidad_total: cantidadTotal,
          unidad: receta.unit,
        })
      }
    }
  }

  const datosFinales = {
    id: newProduction.id,
    producto: product.name,
    cantidad_producida: quantityProduced,
    fecha_produccion: productionDate,
    observacion: observation,
    planta: plant.plant_name,
    recursos_usados: resumenRecursos,
  }

  console.log('📄 Datos finales de la producción:', datosFinales)
  return datosFinales
}

export default serviceCreateProduction
