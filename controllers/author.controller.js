const authorsTable = require('../models/author.model')
const booksTable = require('../models/book.model')
const db = require('../db')
const { eq, ilike } = require('drizzle-orm')
const { sql } = require("drizzle-orm")

exports.getAllAuthors = async(req, res) => {
    const search = req.query.search

    // if (search) {
    //     const authors = await db.select().from(AuthorsTable).where(sql`to_tsvector('english', ${AuthorsTable.lastName}) @@ to_tsquery('english', ${search})`)
    //     return res.json(authors)
    // }

    const authors = await db.select().from(authorsTable)
    return res.json(authors)
}

exports.getAuthorById = async (req, res) => {
    const id = req.params.id
    const [Author] = await db
        .select()
        .from(authorsTable)
        .where((table) => eq(table.id, id))
        .limit(1)
    
    
    if(!Author) return res
    .status(404)
    .json({error: `Author with id ${id} does not exists!`})

    return res.json(Author)
}

exports.addAuthor = async(req, res) => {
    if (!req.body) {
        return res.status(400).json({error: 'Request body is required'})
    }
    const { firstName, lastName, email } = req.body

    if(!firstName || firstName === "")
        return res.status(400).json({'error': 'firstname is required'})
    
    const [result] = await db.insert(authorsTable).values({
        firstName,
        lastName,
        email
    }).returning({
        id: authorsTable.id
    })
    return res.status(201).json({'message': "Author Created successfully", id: result.id})
}
exports.getBookByAuthors = async (req, res) => {
    const books = await db.select().from(booksTable).where(eq(booksTable.authorId, req.params.id))
    return res.json(books)
}   

