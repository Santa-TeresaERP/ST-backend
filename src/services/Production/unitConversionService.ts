/**
 * Servicio de conversión de unidades para recursos
 * Maneja las conversiones entre diferentes unidades de medida
 */

// Factores de conversión a la unidad base (gramos para peso, mililitros para volumen)
const conversionFactors: Record<string, number> = {
  // Unidades de peso (base: gramos)
  g: 1,
  gramos: 1,
  kg: 1000,
  kilogramos: 1000,

  // Unidades de volumen (base: mililitros)
  ml: 1,
  mililitros: 1,
  l: 1000,
  litros: 1000,

  // Unidades sin conversión
  unidad: 1,
  unidades: 1,
  pieza: 1,
  piezas: 1,
  ud: 1,
  uds: 1,
}

// Grupos de unidades compatibles
const unitGroups = {
  weight: ['g', 'gramos', 'kg', 'kilogramos'],
  volume: ['ml', 'mililitros', 'l', 'litros'],
  count: ['unidad', 'unidades', 'pieza', 'piezas', 'ud', 'uds'],
}

/**
 * Normaliza el nombre de la unidad (minúsculas, sin espacios)
 */
const normalizeUnit = (unit: string): string => {
  return unit.toLowerCase().trim()
}

/**
 * Obtiene el grupo al que pertenece una unidad
 */
const getUnitGroup = (unit: string): string | null => {
  const normalizedUnit = normalizeUnit(unit)

  for (const [group, units] of Object.entries(unitGroups)) {
    if (units.includes(normalizedUnit)) {
      return group
    }
  }
  return null
}

/**
 * Verifica si dos unidades son compatibles (del mismo grupo)
 */
export const areUnitsCompatible = (
  fromUnit: string,
  toUnit: string,
): boolean => {
  const fromGroup = getUnitGroup(fromUnit)
  const toGroup = getUnitGroup(toUnit)

  return fromGroup !== null && fromGroup === toGroup
}

/**
 * Convierte una cantidad de una unidad a otra
 * @param quantity - Cantidad a convertir
 * @param fromUnit - Unidad origen
 * @param toUnit - Unidad destino
 * @returns Cantidad convertida o null si las unidades no son compatibles
 */
export const convertQuantity = (
  quantity: number,
  fromUnit: string,
  toUnit: string,
): number | null => {
  const normalizedFromUnit = normalizeUnit(fromUnit)
  const normalizedToUnit = normalizeUnit(toUnit)

  // Si las unidades son iguales, no hay conversión
  if (normalizedFromUnit === normalizedToUnit) {
    return quantity
  }

  // Verificar compatibilidad
  if (!areUnitsCompatible(fromUnit, toUnit)) {
    console.log(`⚠️ Unidades incompatibles: ${fromUnit} → ${toUnit}`)
    return null
  }

  // Obtener factores de conversión
  const fromFactor = conversionFactors[normalizedFromUnit]
  const toFactor = conversionFactors[normalizedToUnit]
  if (fromFactor === undefined || toFactor === undefined) {
    console.log(
      `⚠️ Factor de conversión no encontrado: ${fromUnit} → ${toUnit}`,
    )
    return null
  }

  // Convertir: cantidad * factor_origen / factor_destino
  const convertedQuantity = (quantity * fromFactor) / toFactor

  console.log(
    `🔄 Conversión: ${quantity} ${fromUnit} = ${convertedQuantity} ${toUnit}`,
  )

  return convertedQuantity
}

/**
 * Obtiene información sobre las unidades soportadas
 */
export const getSupportedUnits = () => {
  return {
    weight: unitGroups.weight,
    volume: unitGroups.volume,
    count: unitGroups.count,
    conversionFactors,
  }
}

export default {
  convertQuantity,
  areUnitsCompatible,
  getSupportedUnits,
}
