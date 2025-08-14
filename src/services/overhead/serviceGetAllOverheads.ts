import Overhead from '@models/overhead'

const serviceGetOverheads = async () => {
  const overheads = await Overhead.findAll()
  return overheads
}
export default serviceGetOverheads
