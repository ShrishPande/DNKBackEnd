const express = require('express')
const { protect } = require("../middleware/authMiddleware");
const { addProduct, fetchAllProducts, getProductById, getBusinessProducts, updateProduct, deleteProduct } = require('../Controllers/productController');

const Router= express.Router()

Router.post('/add',protect,addProduct)
Router.get('/fetch',fetchAllProducts)
Router.get('/get/:id',getProductById)
Router.get('/get/business/:id',getBusinessProducts)
Router.delete('/:id',deleteProduct)
Router.put('/:id',updateProduct)

module.exports = Router