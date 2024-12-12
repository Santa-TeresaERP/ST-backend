import jwt from 'jsonwebtoken';

const auth = (req, res, next) => {
    const authHeader = req.header('Authorization');
    console.log('Token recibido:', authHeader);
    if (!authHeader) {
        console.log('No se recibió token');
        return res.status(401).json({ message: 'No token, authorization denied' });
    }
    const token = authHeader.split(' ')[1];
    console.log('Token separado:', token);
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decoded.user;
        console.log('Usuario:', req.user);
        if (!req.user.isadmin) {
            console.log('Usuario no es admin');
            return res.status(403).json({ message: 'Access denied, not an admin' });
        }
        console.log('Autenticación exitosa');
        next();
    } catch (err) {
        console.error('Error al verificar el token:', err);
        res.status(401).json({ message: 'Token is not valid' });
    }
};

export default auth;
