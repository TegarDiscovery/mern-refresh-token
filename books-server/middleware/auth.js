const jwt = require('jsonwebtoken')

function authMiddleware(req, res, next) {
    try {
        const authToken = req.header("Authorization")
        if (!authToken) {
            res.status(401)
            res.send({
                success: false,
                message: "Unauthorized",
            })
            return
        }
        const authTokenSplit = authToken.split(" ")
        if (authTokenSplit.length !== 2) {
            res.status(401)
            res.send({
                success: false,
                message: "Unauthorized",
            })
            return
        }

        const token = jwt.verify(authTokenSplit[1], process.env.JWT_ACCESS_SECRET)
        const tokenIatMs = token.iat * 1000

        if (Date.now() - tokenIatMs > 1 * 60 * 1000) {
            res.status(401)
            res.send({
                success: false,
                message: "Unauthorized",
            })
            return
        }

        res.locals.user = {
            id: token.id,
            email: token.email,
        }

        next()
    } catch (e) {
        console.error(e)
        if (e instanceof jwt.JsonWebTokenError) {
            res.status(401)
            res.send({
                success: false,
                message: "Unauthorized",
            })
            return
        }
        res.status(500)
        res.send({
            success: false,
            message: e.message,
        })
    }
}

module.exports = authMiddleware