const express = require('express')
require('dotenv').config()
const mongoose = require('mongoose')

const PORT = 3001

const app = express()

const connectToDB = async () => {
    await mongoose.connect(process.env.MONGO_URI)
}

const disconnectDB = async () => {
    await mongoose.disconnect()
}

const dbConnection = () => {
    return mongoose.connection.readyState === 1;
}

app.use((req, res, next) => {
    console.log(req.path ,req.method)
    next()
})

app.get('/api', (req, res) => {
    res.status(200).json({'Connected to DB': dbConnection()})
})

app.post('/api', (req, res) => {
    res.status(200).json({'Success': 'Recieved request'})
})

app.put('/api', (req, res) => {
    res.status(200).json({'Success': 'Recieved request'})
})

app.listen(PORT, () => {
    connectToDB()
    console.log(`server started on port ${PORT}`)
})