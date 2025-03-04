const userRoute = require('express').Router();
const {
    sendOTP,
    verifyOTP,
    signUp,
    getAllUser,
    logOut
} = require('../controller/user.controller');

const { userVerifyToken } = require('../helper/userVerifyToken');

userRoute.post('/sendOTP', sendOTP);
userRoute.post('/verifyOTP', verifyOTP);
userRoute.post('/signUp',signUp)
userRoute.get('/getAllUsers', userVerifyToken, getAllUser);
userRoute.delete('/logout',userVerifyToken,logOut);

module.exports = userRoute;
