const mongoose = require("mongoose")


const ProductSchema = new mongoose.Schema({

    BusinessId:{
        type:String,
        required:true,
        
    },
    name:{
        type:String,
        required:true,
    },

    price:{
        type:Number,
        required:true,
    },

    images:[
        {
            type:String
        }
    ],
    weight:{
        type:Number,
        required:true,
    },
    length:{
        type:Number,
        required:true,
    },
    breadth:{
        type:Number,
        required:true,
    },
    height:{
        type:Number,
        required:true,
    },
    desc:{
        type:String,
        required:true,
    },
    qty:{
        type:Number,
        required:true,
        default:1
    }
},
{
    timestamps:true
}
)


const Product = mongoose.model('Product',ProductSchema);