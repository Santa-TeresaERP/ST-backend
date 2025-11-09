import IncomeChurch from '@models/IncomeChurch';

const serviceDeleteIncomeChurch = async (churchId: string) => {
  try {
    // 1. Buscar todos los ingresos de la iglesia especificada
    const incomes = await IncomeChurch.findAll({
      where: { idChurch: churchId },
    });

    if (!incomes || incomes.length === 0) {
      return {
        success: false,
        error: 'No se encontraron ingresos para esta iglesia.',
      };
    }

    // 2. Eliminar todos los ingresos encontrados
    const deletedCount = await IncomeChurch.destroy({
      where: { idChurch: churchId },
    });

    // 3. Respuesta exitosa
    return {
      success: true,
      message: `${deletedCount} ingreso(s) eliminado(s) exitosamente para la iglesia.`,
      deletedCount,
    };
  } catch (error) {
    console.error('Error al eliminar los ingresos de la iglesia:', error);
    return {
      success: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error al eliminar los ingresos de la iglesia.',
    };
  }
};

export default serviceDeleteIncomeChurch;
