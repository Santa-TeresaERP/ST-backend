import serviceCreateGeneralIncome from './serviceCreateGeneralIncome';
import serviceGetAllGeneralIncomes from './serviceGetAllGeneralIncomes';
import serviceGetGeneralIncomeById from './serviceGetGeneralIncomeById';
import serviceUpdateGeneralIncome from './serviceUpdateGeneralIncome';
import serviceDeleteGeneralIncome from './serviceDeleteGeneralIncome';

const useGeneralIncome = {
  create: serviceCreateGeneralIncome,
  getAll: serviceGetAllGeneralIncomes,
  getById: serviceGetGeneralIncomeById,
  update: serviceUpdateGeneralIncome,
  delete: serviceDeleteGeneralIncome,
};

export default useGeneralIncome;