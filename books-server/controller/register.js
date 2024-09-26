const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const userSchema = require('../schema/user')

async function registerController(req, res) {
    try {
        const { email, password, full_name } = req.body

        const existingUser = await userSchema.findOne({ email })
        if (existingUser) {
            res.status(400)
            res.send({
                success: false,
                message: 'User already exist'
            })
            return
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = {
            email,
            password: hashedPassword,
            full_name,
            books: [
                {
                    _id: new mongoose.Types.ObjectId(),
                    title: 'Buku Berburu',
                    author: 'Mario Prasetya Mulya',
                    pages: 1154,
                },
                {
                    _id: new mongoose.Types.ObjectId(),
                    title: 'Matematika Menyenangkan',
                    author: 'Bambang Supradnya',
                    pages: 323,
                },
                {
                    _id: new mongoose.Types.ObjectId(),
                    title: 'Sejarah Dunia yang Disembunyikan',
                    author: 'Karen',
                    pages: 948,
                },
            ]
        }
        await mongoose.connection.collection('users').insertOne(user)

        res.status(201)
        res.send({
            success: true,
            message: 'User successfully created'
        })
    } catch (e) {
        console.error(e)
        res.status(500)
        res.send({
            success: false,
            message: e,
        })
    }
}

module.exports = registerController