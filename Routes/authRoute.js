const express = require('express');

const { registerUser, verify, loginUser, verifyLogin, loginPassword, updateUser } = require('../Controllers/authController');


const Router= express.Router()

Router.post('/register',registerUser)
Router.post('/login',loginUser)
Router.post('/verify',verify)
Router.post('/verifyLogin',verifyLogin)
Router.post('/loginPassword',loginPassword)
Router.put('/update',updateUser)

module.exports = Router