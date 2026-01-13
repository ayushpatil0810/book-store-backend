const booksTable = require('../models/book.model')
const authorsTable = require('../models/author.model')

const db = require('../db')
const { eq } = require('drizzle-orm')
const { sql } = require("drizzle-orm")

exports.getAllBooks = async(req, res) => {
    const search = req.query.search

    if (search) {
        const books = await db.select().from(booksTable).where(sql`to_tsvector('english', ${booksTable.title}) @@ to_tsquery('english', ${search})`)
        return res.json(books)
    }

    const books = await db.select().from(booksTable)
    console.log(search)
    return res.json(books)
}

exports.getBookById = async (req, res) => {
    const id = req.params.id
    const [book] = await db
        .select()
        .from(booksTable)
        .where((table) => eq(table.id, id))
        .rightJoin(authorsTable, eq(booksTable.authorId, authorsTable.id))
        .limit(1)
    
    
    if(!book) return res
    .status(404)
    .json({error: `Book with id ${id} does not exists!`})

    return res.json(book)
}

exports.addBook = async(req, res) => {
    const { title, description, authorId } = req.body

    if(!title || title === "")
        return res.status(400).json({'error': 'title is required'})
    
    const [result] = await db.insert(booksTable).values({
        title,
        authorId,
        description
    }).returning({
        id: booksTable.id
    })



    return res.status(201).json({'message': "Book Created successfully", id: result.id})
}

exports.deleteBookById = async(req, res) => {
    const id = req.params.id
    
    await db.delete(booksTable).where(eq(booksTable.id, id))

    return res.status(200).json({'message' : "Book Deleted successfully"})

}