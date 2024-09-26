const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    full_name: String,
    email: String,
    password: String,
    books: Array,
})

module.exports = mongoose.model('users', userSchema)