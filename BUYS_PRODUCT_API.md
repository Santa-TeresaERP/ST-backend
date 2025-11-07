# API Documentation - BuysProduct CRUD

## 🔗 Base URL
```
http://localhost:3005/buysProduct
```

## 🔐 Autenticación
Todas las rutas requieren:
- **Header**: `Authorization: Bearer <token>`
- **Permisos del módulo**: `inventario`

---

## 📋 Endpoints Disponibles

### 1. **GET /** - Obtener compras activas (status = true)
Obtiene solo las compras de productos con status activo.

**Permiso requerido**: `canRead` en módulo `inventario`

**Response 200**:
```json
[
  {
    "id": "uuid",
    "warehouse_id": "uuid",
    "product_id": "uuid",
    "quantity": 100,
    "unit_price": 15.50,
    "total_cost": 1550.00,
    "supplier_id": "uuid",
    "entry_date": "2025-01-15T00:00:00.000Z",
    "status": true,
    "product": {
      "name": "Producto A",
      "description": "Descripción",
      "status": true
    },
    "warehouse": {
      "name": "Almacén Principal"
    },
    "supplier": {
      "suplier_name": "Proveedor XYZ"
    }
  }
]
```

---

### 2. **GET /all** - Obtener todas las compras (sin filtro)
Obtiene TODAS las compras sin importar el status (para desarrolladores).

**Permiso requerido**: `canRead` en módulo `inventario`

**Response 200**: Mismo formato que GET /

---

### 3. **GET /:id** - Obtener compra por ID
Obtiene una compra específica por su ID.

**Permiso requerido**: `canRead` en módulo `inventario`

**Parámetros**:
- `id` (path): UUID de la compra

**Response 200**: Objeto individual (mismo formato que array)

**Response 404**:
```json
{
  "error": "BuysProduct not found"
}
```

---

### 4. **POST /** - Crear nueva compra
Crea una nueva compra de producto. Si ya existe un registro con el mismo warehouse_id y product_id, **actualiza las cantidades acumuladas**.

**Permiso requerido**: `canWrite` en módulo `inventario`

**Body**:
```json
{
  "warehouse_id": "uuid",
  "product_id": "uuid",
  "quantity": 100,
  "unit_price": 15.50,
  "total_cost": 1550.00,
  "supplier_id": "uuid",
  "entry_date": "2025-01-15",
  "status": true
}
```

**Validaciones**:
- `warehouse_id`: UUID válido, requerido
- `product_id`: UUID válido, requerido
- `quantity`: Número positivo, requerido
- `unit_price`: Número positivo, requerido
- `total_cost`: Número positivo, requerido
- `supplier_id`: UUID válido, requerido
- `entry_date`: Fecha válida, requerida
- `status`: Boolean, opcional (default: true)

**Response 201** (Nuevo registro):
```json
{
  "success": true,
  "product": { /* datos del producto creado */ },
  "movement": { /* movimiento de almacén creado */ },
  "action": "created",
  "message": "Registro creado exitosamente"
}
```

**Response 200** (Registro existente actualizado):
```json
{
  "success": true,
  "product": { /* datos del producto actualizado */ },
  "movement": { /* movimiento de almacén */ },
  "action": "updated",
  "message": "Registro actualizado. Cantidad anterior: 50, agregada: 100, total: 150"
}
```

**Response 400** (Error de validación):
```json
{
  "success": false,
  "error": "Error de validación",
  "details": [
    {
      "path": ["quantity"],
      "message": "La cantidad debe ser un número"
    }
  ],
  "body": { /* datos enviados */ }
}
```

---

### 5. **PATCH /:id** - Actualizar compra
Actualiza parcialmente una compra existente.

**Permiso requerido**: `canEdit` en módulo `inventario`

**Parámetros**:
- `id` (path): UUID de la compra

**Body** (todos opcionales):
```json
{
  "warehouse_id": "uuid",
  "product_id": "uuid",
  "quantity": 150,
  "unit_price": 16.00,
  "total_cost": 2400.00,
  "supplier_id": "uuid",
  "entry_date": "2025-01-16",
  "status": true
}
```

**Response 200**:
```json
{
  "id": "uuid",
  "warehouse_id": "uuid",
  "product_id": "uuid",
  "quantity": 150,
  "unit_price": 16.00,
  "total_cost": 2400.00,
  "supplier_id": "uuid",
  "entry_date": "2025-01-16T00:00:00.000Z",
  "status": true
}
```

**Response 400**:
```json
{
  "error": "Compra de producto no encontrada"
}
```

---

### 6. **PUT /:id** - Eliminar compra (soft delete)
Cambia el status de la compra a `false` (no elimina físicamente el registro).

**Permiso requerido**: `canDelete` en módulo `inventario`

**Parámetros**:
- `id` (path): UUID de la compra

**Response 200**:
```json
{
  "id": "uuid",
  "warehouse_id": "uuid",
  "product_id": "uuid",
  "quantity": 100,
  "unit_price": 15.50,
  "total_cost": 1550.00,
  "supplier_id": "uuid",
  "entry_date": "2025-01-15T00:00:00.000Z",
  "status": false
}
```

**Response 400**:
```json
{
  "error": "La compra de producto no existe"
}
```

---

## 🔑 Headers requeridos en todas las peticiones

```javascript
{
  "Authorization": "Bearer <tu_token_jwt>",
  "Content-Type": "application/json"
}
```

---

## 🚀 Ejemplo de uso con Axios/Fetch

### Fetch (JavaScript)
```javascript
const API_URL = 'http://localhost:3005/buysProduct';
const token = localStorage.getItem('token'); // o donde guardes el token

// GET - Obtener compras activas
fetch(`${API_URL}/`, {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log(data));

// POST - Crear compra
fetch(`${API_URL}/`, {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    warehouse_id: "uuid-del-almacen",
    product_id: "uuid-del-producto",
    quantity: 100,
    unit_price: 15.50,
    total_cost: 1550.00,
    supplier_id: "uuid-del-proveedor",
    entry_date: "2025-01-15",
    status: true
  })
})
.then(res => res.json())
.then(data => console.log(data));

// PATCH - Actualizar compra
fetch(`${API_URL}/${id}`, {
  method: 'PATCH',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    quantity: 150,
    unit_price: 16.00
  })
})
.then(res => res.json())
.then(data => console.log(data));

// PUT - Eliminar (soft delete)
fetch(`${API_URL}/${id}`, {
  method: 'PUT',
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

### Axios (JavaScript/TypeScript)
```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3005',
  headers: {
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
    'Content-Type': 'application/json'
  }
});

// GET - Obtener compras activas
const getBuysProducts = async () => {
  const { data } = await api.get('/buysProduct/');
  return data;
};

// GET - Obtener todas (con filtro /all)
const getAllBuysProducts = async () => {
  const { data } = await api.get('/buysProduct/all');
  return data;
};

// GET - Obtener por ID
const getBuysProductById = async (id) => {
  const { data } = await api.get(`/buysProduct/${id}`);
  return data;
};

// POST - Crear
const createBuysProduct = async (body) => {
  const { data } = await api.post('/buysProduct/', body);
  return data;
};

// PATCH - Actualizar
const updateBuysProduct = async (id, body) => {
  const { data } = await api.patch(`/buysProduct/${id}`, body);
  return data;
};

// PUT - Eliminar
const deleteBuysProduct = async (id) => {
  const { data } = await api.put(`/buysProduct/${id}`);
  return data;
};
```

---

## 📝 Notas importantes

1. **Acumulación automática**: Si creas una compra con el mismo `warehouse_id` y `product_id`, el sistema suma las cantidades en lugar de crear un registro duplicado.

2. **Movimientos de almacén**: Cada compra crea automáticamente un movimiento de almacén de tipo "entrada".

3. **Fechas**: El formato de fecha debe ser `YYYY-MM-DD` en el body. El backend lo convierte automáticamente a `YYYY-MM-DDT00:00:00` para evitar problemas de zona horaria.

4. **Soft delete**: El endpoint DELETE no elimina físicamente el registro, solo cambia `status` a `false`. Usa GET /all para ver registros eliminados.

5. **Validación de almacén**: El sistema valida que el almacén exista y esté activo antes de crear/actualizar.

---

## ✅ Para conectar desde el frontend:

1. ✅ Backend corriendo en `http://localhost:3005`
2. ✅ Rutas registradas automáticamente en `/buysProduct`
3. ✅ CORS habilitado
4. ✅ Necesitas un token JWT válido (obtenerlo del login)
5. ✅ Usuario debe tener permisos en módulo `inventario`

**¡Ya puedes consumir la API desde el frontend!** 🚀
