import express from 'express'
import authorization from '@middlewares/authorization'
import {
  createLocation,
  deleteLocation,
  getAllLocations,
  getLocationByID,
  updateLocation,
} from '@controllers/Locations'

const router = express.Router()
router.post('/', authorization, createLocation)
router.get('/', authorization, getAllLocations)
router.get('/:id', authorization, getLocationByID)
router.put('/:id', authorization, updateLocation)
router.delete('/:id', authorization, deleteLocation)

export default router
