import { createOverheadsController } from './createOverheads'
import { createMonasterioOHController } from './createMonasterioOH'
import { getAllOverheadsController } from './getAllOverheads'
import { getOverheadController } from './getOverhead'
import { updateOverheadController } from './updateOverhead'
import { deleteOverheadController } from './deleteOverhead'
import { getMonthlyExpenseController } from './getMonthlyExpense'

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
