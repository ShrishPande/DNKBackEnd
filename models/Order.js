const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
    productId:{
        type:String,
        required:true,
    },
    dispatched:{
        type:Boolean,
        default:false,
    },
    address:{
        type:String,
        required:true,
    },

    price:{
        type:String,
        required:true,
    },
    customerId:{
        type:String,
        required:true,
    },

    BusinessId:{
        type:String,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
    },
    ArticleNumber:{
        type:Number,
        required:true,
        unique:true
    },
    PBENumber:{
        type:Number,
        required:true,
        unique:true
    },
    location:{
        type:String,
        required:true,
    }

},
{
    timestamps:true
})

const Order = mongoose.model('Order',orderSchema)