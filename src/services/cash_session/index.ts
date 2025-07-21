import serviceCreateCashSession from './serviceCreateCashSession'
import serviceGetCashSessions from './serviceGetCashSessions'
import serviceGetCashSessionById from './serviceGetCashSessionById'
import serviceUpdateCashSession from './serviceUpdateCashSession'
import serviceDeleteCashSession from './serviceDeleteCashSession'
import serviceGetSessionTotals from './serviceGetSessionTotals'

const useCashSession = {
  serviceCreateCashSession,
  serviceGetCashSessions,
  serviceGetCashSessionById,
  serviceUpdateCashSession,
  serviceDeleteCashSession,
  serviceGetSessionTotals,
}

export default useCashSession
