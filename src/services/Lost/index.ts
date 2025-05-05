import createLost from './serviceCreateLost'
import getAllLost from './serviceGetAllLost'
import getLostById from './serviceGetLostById'
import updateLost from './serviceUpdateLost'
import deleteLost from './serviceDeleteLost'

const useLost = {
  createLost,
  getAllLost,
  getLostById,
  updateLost,
  deleteLost,
}

export default useLost
