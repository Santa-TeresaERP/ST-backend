import { Request, Response } from 'express';
import useRoles from '@services/Roles';

export default async function deleteRole(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const success = await useRoles.deleteRole(id);

    if (!success) {
      return res.status(404).json({ error: 'Role not found' });
    }

    return res.status(200).json({ message: 'Role deleted successfully' });
  } catch (error) {
    console.error('Error deleting role:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}