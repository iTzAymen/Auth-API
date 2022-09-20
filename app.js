require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

// const connectDB = require('./db/connect')
const mainRouter = require('./routes/main')
const notFoundMiddleware = require('./middleware/not-found')
const errorMiddelware = require('./middleware/error-handler')

//middleware
app.use(express.static('./public'))
app.use(express.json())
app.use(express.urlencoded({extended: true}))

//routes
app.use('/api/v1', mainRouter)

//products routes
app.use(notFoundMiddleware)
app.use(errorMiddelware)

const port = process.env.PORT || 3000

const start = async () => {
    try {
        // await connectDB(process.env.MONGO_URI)
        app.listen(port, console.log(`Server listening to port ${port}...`))
    } catch (error) {
        console.log(error)
    }
}

start()