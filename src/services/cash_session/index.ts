import serviceCreateCashSession from './serviceCreateCashSession'
import serviceGetCashSessions from './serviceGetCashSessions'
import serviceGetCashSessionById from './serviceGetCashSessionById'
import serviceUpdateCashSession from './serviceUpdateCashSession'
import serviceDeleteCashSession from './serviceDeleteCashSession'
import serviceGetSessionTotals from './serviceGetSessionTotals'
import serviceCheckStoreActiveSession from './serviceCheckStoreActiveSession'

const useCashSession = {
  serviceCreateCashSession,
  serviceGetCashSessions,
  serviceGetCashSessionById,
  serviceUpdateCashSession,
  serviceDeleteCashSession,
  serviceGetSessionTotals,
  serviceCheckStoreActiveSession,
}

export default useCashSession
