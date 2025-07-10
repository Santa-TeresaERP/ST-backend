import serviceCreateProduction from './serviceCreateProduction'
import serviceGetProduction from './serviceGetProduction'
import serviceGetProductions from './serviceGetProductions'
import serviceUpdateProduction from './serviceUpdateProduction'
import serviceDeleteProduction from './serviceDeleteProduction'
import useProductions from '@services/useProductions'
import { convertResourcesForProduction } from './resourceConversionService'

export {
  serviceCreateProduction,
  serviceGetProduction,
  serviceGetProductions,
  serviceUpdateProduction,
  serviceDeleteProduction,
  convertResourcesForProduction,
}

export default useProductions
