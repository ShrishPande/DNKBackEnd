const mongoose = require('mongoose')

const BusinessSchema = new mongoose.Schema({
    userId:{
        type:String,
        unique:true,
        required:true,
    },

    companyName:{
        type:String,
        required:true,
    },
    address:{
        type:String,
        required:true,
    },

    city:{
        type:String,
        required:true,
    },

    pinCode:{
        type:String,
    },

    picturePath:{
        type:String,
    },

    IECcode:{
        type:String,
        required:true,
    },

    GSTIN:{
        type:String,

    },

    ADCode:{
        type:String,

    },
    KYC:{
        type:String,

    },
    KYCdocumentPath:{
        type:String,

    },
    KYCdate:{
        type:String,
    },
    KYCAuthority:{
        type:String
    }


},
{
    timestamps:true,
})

const Business = mongoose.model('Business',BusinessSchema)
module.exports = Business