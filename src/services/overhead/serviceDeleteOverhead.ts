import Overhead from '@models/overhead'

const serviceDeleteOverhead = async (id: string) => {
  const overhead = await Overhead.findByPk(id)
  if (!overhead) {
    return { error: 'Overhead not found' }
  }
  await overhead.update({ status: false })
  return { message: 'Overhead deleted successfully' }
}

export default serviceDeleteOverhead
