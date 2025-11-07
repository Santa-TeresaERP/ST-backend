# 📊 Integración de Ingreso por Ventas de Productos

## 🎯 Objetivo

Registrar automáticamente un **ingreso general** en el módulo "Inventario" cada vez que se vende un producto, permitiendo el seguimiento de la rentabilidad de las ventas de productos individuales.

---

## 🔄 Flujo de Integración

### 1️⃣ **Creación de Venta con Detalles**

Cuando se crea una venta (`Sale`) con sus detalles (`SaleDetail`), el sistema:

```
POST /api/sale-detail
{
  "saleId": "uuid-de-la-venta",
  "productId": "uuid-del-producto",
  "quantity": 5,
  "mount": 250.00  // Monto total (precio * cantidad)
}
```

### 2️⃣ **Procesamiento Automático** (serviceCreateSaleDetail)

El servicio realiza las siguientes operaciones **automáticamente**:

1. ✅ Valida los datos del detalle de venta
2. ✅ Crea el registro `SaleDetail`
3. ✅ Busca el inventario de la tienda (`WarehouseStore`)
4. ✅ Reduce el stock del producto vendido
5. ✅ **[NUEVO]** Busca el registro de compra del producto (`BuysProduct`)
6. ✅ **[NUEVO]** Calcula el precio de venta unitario
7. ✅ **[NUEVO]** Registra el ingreso en `GeneralIncome` (módulo "Inventario")

---

## 📝 Detalles de la Implementación

### Archivo Modificado
- **`src/services/sale_detail/serviceCreateSaleDetail.ts`**

### Nuevas Importaciones
```typescript
import BuysProduct from '@models/buysProduct'
import Product from '@models/product'
import Warehouse from '@models/warehouse'
import Supplier from '@models/suplier'
import createProductIncome from '@services/GeneralIncome/CollentionFunc/Inventory/ProductIncome'
```

### Lógica Agregada

Después de actualizar el inventario de la tienda, el sistema:

1. **Busca el BuysProduct correspondiente:**
   ```typescript
   const buysProduct = await BuysProduct.findOne({
     where: { product_id: productId, status: true },
     include: [
       { model: Product, as: 'product', attributes: ['name'] },
       { model: Warehouse, as: 'warehouse', attributes: ['name'] },
       { model: Supplier, as: 'supplier', attributes: ['name'] }
     ],
     order: [['entry_date', 'DESC']]  // Más reciente primero
   })
   ```

2. **Calcula el precio de venta unitario:**
   ```typescript
   const saleUnitPrice = mount / quantity
   ```

3. **Llama a `createProductIncome` con los datos:**
   ```typescript
   await createProductIncome({
     warehouse_id: buysProduct.warehouse_id,
     product_id: buysProduct.product_id,
     unit_price: buysProduct.unit_price,       // Precio de compra
     total_cost: buysProduct.total_cost,
     supplier_id: buysProduct.supplier_id,
     quantity: quantity,                        // Cantidad vendida
     entry_date: new Date(),                    // Fecha de la venta
     status: buysProduct.status,
     product_name: productData?.name || 'Producto',
     warehouse_name: warehouseData?.name || 'Almacén',
     supplier_name: supplierData?.name || 'Proveedor',
     sale_price: saleUnitPrice                  // Precio al que se vendió
   })
   ```

---

## 🏗️ Estructura del Ingreso Generado

Cada venta de producto genera un registro en `general_incomes` con:

| Campo | Valor |
|-------|-------|
| `module_id` | ID del módulo "Inventario" |
| `income_type` | "Venta de Productos" |
| `amount` | `sale_price * quantity` |
| `date` | Fecha de la venta |
| `description` | Detalle completo (producto, cantidad, precios, almacén, proveedor) |
| `report_id` | ID del reporte financiero activo (si existe) |

### Ejemplo de Descripción Generada:
```
Venta de producto: Laptop HP - Cantidad: 2 - Precio unitario: S/. 1,500.00 - Almacén: Almacén Central - Proveedor original: TechStore SAC
```

---

## 🔍 Casos de Uso

### ✅ Caso 1: Venta Normal
```
COMPRA: Producto "Laptop" a S/. 1,000 c/u (5 unidades)
VENTA: Se venden 2 unidades a S/. 1,500 c/u
RESULTADO:
  - Stock reducido: 5 → 3 unidades
  - Ingreso registrado: S/. 3,000 (2 × 1,500)
  - Descripción: "Venta de producto: Laptop - Cantidad: 2 - Precio unitario: S/. 1,500.00..."
```

### ⚠️ Caso 2: Producto sin BuysProduct
```
VENTA: Se vende un producto que no tiene registro de compra
RESULTADO:
  - Stock reducido normalmente
  - ⚠️ Warning en consola: "No se encontró BuysProduct para producto XXX"
  - Venta procede exitosamente (no falla por falta de ingreso)
```

---

## 📊 Diferencias entre Ingresos

El sistema ahora registra **DOS tipos de ingresos** cuando hay ventas:

### 1️⃣ **Ingreso General de Venta** (Ya existía)
- **Módulo:** "Ventas"
- **Se registra en:** `serviceCreateSale.ts`
- **Representa:** Ingreso total de la venta completa
- **Función:** `createSalesIncome()`

### 2️⃣ **Ingreso por Venta de Productos** (NUEVO)
- **Módulo:** "Inventario"
- **Se registra en:** `serviceCreateSaleDetail.ts`
- **Representa:** Ingreso específico por cada producto vendido
- **Función:** `createProductIncome()`

**Ambos ingresos son complementarios y se registran para análisis diferentes.**

---

## 🛠️ Manejo de Errores

La integración está diseñada con **manejo de errores robusto**:

1. ✅ Si no se encuentra `BuysProduct` → Registra warning pero continúa
2. ✅ Si falla `createProductIncome` → Captura error en console.error pero NO falla la venta
3. ✅ La venta SIEMPRE se completa exitosamente (prioridad en la operación principal)

```typescript
try {
  // Lógica de registro de ingreso...
} catch (error) {
  console.error(`❌ Error registrando ingreso para producto ${productId}:`, error)
  // No falla la operación si el registro de ingreso falla
}
```

---

## 📈 Beneficios

1. **Trazabilidad Completa:** Cada venta de producto genera su registro de ingreso
2. **Análisis de Rentabilidad:** Comparar precio de compra vs venta por producto
3. **Reportes Detallados:** Ingresos del módulo "Inventario" separados de otros módulos
4. **Automático:** No requiere intervención manual del usuario
5. **Robusto:** No afecta la operación principal si falla el registro

---

## 🧪 Testing

### Probar la Integración:

1. **Crear una compra de producto:**
   ```bash
   POST /api/buys-product
   {
     "warehouse_id": "uuid-almacen",
     "product_id": "uuid-producto",
     "quantity": 10,
     "unit_price": 100,
     "total_cost": 1000,
     "supplier_id": "uuid-proveedor",
     "entry_date": "2025-11-06"
   }
   ```

2. **Crear una venta:**
   ```bash
   POST /api/sale
   {
     "income_date": "2025-11-06",
     "store_id": "uuid-tienda",
     "total_income": 300,
     "observations": "Venta de prueba"
   }
   ```

3. **Crear detalle de venta:**
   ```bash
   POST /api/sale-detail
   {
     "saleId": "uuid-venta-creada",
     "productId": "uuid-producto",
     "quantity": 2,
     "mount": 300
   }
   ```

4. **Verificar ingreso generado:**
   ```bash
   GET /api/general-income
   # Buscar ingreso con income_type = "Venta de Productos"
   ```

---

## 🔗 Archivos Relacionados

### Modelos
- `src/models/buysProduct.ts`
- `src/models/saleDetail.ts`
- `src/models/generalIncome.ts`

### Servicios
- `src/services/sale_detail/serviceCreateSaleDetail.ts` ← **MODIFICADO**
- `src/services/GeneralIncome/CollentionFunc/Inventory/ProductIncome.ts` ← **NUEVO**
- `src/services/GeneralIncome/serviceCreateGeneralIncome.ts`

### Controladores
- `src/controllers/SaleDetail/createSaleDetail.ts`

### Rutas
- `src/routes/saleDetail.ts`

---

## 📝 Logs del Sistema

El sistema genera logs informativos en cada operación:

```
➡️ [Inventario][Ingreso] Iniciando registro de ingreso por venta de producto...
📝 [Inventario][Ingreso] Payload: { module_id, income_type, amount, ... }
🔗 [Inventario][Ingreso] Asociado a reporte activo: uuid-reporte
✅ [Inventario][Ingreso] Creado correctamente
✅ [SaleDetail] Ingreso registrado para producto: uuid-producto
```

O en caso de advertencias:
```
⚠️ [SaleDetail] No se encontró BuysProduct para producto uuid-producto, ingreso no registrado
```

---

## 🎓 Notas Importantes

1. **La función NO se llama al crear `BuysProduct`** (eso sería un gasto, no un ingreso)
2. **Se llama SOLO al vender productos** mediante `SaleDetail`
3. **El precio de venta puede ser diferente al de compra** (margen de ganancia)
4. **Si un producto se vendió varias veces**, cada venta genera su propio ingreso
5. **Compatible con reportes financieros** existentes (se asocia automáticamente)

---

## ✅ Verificación de Implementación

- [x] Función `createProductIncome` creada
- [x] Integración en `serviceCreateSaleDetail`
- [x] Manejo de errores implementado
- [x] Logs informativos agregados
- [x] No afecta operación principal si falla
- [x] Validación con ESLint pasada
- [x] Documentación completa

---

**Fecha de Implementación:** 6 de Noviembre de 2025  
**Branch:** `feat-AddEntityBuysProdut`  
**Desarrollado por:** GitHub Copilot
