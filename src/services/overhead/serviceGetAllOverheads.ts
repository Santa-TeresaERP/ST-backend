import Overhead from '@models/overhead'

const serviceGetAllOverheads = async () => {
  const overheads = await Overhead.findAll()
  return overheads
}
export default serviceGetAllOverheads
