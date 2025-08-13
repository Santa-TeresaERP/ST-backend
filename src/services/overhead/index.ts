import serviceCreateOverhead from './serviceCreateOverhead'
import serviceCreateMonasterioOH from './serviceCreateMonasterioOH'
import serviceGetOverheads from './serviceGetAllOverheads'
import serviceGetOverhead from './serviceGetOverhead'
import serviceGetAllOverheads from './serviceGetAllOverheads'
import serviceGetMonthlyExpense from './serviceGetMonthlyExpense'
import serviceUpdateOverhead from './serviceUpdateOverhead'
import serviceDeleteOverhead from './serviceDeleteOverhead'

const useOverhead = () => {
  return {
    createOverhead: serviceCreateOverhead,
    createMonasterioOH: serviceCreateMonasterioOH,
    deleteOverhead: serviceDeleteOverhead,
    getOverheads: serviceGetOverheads,
    getOverhead: serviceGetOverhead,
    getAllOverheads: serviceGetAllOverheads,
    getMonthlyExpense: serviceGetMonthlyExpense,
    updateOverhead: serviceUpdateOverhead,
  }
}

export default useOverhead
