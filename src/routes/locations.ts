import express from 'express'
import authorization from '@middlewares/authorization'
import {
  createLocation,
  deleteLocation,
  getAllLocations,
  getLocationById,
  updateLocation,
} from '@controllers/Locations'

const router = express.Router()
router.post('/', authorization, createLocation)
router.get('/', authorization, getAllLocations)
router.get('/:id', authorization, getLocationById)
router.put('/:id', authorization, updateLocation)
router.delete('/:id', authorization, deleteLocation)

export default router
