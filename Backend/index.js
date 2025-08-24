import express from 'express';
import { PORT, mongDBURL } from './config.js';
import mongoose from 'mongoose';
import { Book } from './models/bookSchema.js';
import bookRoutes from './routes/bookRoutes.js';
import cors from 'cors';

const app = express();

app.use(cors());

// app.use(cors({
//     origin : 'http://localhost:3000',
//     methods : ['GET', 'POST', 'PUT', 'DELETE'],
//     allowedHeaders : ['content-Type']
// }))

app.get('/', (req, res) => {
    res.send("Welcome to the bookCart");
})
app.use(express.json())

app.use('/books', bookRoutes);

mongoose.connect(mongDBURL).
then(() => {
    console.log("App connected to database")
    app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`);
    
})
}).catch((err) => {
    console.log(err);
})