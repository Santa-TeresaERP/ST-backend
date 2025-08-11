import Overhead from '@models/overhead'

const serviceGetOverheads = async () => {
  try {
    const overhead = await Overhead.findOne({
      where: { status: 'true' },
    })
    if (!overhead) {
      throw new Error('Overhead not found')
    }
    return overhead
  } catch (error) {
    console.error(`❌ Error fetching overheads:`, error)
    throw error
  }
}

export default serviceGetOverheads
