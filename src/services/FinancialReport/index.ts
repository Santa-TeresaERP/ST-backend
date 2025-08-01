import serviceCreateFinancialReport from './serviceCreateFinancialReport';
import serviceGetAllFinancialReports from './serviceGetAllFinancialReports';
import serviceGetFinancialReportById from './serviceGetFinancialReportById';
import serviceUpdateFinancialReport from './serviceUpdateFinancialReport';
import serviceDeleteFinancialReport from './serviceDeleteFinancialReport';

const useFinancialReport = {
  create: serviceCreateFinancialReport,
  getAll: serviceGetAllFinancialReports,
  getById: serviceGetFinancialReportById,
  update: serviceUpdateFinancialReport,
  delete: serviceDeleteFinancialReport,
};

export default useFinancialReport;