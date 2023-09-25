const Product = require("../models/Product")
const mongoose = require("mongoose")
const Order = require("../models/Order")

const calculatePrice =async(req,res)=>{
    try{
        const productId = req.params.id
        const {country,service,document} = req.body

        const collection = mongoose.connection.db.collection('customDetails')

        const result = await collection.findOne({country})

        if(!result.availableServices.includes(service)){
            return res.status(400).json("Service not found")
        }

        const product = await Product.findById(productId)
        if(service == "International Speed Post"){
            if(document){
                if(product.weight > country.EMSmwDocument ){
                    return res.status(400).json("Weight over limit")
                }else{
                    const extraPrice = country.EMSpriceDocumentOne +(product.weight-250)/country.EMSpriceDocumentTwo;
                    return res.status(200).json(extraPrice);
                }

            }else{
                if(product.weight > country.EMSmwMerch){
                    return res.status(400).json("Weight over limit")
                }else{
                    const extraPrice = country.EMSpriceMerchOne + (product.weight -250)/country.EMSpriceMerchTwo;
                    return res.status(200).json(extraPrice);
                }
            }
        }else if( service == "International Air Parcel"){
            if(product.length > 105 || product.weight > 20000){
                return res.status(400).json("Length or weight is over limit");
            }else{
                const extraPrice = country.IAPpriceOne + (product.weight -250)/country.IAPpriceTwo;
                return res.status(200).json(extraPrice);
            }
        }else {
            if(product.weight>2000){
                return res.status(400).json("Weight is over limit");
            }else{
                const extraPrice = country.ITPpriceOne+(product.weight-50)/country.ITPpriceTwo;
                return res.status(200).json(extraPrice);
            }
        }
        
    }catch(error){
        res.status(500).json({error:error.message})
    }
}

const orderProduct = async(req,res)=>{
    try{
        const productId = req.params.id
        const {address,customerId, BusinessId,price,qty} =req.body


        const order = new Order({
            productId,
            address,
            customerId,
            BusinessId,
            price,
            qty
        })

        const savedOrder = await order.save()

        return res.status(200).json(savedOrder)


    }catch(err){
        res.status(500).json({error:err.message})
    }
}

const fetchOrder = async(req,res)=>{
    try{
        const orderId = req.params.id;

        const {userId}= req.body

        const order = await Order.findById(orderId)

        if(userId !==order.customerId){
            return res.status(401).json("You are not authorized")
        }

        res.status(200).json(order)
    }catch(error){
        res.status(500).json({error:error.message})
    }
}


const fetchAllOrders = async(req,res)=>{
    try{
        const {userId} =req.body;

        const orders = await Order.find({customerId:userId})

        res.status(200).json(orders)
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

const fetchAllBusinessOrders = async(req,res)=>{
    try{
        const {BusinessId} = req.body;
        const orders = await Order.find({BusinessId})

        const notDispatchedOrder = orders.filter((order)=>order.dispatched===false)
        res.staus(200).json(notDispatchedOrder)
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

const dispatchOrder = async(req,res)=>{
    try{
        const {orderId} = req.params.id

        const {PBEnumber, ArticleNumber, location} = req.body
        const order = await Order.findByIdAndUpdate(orderId,{
            PBEnumber,
            ArticleNumber,
            location
        })

        if(!order){
            return res.status(400).json("order not found")
        }

        const product = await Product.findById(order.productId)
        
        product.qty = product.qty-1;
        await Product.save()
        order.dispatched = true;
        
        await order.save()

        res.status(200).json("Order dispatched")
    }catch(err){
        res.status(500).json({error:err.message})
    }
}

const dispatchedOrder = async(req,res)=>{
    try{

        const {BusinessId} = req.patams.id;
        const orders = await Order.findById(BusinessId)
        const dispatchedOrders = orders.filter((order)=>order.dispatched===true)

        res.status(200).json(dispatchedOrders)

    }catch(error){
        res.status(500).json({error:error.message})
    }
}



module.exports ={
    calculatePrice,
    orderProduct,
    dispatchOrder,
    dispatchedOrder,
    fetchAllBusinessOrders,
    fetchAllOrders,
    fetchOrder
}