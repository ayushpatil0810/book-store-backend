const express = require('express')
const bookRouter = require('./routes/books.routes')
const { loggerMiddleware } = require('./middlewares/logger')

const app = express()
const PORT = 8000

// Middlewares
app.use(express.json())
app.use(loggerMiddleware)

// Routes
app.use('/books', bookRouter)

app.listen(PORT, () => {
    console.log(`Server is running on Port ${PORT}.`)
})