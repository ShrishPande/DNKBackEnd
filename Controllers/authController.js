const express = require("express");
const User = require("../models/User");
const generateToken = require("../Config/generateToken");
const accountSid = "ACc2141718024917816f1b9f2e1f648178";
const authToken = "90b9c762bd1cdb0e2b57222d9464e278";

const client = require("twilio")(accountSid, authToken);


let OTP, user;
const registerUser = async (req, res) => {
  try {
    const { username, email, number,isSeller, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.status(409).json({ msg: "Username is already taken" });
    }

    user = new User({
      username,
      email,
      number,
      isSeller,
      password,
    });

    let digits = "0123456789";
    OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }

    await client.messages
      .create({
        body: `Your Otp verification for ${username} is ${OTP}`,
        messagingServiceSid: "MGa6f1761ef60b71049ee5452e4b0f8f3d",
        to: `${number}`,
      })
      .then(() => res.status(200).json({ msg: "message sent" }));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const verify = async (req, res) => {
  try {
    const { otp } = req.body;

    if (otp != OTP) {
      return res.status(400).json({ message: "Incorrect otp" });
    }

    user = await user.save();
    const {password,...returnUser} = user
    const token = generateToken(user._id);
    res.status(200).json({ token, user:returnUser });
    OTP=""
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


const verifyLogin = async(req,res)=>{
  try {
    const { otp } = req.body;

    if (otp != OTP) {
      return res.status(400).json({ message: "Incorrect otp" });
    }

    const {password,...returnUser} = user;
    const token = generateToken(user._id);
    res.status(200).json({ token, user:returnUser });
    OTP=""
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
}

const loginUser = async (req, res) => {
  try {
    const { number } = req.body;
    user =await User.findOne({ number });
    if (!user) {
      return res.status(404).json({ msg: "This number is not registered" });
    }

    let digits = "0123456789";
    OTP = "";
    for (let i = 0; i < 6; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }

    await client.messages
      .create({
        body: `Your Otp verification for ${user.username} is ${OTP}`,
        messagingServiceSid: "MGa6f1761ef60b71049ee5452e4b0f8f3d",
        to: `${number}`,
      })
      .then(() => res.status(200).json({ msg: "message sent" }));
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: error.message });
  }
};

const loginPassword = async(req,res)=>{
  try{
    const { username, pass} = req.body;
    const{password,...user}= User.findOne({username})

    if(user && user.matchPassword(pass)){
      res.status(200).json({token: generateToken(user._id),user})
    }else{
      res.status(401).json({message:"Invalid username or password"})
    }
  }catch(error){
    res.status(500).json({error:error.message})
  }
}

const updateUser = async(req,res)=>{
  try{
    const userId = req.params.id 
    const {address,city,country,pincode} = req.body;

    const user = await User.findByIdAndUpdate(userId,{
      address,city,country,pincode
    })

    res.status(200).json(user)
    
  }catch(err){
    res.status(500).json({error:err.message})
  }
}




module.exports = { registerUser,loginUser, verify,verifyLogin,loginPassword ,updateUser};
