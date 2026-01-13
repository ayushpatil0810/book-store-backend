const { BOOKS } = require('../models/book')

exports.getAllBooks = (req, res) => {
    res.setHeader('x-developer', 'Ayush')
    res.json(BOOKS)
}

exports.getBookById = (req, res) => {
    const id = parseInt(req.params.id)

    if(isNaN(id))
        return res
        .status(400)
        .json({error: "Id must be of type number"})

    const book = BOOKS.find(e => e.id === id) // SELECT * from books where id  = {id}
    
    if(!book) return res
    .status(404)
    .json({error: `Book with id ${id} does not exists!`})

    return res.json(book)
}

exports.addBook = (req, res) => {
    const { title, author } = req.body

    if(!title || title === "")
        return res.status(400).json({'error': 'title is required'})
    
    if(!author || author === "")
        return res.status(400).json({'error': 'author is required'})
    
    const id = BOOKS.length + 1;
    const book = {id, title, author}

    BOOKS.push(book)

    return res.status(201).json({'message': "Book Created successfully", id})
}

exports.deleteBookById = (req, res) => {
    const id = parseInt(req.params.id)
    
    if (isNaN(id)) 
        return res.status(400).json({error: "Id must be of type number"})

    const indexToDelete = BOOKS.findIndex(e => e.id === id)

    if (indexToDelete === -1) 
        return res
        .status(404)
        .json({error: `Book with id ${id} does not exists!`})

    BOOKS.splice(indexToDelete, 1)

    return res.status(200).json({'message' : "Book Deleted successfully"})

}