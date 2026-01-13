require("dotenv/config")
const express = require('express')

const bookRouter = require('./routes/books.routes')
const authorRouter = require('./routes/author.routes')

const { loggerMiddleware } = require('./middlewares/logger')

const app = express()
const PORT = 8000

// Middlewares
app.use(express.json())
app.use(loggerMiddleware)

// Routes
app.use('/books', bookRouter)
app.use('/authors', authorRouter)

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}.`)
})