import Overhead from '@models/overhead'

/**
 * Cambia el estado de un overhead (soft delete/restore).
 * - Si se proporciona `status`, se fuerza a ese valor (true/false).
 * - Si NO se proporciona `status`, se alterna (toggle) el estado actual.
 */
const serviceDeleteOverhead = async (id: string, status?: boolean) => {
  const overhead = await Overhead.findByPk(id)
  if (!overhead) {
    return { error: 'Overhead not found' }
  }

  // Si se provee un boolean, usarlo; de lo contrario, alternar el estado actual
  const nextStatus = typeof status === 'boolean' ? status : !overhead.status
  await overhead.update({ status: nextStatus })
  return {
    message: nextStatus
      ? 'Overhead activated successfully'
      : 'Overhead deleted successfully',
    status: nextStatus,
  }
}

export default serviceDeleteOverhead
