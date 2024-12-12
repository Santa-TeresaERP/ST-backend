import { Response, NextFunction } from 'express'
import { AuthRequest } from '@type/auth'
import { validateToken } from '@jwt'
import { HttpError } from '@error/http'

const authorization = (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.header('Authorization')
        if (!authHeader || !authHeader.startsWith('Bearer')) throw new HttpError('Token not provided', 401)
        const token = authHeader.substring(7)
        const validation = validateToken(token)

        if (!validation) throw new HttpError('The token is not valid', 401)

        req.authUser = validation
        if (!req.authUser.is_admin) {
            throw new HttpError('The resource you are accessing does not exist', 404)
        }
        next()
    } catch (err) {
        if (err instanceof HttpError) {
            res.status(err.statusCode).json({ message: err.message });
        } else {
            res.status(500).json('Something was wrong')
        }
    }
}

export default authorization
