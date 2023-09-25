const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./Routes/authRoute')
const productRoute = require('./Routes/ProductRoute')
const orderRoute = require('./Routes/orderRoute')
const businessRoute = require('./Routes/BusinessRoute')

const mongoose = require('mongoose');

const app=express()
app.use(express.json())
app.use(express.json({limit:"30mb",extended:true}))
app.use(express.urlencoded({limit:"30mb",extended:true}))
app.use(cors())
dotenv.config()


const PORT = process.env.PORT

mongoose.connect(process.env.MONGO_URI ,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>
    app.listen(PORT,()=>console.log("server is running" ))
).catch(err=>console.log(`could not connect${err}`))



app.use('/user',authRoute)
app.use('/products',productRoute)
app.use('/order',orderRoute)
app.use('/business',businessRoute)