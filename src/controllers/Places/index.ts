import createPlaceController from './createPlace'
import getPlaceController from './getPlace'
import getPlacesController from './getPlaces'
import updatePlaceController from './updatePlace'
import deletePlaceController from './deletePlace'

const placesController = {
  createPlaceController,
  getPlaceController,
  getPlacesController,
  updatePlaceController,
  deletePlaceController,
}

export default placesController
