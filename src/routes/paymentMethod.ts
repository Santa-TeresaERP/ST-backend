import express from 'express'
import authorization from '@middlewares/authorization'
import PaymentMethodController from '@controllers/PaymentMethod'

const router = express.Router()

// Crear un nuevo método de pago
router.post(
  '/',
  authorization,
  PaymentMethodController.createPaymentMethodController,
)

// Obtener todos los métodos de pago
router.get(
  '/',
  authorization,
  PaymentMethodController.getPaymentMethodsController,
)

// Obtener un método de pago por ID
router.get(
  '/:id',
  authorization,
  PaymentMethodController.getPaymentMethodController,
)

// Actualizar un método de pago por ID
router.patch(
  '/:id',
  authorization,
  PaymentMethodController.updatePaymentMethodController,
)

// Eliminar un método de pago por ID
router.delete(
  '/:id',
  authorization,
  PaymentMethodController.deletePaymentMethodController,
)

export default router
