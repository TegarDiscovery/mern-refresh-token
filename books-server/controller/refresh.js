const jwt = require('jsonwebtoken')
const userSchema = require('../schema/user')

async function refreshController(req, res) {
    try {
        const { refresh_token } = req.body

        const token = jwt.verify(refresh_token, process.env.JWT_REFRESH_SECRET)

        const foundUser = await userSchema.findOne({ _id: token.id }, ['_id', 'email', 'full_name'])
        if (!foundUser) {
            res.status(400)
            res.send({
                success: false,
                message: 'User not found'
            })
            return
        }
        const accessTokenData = {
            id: foundUser._id,
            email: foundUser.email,
            full_name: foundUser.full_name,
        }
        const accessToken = jwt.sign(accessTokenData, process.env.JWT_ACCESS_SECRET)

        res.status(200)
        res.send({
            success: true,
            message: 'Refresh successful',
            data: {
                access_token: accessToken,
            }
        })

    } catch (e) {
        console.error(e)
        if (e instanceof jwt.JsonWebTokenError) {
            res.status(400)
            res.send({
                success: false,
                message: "Refresh token invalid",
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

module.exports = refreshController