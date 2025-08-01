import serviceCreateGeneralExpense from './serviceCreateGeneralExpense';
import serviceGetAllGeneralExpenses from './serviceGetAllGeneralExpenses';
import serviceGetGeneralExpenseById from './serviceGetGeneralExpenseById';
import serviceUpdateGeneralExpense from './serviceUpdateGeneralExpense';
import serviceDeleteGeneralExpense from './serviceDeleteGeneralExpense';

const useGeneralExpense = {
  create: serviceCreateGeneralExpense,
  getAll: serviceGetAllGeneralExpenses,
  getById: serviceGetGeneralExpenseById,
  update: serviceUpdateGeneralExpense,
  delete: serviceDeleteGeneralExpense,
};

export default useGeneralExpense;