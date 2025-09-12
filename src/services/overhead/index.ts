import serviceCreateOverhead from './serviceCreateOverhead'
import serviceCreateMonasterioOH from './serviceCreateMonasterioOH'
import serviceGetOverheads from './serviceGetOverheads'
import serviceGetOverhead from './serviceGetOverhead'
import serviceGetAllOverheads from './serviceGetAllOverheads'
import serviceGetMonthlyExpense from './serviceGetMonthlyExpense'
import serviceUpdateOverhead from './serviceUpdateOverhead'
import serviceDeleteOverhead from './serviceDeleteOverhead'
import serviceGetMonastery from './serviceGetMonastery'

const useOverhead = () => {
  return {
    createOverhead: serviceCreateOverhead,
    createMonasterioOH: serviceCreateMonasterioOH,
    deleteOverhead: serviceDeleteOverhead,
    getOverheads: serviceGetOverheads,
    getMonastery: serviceGetMonastery,
    getOverhead: serviceGetOverhead,
    getAllOverheads: serviceGetAllOverheads,
    getMonthlyExpense: serviceGetMonthlyExpense,
    updateOverhead: serviceUpdateOverhead,
  }
}

export default useOverhead
