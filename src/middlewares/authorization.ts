import { Response, NextFunction } from 'express'
import { AuthRequest } from '../types/auth'
import { validateToken } from '../config/authJwt'
import { HttpError } from '../errors/http'

const authorization = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.header('Authorization')
        if (!authHeader || !authHeader.startsWith('Bearer')) throw new HttpError('Token not provided', 401)
        const token = authHeader.substring(7)
        const validation = validateToken(token)

        if (!validation) throw new HttpError('The token is not valid', 401)

        req.authUser = validation
        if (!req.authUser.isAdmin) {
            throw new HttpError('The resource you are accessing does not exist', 404)
        }
        next()
    } catch (err) {
        if (err instanceof HttpError) {
            res.status(err.statusCode).json({ error: err.message });
        } else {
            res.status(500).json({ error: 'Something was wrong' })
        }
    }
}

export default authorization
