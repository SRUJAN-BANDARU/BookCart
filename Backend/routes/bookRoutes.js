import express from 'express';
import { Book } from '../models/bookSchema.js';
const router = express.Router();

// Post route to add book
router.post('/', async (req, res) => {
    try {
        const {title, author, publishedYear} = req.body;
        if(!title || !author || !publishedYear){
            return res.status(400).json({message : "All fields are necessary"})
        }
        const newBook = {
            title,
            author,
            publishedYear
        }
        const book = await Book.create(newBook);
        res.status(200).send(book);
    } catch (error) {
        res.status(500).send({message : error.message})
    }
})

// To get all books

router.get("/", async (req, res) => {
    const books = await Book.find({});
    res.status(200).json({
        count : books.length,
        data : books
    });
})

// To get a particular book by its id

router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const book =await Book.findById(id);

        if(!book){
            return res.status(400).send("Book not found");
        } 
        res.status(200).send(book);
    } catch (error) {
        res.status(500).send("server error");
    }
})

// To update the details of any particular book

router.put("/:id", async(req, res) => {
    try {

        const id = req.params.id;
        const {title, author, publishedYear} = req.body;
        if(!title || !author || !publishedYear){
            return res.status(400).json({message : "All fields are necessary"})
        }
        const updatedBook = {
            title,
            author,
            publishedYear
        }

        const book = await Book.findByIdAndUpdate(id, updatedBook);
        if(!book){
            return res.status(404).json({message : "Book not found"});
        }

        res.status(200).send("Book Updated successfully");
    } catch (error) {
        res.status(500).send("server error")
    }
})


// Route to delete any particular book

router.delete("/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const result = await Book.findByIdAndDelete(id);
        if(!result){
            res.status(404).json({message : "Book not found"});
        }
        res.status(200).send({message : "Book deleted successfully"});
    } catch (error) {
        res.status(500).send({message : error.message})
    }
})

export default router;