const express = require('express')
const PORT = 3001

const app = express()

app.use((req, res, next) => {
    console.log(req.path ,req.method)
    next()
})

app.get('/api', (req, res) => {
    res.status(200).json({'Success': 'Recieved request'})
})

app.post('/api', (req, res) => {
    res.status(200).json({'Success': 'Recieved request'})
})

app.put('/api', (req, res) => {
    res.status(200).json({'Success': 'Recieved request'})
})

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`)
})