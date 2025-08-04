// Importa todos los controladores de Financial Report
import createFinancialReportController from './createFinancialReportController';
import getAllFinancialReportsController from './getAllFinancialReportsController';
import getFinancialReportByIdController from './getFinancialReportByIdController';
import updateFinancialReportController from './updateFinancialReportController';
import deleteFinancialReportController from './deleteFinancialReportController';

const financialReportController = {
  create: createFinancialReportController,
  getAll: getAllFinancialReportsController,
  getById: getFinancialReportByIdController,
  update: updateFinancialReportController,
  delete: deleteFinancialReportController,
};

export default financialReportController;
