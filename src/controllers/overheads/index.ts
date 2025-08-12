import { createMonasterioOHController } from './createMonasterioOH'
import { createOverheadsController } from './createOverheads'
import { deleteOverheadController } from './deleteOverhead'
import { getAllOverheadsController } from './getAllOverheads'
import { getMonthlyExpenseController } from './getMonthlyExpense'
import { getOverheadController } from './getOverhead'
import { updateOverheadController } from './updateOverhead'

const overheadController = {
  createOverheadsController,
  createMonasterioOHController,
  getAllOverheadsController,
  getOverheadController,
  updateOverheadController,
  deleteOverheadController,
  getMonthlyExpenseController,
}

export default overheadController
