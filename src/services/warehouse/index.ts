import serviceCreateWarehouse from '../../services/warehouse/serviceCreatewarehouse'
import serviceDeleteWarehouse from '../../services/warehouse/serviceDeletewarehouse'
import serviceGetWarehouses from '../../services/warehouse/serviceGetwarehouses'
import serviceUpdateWarehouse from '../../services/warehouse/serviceUpdatewarehouse'
import serviceActivateWarehouse from '../../services/warehouse/serviceActivatewarehouse'

const useWarehouse = {
  serviceCreateWarehouse,
  serviceDeleteWarehouse,
  serviceGetWarehouses,
  serviceUpdateWarehouse,
  serviceActivateWarehouse,
}

export default useWarehouse
