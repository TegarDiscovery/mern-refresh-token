require('dotenv').config()
require('./database/mongo')
const express = require('express')
const cors = require('cors')

const port = process.env.APP_PORT

const loginController = require('./controller/login')
const registerController = require('./controller/register')
const refreshController = require('./controller/refresh')
const myBooksController = require('./controller/books')
const authMiddleware = require('./middleware/auth')

const app = express()

app.use(express.json())

app.use(cors())

app.post('/auth/register', registerController)

app.post('/auth/login', loginController)

app.post('/auth/refresh', refreshController)

app.get('/books', authMiddleware, myBooksController)

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})