import serviceCreateWarehouse from 'src/services/warehouse/serviceCreatewarehouse'
import serviceDeleteWarehouse from 'src/services/warehouse/serviceDeletewarehouse'
import serviceGetWarehouses from 'src/services/warehouse/serviceGetwarehouses'
import serviceUpdateWarehouse from 'src/services/warehouse/serviceUpdatewarehouse'
import serviceActivateWarehouse from 'src/services/warehouse/serviceActivatewarehouse'

const useWarehouse = {
  serviceCreateWarehouse,
  serviceDeleteWarehouse,
  serviceGetWarehouses,
  serviceUpdateWarehouse,
  serviceActivateWarehouse,
}

export default useWarehouse
