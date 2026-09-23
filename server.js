import express from 'express';
import dotenv from 'dotenv'
import routes from './routes/movieRoutes.js'

dotenv.config()

const app = express()

app.use("/api", routes)

app.get('/', (req, res) => {
    res.json({
        "message": "Hello welcome to the Movie Finder API!"
    })
})

app.listen(process.env.PORT, () => {
    console.log(`Server is running at http://localhost:${process.env.PORT}`);
})