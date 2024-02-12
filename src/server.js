const express = require('express')
const dotenv = require('dotenv').config()
const contactRoute = require('../routes/contactRoutes')
const userRoutes = require('../routes/userRoutes')
const errorHandler = require('../middleware/errorHandler')
const connectDb = require('../config/dbConnections')

connectDb()
const app = express()

app.use(express.json())
app.use('/api/contacts',contactRoute)
app.use('/api/users',userRoutes)
app.use(errorHandler)
 
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))