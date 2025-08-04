import serviceCreateWarehouseStore from './serviceCreateWarehouseStore'
import serviceGetWarehouseStores from './serviceGetWarehouseStores'
import serviceGetWarehouseStore from './serviceGetWarehouseStore'
import serviceDeleteWarehouseStore from './serviceDeleteWarehouseStore'
import serviceUpdateWarehouseStore from './serviceUpdateWarehouseStore'
import serviceGetWarehouseStoreByStoreAndProduct from './serviceGetWarehouseStoreByStoreAndProduct'

const useWarehouseStore = {
  serviceCreateWarehouseStore,
  serviceGetWarehouseStores,
  serviceGetWarehouseStore,
  serviceDeleteWarehouseStore,
  serviceUpdateWarehouseStore,
  serviceGetWarehouseStoreByStoreAndProduct, // ✅ Nombre correcto
}

export default useWarehouseStore
