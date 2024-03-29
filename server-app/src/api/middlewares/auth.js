const createError = require('http-errors')
const { verifyAccessToken } = require('../../helpers')

exports.verifyAuthorization = async (req, res, next) => {
    if (!req.headers.authorization) {
        return next(createError.Unauthorized())
    }
    const authHeader = req.headers.authorization
    const bearerToken = authHeader.split(' ')
    const accessToken = bearerToken[1]
    try {
        const user = await verifyAccessToken(accessToken)
        req.user = user
        next()
    } catch (error) {
        return next(createError.Unauthorized())
    }
}
