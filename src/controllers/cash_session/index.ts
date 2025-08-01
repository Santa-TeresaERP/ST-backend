import createCashSession from './createCashSession'
import getCashSessions from './getCashSessions'
import getCashSessionById from './getCashSessionById'
import updateCashSession from './updateCashSession'
import deleteCashSession from './deleteCashSession'
import getCashSessionDetails from './getCashSessionDetails'
import checkStoreActiveSession from './checkStoreActiveSession'

const cashSessionController = {
  createCashSession,
  getCashSessions,
  getCashSessionById,
  updateCashSession,
  deleteCashSession,
  getCashSessionDetails,
  checkStoreActiveSession,
}

export default cashSessionController
