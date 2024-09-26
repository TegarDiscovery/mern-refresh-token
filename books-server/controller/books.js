const userSchema = require('../schema/user')

async function myBooksController(req, res) {
    try {
        const user = res.locals.user

        const foundUser = await userSchema.findOne({ _id: user.id }, ['_id', 'books'])
        if (!foundUser) {
            res.status(401)
            res.send({
                success: false,
                message: 'Unauthorized'
            })
            return
        }

        const books = foundUser.books.map(book => ({
            id: book._id,
            title: book.title,
            author: book.author,
            pages: book.pages,
        }))
        res.status(200)
        res.send({
            success: true,
            message: 'Get books successful',
            data: {
                books
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

module.exports = myBooksController