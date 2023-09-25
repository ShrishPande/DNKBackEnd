const express = require('express');
const {calculatePrice,
    orderProduct,
    dispatchOrder,
    dispatchedOrder,
    fetchAllBusinessOrders,
    fetchAllOrders,
    fetchOrder}  = require("../Controllers/orderController");
const { protect } = require('../middleware/authMiddleware');

const Router = express.Router()

Router.get("/calculate/:id",calculatePrice)
Router.post("/order/:id",protect,orderProduct)
Router.post("/dispatch/:id",protect,dispatchOrder)
Router.get("/dispatch/:id",protect,dispatchedOrder)
Router.get("/business/:id",protect,fetchAllBusinessOrders)
Router.get("/user/:id",protect,fetchAllOrders)
Router.get("/:id",protect,fetchOrder)

module.exports = Router