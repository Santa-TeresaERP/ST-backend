import Overhead from '@models/overhead'

const serviceGetOverhead = async (overheadId: string) => {
  try {
    const overhead = await Overhead.findOne({
      where: { id: overheadId, status: 'true' },
    })
    if (!overhead) {
      throw new Error('Overhead not found')
    }
    return overhead
  } catch (error) {
    console.error(`❌ Error fetching overhead ${overheadId}:`, error)
    throw error
  }
}

export default serviceGetOverhead
