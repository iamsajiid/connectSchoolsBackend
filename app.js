require('dotenv').config()
require('express-async-errors')
const express = require('express')
const cors = require('cors')
const session = require('express-session');
const multer = require('multer');
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

const app = express()
const upload = multer();

const PORT = process.env.PORT || 3000
const connectDB = require('./db/connect')

const routes = require('./routes/Rschools')

app.use(upload.any())
app.use(session({
    secret: 'marksman',
    resave: false,
    saveUninitialized: false
  }));
app.use(cors())
app.use('/', routes)
app.use(express.json())
app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI)
        app.listen(PORT, ()=> {
            console.log(`listening to port ${PORT}...`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()