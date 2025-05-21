import serviceCreatewarehouseMovementProduct from '@services/warehouse_movement_product/serviceCreatewarehouse_movement_product'
import WarehouseMovementProduct from '@models/warehouseMovementProduct'
import WarehouseProduct from '@models/warehouseProduct'
import { warehouseMovementProductValidation } from 'src/schemas/almacen/warehouseMovementProductScheama'

jest.mock('@models/warehouseMovementProduct')
jest.mock('@models/warehouseProduct')
jest.mock('src/schemas/almacen/warehouseMovementProductScheama', () => ({
  warehouseMovementProductValidation: jest.fn(),
}))

describe('serviceCreatewarehouseMovementProduct', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should create an "entrada" movement and update warehouse product quantity', async () => {
    const mockMovementData = {
      movement_id: 'mov1',
      warehouse_id: '1',
      store_id: 'store1',
      product_id: '1',
      movement_type: 'entrada' as 'entrada' | 'salida',
      quantity: 10,
      reason: 'Stock initial',
      movement_date: new Date(),
      user_id: '1',
      observations: '',
    }

    const mockWarehouseProduct = {
      id: '1',
      warehouse_id: '1',
      product_id: '1',
      quantity: 5,
      save: jest.fn().mockResolvedValue(this), // Will be fixed later
    }
    mockWarehouseProduct.save = jest.fn().mockResolvedValue(mockWarehouseProduct);


    const mockCreatedMovement = { ...mockMovementData, id: 'mov1' };

    (warehouseMovementProductValidation as jest.Mock).mockReturnValue({ success: true, data: mockMovementData });
    (WarehouseMovementProduct.create as jest.Mock).mockResolvedValue(mockCreatedMovement);
    (WarehouseProduct.findOne as jest.Mock).mockResolvedValue(mockWarehouseProduct)

    const result = await serviceCreatewarehouseMovementProduct(mockMovementData)

    expect(warehouseMovementProductValidation).toHaveBeenCalledWith(mockMovementData)
    expect(WarehouseMovementProduct.create).toHaveBeenCalledWith(
      expect.objectContaining({
        warehouse_id: mockMovementData.warehouse_id,
        store_id: mockMovementData.store_id,
        product_id: mockMovementData.product_id,
        movement_type: mockMovementData.movement_type,
        quantity: mockMovementData.quantity,
        // reason and user_id are not passed to create by the service from validation.data
        observations: mockMovementData.observations,
      }),
    )
    expect(WarehouseProduct.findOne).toHaveBeenCalledWith({
      where: { warehouse_id: mockMovementData.warehouse_id, product_id: mockMovementData.product_id },
    })
    expect(mockWarehouseProduct.save).toHaveBeenCalled()
    expect(result.success).toBe(true)
    expect(result.movement).toEqual(mockCreatedMovement)
    expect(result.warehouseProduct?.quantity).toBe(15) // 5 (initial) + 10 (entrada)
  })

  it('should create a "salida" movement and update warehouse product quantity', async () => {
    const mockMovementData = {
      movement_id: 'mov2',
      warehouse_id: '1',
      store_id: 'store1',
      product_id: '1',
      movement_type: 'salida' as 'entrada' | 'salida',
      quantity: 5,
      reason: 'Venta',
      movement_date: new Date(),
      user_id: '1',
      observations: '',
    }

    const mockWarehouseProduct = {
      id: '1',
      warehouse_id: '1',
      product_id: '1',
      quantity: 10,
      save: jest.fn(),
    }
    mockWarehouseProduct.save = jest.fn().mockResolvedValue(mockWarehouseProduct);


    const mockCreatedMovement = { ...mockMovementData, id: 'mov2' };

    (warehouseMovementProductValidation as jest.Mock).mockReturnValue({ success: true, data: mockMovementData });
    (WarehouseMovementProduct.create as jest.Mock).mockResolvedValue(mockCreatedMovement);
    (WarehouseProduct.findOne as jest.Mock).mockResolvedValue(mockWarehouseProduct)

    const result = await serviceCreatewarehouseMovementProduct(mockMovementData)

    expect(warehouseMovementProductValidation).toHaveBeenCalledWith(mockMovementData)
    expect(WarehouseMovementProduct.create).toHaveBeenCalledWith(
      expect.objectContaining({
        warehouse_id: mockMovementData.warehouse_id,
        store_id: mockMovementData.store_id,
        product_id: mockMovementData.product_id,
        movement_type: mockMovementData.movement_type,
        quantity: mockMovementData.quantity,
        observations: mockMovementData.observations,
      }),
    )
    expect(WarehouseProduct.findOne).toHaveBeenCalledWith({
      where: { warehouse_id: mockMovementData.warehouse_id, product_id: mockMovementData.product_id },
    })
    expect(mockWarehouseProduct.save).toHaveBeenCalled()
    expect(result.success).toBe(true)
    expect(result.movement).toEqual(mockCreatedMovement)
    expect(result.warehouseProduct?.quantity).toBe(5) // 10 (initial) - 5 (salida)
  })

  it('should return an error for "salida" movement with insufficient quantity', async () => {
    const mockMovementData = {
      movement_id: 'mov3',
      warehouse_id: '1',
      store_id: 'store1',
      product_id: '1',
      movement_type: 'salida' as 'entrada' | 'salida',
      quantity: 15,
      reason: 'Venta',
      movement_date: new Date(),
      user_id: '1',
      observations: '',
    }

    const mockWarehouseProduct = {
      id: '1',
      warehouse_id: '1',
      product_id: '1',
      quantity: 10,
      save: jest.fn(),
    }
    mockWarehouseProduct.save = jest.fn().mockResolvedValue(mockWarehouseProduct);


    (warehouseMovementProductValidation as jest.Mock).mockReturnValue({ success: true, data: mockMovementData });
    (WarehouseMovementProduct.create as jest.Mock).mockResolvedValue({ ...mockMovementData, id: 'mov3' }); 
    (WarehouseProduct.findOne as jest.Mock).mockResolvedValue(mockWarehouseProduct)

    const result = await serviceCreatewarehouseMovementProduct(mockMovementData)

    expect(warehouseMovementProductValidation).toHaveBeenCalledWith(mockMovementData)
    // WarehouseMovementProduct.create will be called before the stock check
    expect(WarehouseMovementProduct.create).toHaveBeenCalledWith(
      expect.objectContaining({
        warehouse_id: mockMovementData.warehouse_id,
        store_id: mockMovementData.store_id,
        product_id: mockMovementData.product_id,
        movement_type: mockMovementData.movement_type,
        quantity: mockMovementData.quantity,
        observations: mockMovementData.observations,
      }),
    )
    expect(WarehouseProduct.findOne).toHaveBeenCalledWith({
      where: { warehouse_id: mockMovementData.warehouse_id, product_id: mockMovementData.product_id },
    })
    expect(mockWarehouseProduct.save).not.toHaveBeenCalled()
    expect(result.success).toBe(false)
    expect(result.error).toBe('Insufficient quantity in stock')
  })

  it('should return an error if WarehouseProduct is not found', async () => {
    // Explicitly type mockMovementData as any for this test case
    const mockMovementData: any = {
      movement_id: 'mov4',
      warehouse_id: '1',
      store_id: 'store1',
      product_id: '1',
      movement_type: 'entrada' as 'entrada' | 'salida',
      quantity: 10,
      reason: 'Stock initial',
      movement_date: new Date(),
      user_id: '1',
      observations: '',
    };

    (warehouseMovementProductValidation as jest.Mock).mockReturnValue({ success: true, data: mockMovementData });
    (WarehouseMovementProduct.create as jest.Mock).mockResolvedValue({ ...mockMovementData, id: 'mov4' });
    (WarehouseProduct.findOne as jest.Mock).mockResolvedValue(null) // WarehouseProduct not found

    const result = await serviceCreatewarehouseMovementProduct(mockMovementData)

    expect(warehouseMovementProductValidation).toHaveBeenCalledWith(mockMovementData)
    // WarehouseMovementProduct.create will be called before the WarehouseProduct.findOne check
    expect(WarehouseMovementProduct.create).toHaveBeenCalledWith(
      expect.objectContaining({
        warehouse_id: mockMovementData.warehouse_id,
        store_id: mockMovementData.store_id,
        product_id: mockMovementData.product_id,
        movement_type: mockMovementData.movement_type,
        quantity: mockMovementData.quantity,
        observations: mockMovementData.observations,
      }),
    )
    expect(WarehouseProduct.findOne).toHaveBeenCalledWith({
      where: { warehouse_id: mockMovementData.warehouse_id, product_id: mockMovementData.product_id },
    })
    expect(result.success).toBe(false)
    expect(result.error).toBe('WarehouseProduct not found')
  })

  it('should return a validation error for invalid movement_type', async () => {
    const mockMovementData = {
      movement_id: 'mov5',
      warehouse_id: '1',
      store_id: 'store1',
      product_id: '1',
      movement_type: 'transfer' as any, // Invalid type
      quantity: 10,
      reason: 'Transferencia',
      movement_date: new Date(),
      user_id: '1',
      observations: '',
    }

    // Adjust the mock to match ZodError structure
    const validationError = { 
      success: false, 
      error: { issues: [{ message: 'Invalid movement_type' }] } 
    };
    (warehouseMovementProductValidation as jest.Mock).mockReturnValue(validationError)

    const result = await serviceCreatewarehouseMovementProduct(mockMovementData)

    expect(warehouseMovementProductValidation).toHaveBeenCalledWith(mockMovementData)
    expect(WarehouseMovementProduct.create).not.toHaveBeenCalled()
    expect(WarehouseProduct.findOne).not.toHaveBeenCalled()
    expect(result.success).toBe(false)
    expect(result.error).toEqual(validationError.error.issues) 
  })
})
