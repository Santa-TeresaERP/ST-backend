/**
 * Representa la estructura base de un registro en la tabla `GENERAL_EXPENSE`.
 */
export interface GeneralExpenseAttributes {
  id?: string;             // UUID, opcional al crear.
  module_id: string;       // UUID
  expense_type: string;    // VARCHAR
  amount: number;          // NUMERIC
  date: Date;              // Asumimos que se manejará como Date en la lógica.
  description?: string | null; // Asumimos TEXTO, opcional.
  report_id?: string | null;  // FK (UUID), opcional y puede ser nulo.
  createdAt?: Date;        // Añadido por Sequelize
  updatedAt?: Date;        // Añadido por Sequelize
}