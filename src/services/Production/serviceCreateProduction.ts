import Production from '@models/production'
import { productionAttributes } from '@type/production/production'
import { productionValidation } from 'src/schemas/production/productionSchema'
import Product from '@models/product'
import PlantProduction from '@models/plant_production'
import Recipe from '@models/recipe'
import BuysResource from '@models/buysResource'
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

  // Ahora obtenemos las recetas directamente de la tabla Recipe
  const recetas = await Recipe.findAll({
    where: { productId },
  })

  const resumenRecursos: {
    recurso_id: string
    nombre: string
    cantidad_total: number
    unidad: string
  }[] = []

  for (const receta of recetas) {
    // Cada receta ya tiene resourceId, quantity y unit
    const cantidadTotal =
      parseFloat(receta.quantity.toString()) * quantityProduced

    const entradas = await BuysResource.findAll({
      where: { resource_id: receta.resourceId },
      order: [['entry_date', 'ASC']],
    })

    let cantidadRestante = cantidadTotal

    for (const entrada of entradas) {
      const cantidadDisponible = entrada.quantity
      const cantidadADescontar = Math.min(cantidadDisponible, cantidadRestante)

      entrada.quantity -= cantidadADescontar
      await entrada.save()

      cantidadRestante -= cantidadADescontar

      if (cantidadRestante <= 0) break
    }

    // Si aún falta descontar, restar lo que falta a la última entrada (puede quedar en negativo)
    if (cantidadRestante > 0) {
      const ultimaEntrada = entradas[entradas.length - 1]

      if (ultimaEntrada) {
        ultimaEntrada.quantity -= cantidadRestante
        await ultimaEntrada.save()
      } else {
        // No había entradas — crear una sola con cantidad negativa si se desea
        await BuysResource.create({
          warehouse_id: plant_id,
          resource_id: receta.resourceId,
          quantity: -cantidadRestante,
          type_unit: receta.unit,
          unit_price: 0, // O el precio que corresponda
          total_cost: 0, // O el costo que corresponda
          supplier_id: '', // O el ID del proveedor si se desea
          entry_date: new Date(),
        })
      }
    }

    const recurso = await Resource.findByPk(receta.resourceId)
    if (!recurso) continue

    const yaExiste = resumenRecursos.find(
      (r) => r.recurso_id === receta.resourceId,
    )
    if (!yaExiste) {
      resumenRecursos.push({
        recurso_id: receta.resourceId,
        nombre: recurso.name,
        cantidad_total: cantidadTotal,
        unidad: receta.unit,
      })
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
