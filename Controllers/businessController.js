const express = require("express");
const mongoose = require("mongoose");
const Business = require("../models/Business");
const addBusiness = async (req, res) => {
  try {
    const userId = req.params.id;
    const { companyName, IECcode, GSTIN, address, city, pincode, country } =
      req.body;

   let  business = await Business.findOne({ userId });

    if (business) {
      business = await Business.findByIdAndUpdate(business._id, {
        companyName,
        IECcode,
        GSTIN,
        address,
        city,
        pincode,
        country,
      });
      res.status(200).json(business);
    } else {
      const newBusiness = new Business({
        userId,
        companyName,
        IECcode,
        GSTIN,
        address,
        city,
        country,
        pincode,
      });

      newBusiness = await newBusiness.save();
      res.status(201).json(newBusiness);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getBusiness = async (req, res) => {
  try {
    const userId = req.params.id;
    const Business = await Business.findOne({ userId });

    res.status(200).json(Business);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateKYC = async (req, res) => {
  try {
    const businessId = req.params.id;
    const { KYC, KYCdocumentPath, KYCdate, KYCAuthority } = req.body;
    const Business = await Business.findById(businessId, {
      KYC,
      KYCdocumentPath,
      KYCdate,
      KYCAuthority,
    });

    res.status(200).json({ message: "KYC updated", Business });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateBusiness = async(req,res)=>{
    try{
        const businessId = req.params.id;
        const { address,city,country } = req.body;

        const Business = await Business.findByIdAndUpdate(bysinessId,{
            address,city,country
        })

        res.status(200).json(Business)
    }catch(err){
        res.status(500).json({error:err.message})
    }
}


module.exports = {addBusiness,getBusiness,updateKYC,updateBusiness}