const JWT = require('jsonwebtoken')
const {UnauthenticatedError} = require('../errors')

const authMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new UnauthenticatedError('No Token provided')
    }

    const token = authHeader.split(' ')[1]

    try {
        const decoded = JWT.verify(token, process.env.JWT_SECRET)
        const {id, email} = decoded
        req.user = {id, email}
        next()
    } catch (error) {
        throw new UnauthenticatedError('Not authorized to access this route')
    }
}

module.exports = authMiddleware