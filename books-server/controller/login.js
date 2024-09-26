const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const userSchema = require('../schema/user')

async function loginController(req, res) {
    try {
        const { email, password } = req.body

        const foundUser = await userSchema.findOne({ email }, ['_id', 'email', 'password', 'full_name'])
        if (!foundUser) {
            res.status(400)
            res.send({
                success: false,
                message: 'Email not found'
            })
            return
        }

        const passwordOk = await bcrypt.compare(password, foundUser.password)
        if (!passwordOk) {
            res.status(401)
            res.send({
                success: false,
                message: 'Unauthorized'
            })
            return
        }

        const accessTokenData = {
            id: foundUser._id,
            email: foundUser.email,
            full_name: foundUser.full_name,
        }
        const refreshTokenData = {
            id: foundUser._id,
        }
        const accessToken = jwt.sign(accessTokenData, process.env.JWT_ACCESS_SECRET)
        const refreshToken = jwt.sign(refreshTokenData, process.env.JWT_REFRESH_SECRET)

        res.status(200)
        res.send({
            success: true,
            message: 'Login successful',
            data: {
                access_token: accessToken,
                refresh_token: refreshToken,
            }
        })

    } catch (e) {
        console.error(e)
        res.status(500)
        res.send({
            success: false,
            message: e.message,
        })
    }
}

module.exports = loginController