const express = require('express')

const router = express.Router()

router.get('/', (req, res) => {
    res.status(200).json({'GET': 'Get req sent'})
})

router.post('/', (req, res) => {
    res.status(200).json({'POST': 'Post req sent'})
})

router.put('/', (req, res) => {
    res.status(200).json({'PUT': 'Put req sent'})
})

router.delete('/', (req, res) => {
    res.status(200).json({'DELETE': 'Delete req sent'})
})

module.exports = router