const express = require('express')
const { addBusiness, getBusiness, updateKYC, updateBusiness } = require('../Controllers/businessController')
const { protect } = require('../middleware/authMiddleware')

const Router = express.Router()

Router.post('/:id',protect,addBusiness)
Router.get('/:id',protect,getBusiness)
Router.put('/kyc/:id',protect,updateKYC)
Router.put('/:id',protect,updateBusiness)


module.exports= Router