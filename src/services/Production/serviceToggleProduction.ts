import Production from '@models/production'

const serviceToggleProduction = async (id: string) => {
  const production = await Production.findByPk(id);
  if (!production) return { error: 'Registro no existe' };

  production.isActive = !production.isActive;
  await production.save();

  console.log(`Estado de producción con ID ${id} cambiado a ${production.isActive ? 'activo' : 'inactivo'}`);

  return { 
    message: `Registro marcado como ${production.isActive ? 'activo' : 'inactivo'}`, 
    production 
  };
};

export default serviceToggleProduction;
