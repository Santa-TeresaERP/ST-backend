import serviceCreateCashSession from './serviceCreateCashSession'
import serviceGetCashSessions from './serviceGetCashSessions'
import serviceGetCashSessionById from './serviceGetCashSessionById'
import serviceUpdateCashSession from './serviceUpdateCashSession'
import serviceDeleteCashSession from './serviceDeleteCashSession'

const useCashSession = {
  serviceCreateCashSession,
  serviceGetCashSessions,
  serviceGetCashSessionById,
  serviceUpdateCashSession,
  serviceDeleteCashSession,
}

export default useCashSession
