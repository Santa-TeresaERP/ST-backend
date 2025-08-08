// ✅ services/warehouseStore/serviceGetWarehouseStoreByStoreAndProduct.ts

import WarehouseStore from '@models/warehouseStore'

const serviceGetWarehouseStoreByStoreAndProduct = async ({
  storeId,
  productId,
}: {
  storeId: string
  productId: string
}) => {
  const warehouseStore = await WarehouseStore.findOne({
    where: {
      storeId,
      productId,
    },
  })

  return warehouseStore
}

export default serviceGetWarehouseStoreByStoreAndProduct
