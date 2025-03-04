const nodemailer = require('nodemailer');
const User = require('../model/store');
require('dotenv').config();

module.exports = class userSerivces {

    // Add user
    async addUser(body) {
        try {
            return await User.create(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }

    // Get user
    async getUser(body) {
        try {
            return await User.findOne(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }

    // Get user by ID
    async getUserById(id) {
        try {
            return await User.findById(id);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }

    // Get all users
    async getAllUsers(body) {
        try {
            return await User.find(body);
        } catch (error) {
            console.log(error);
            return error.message;
        }
    }

    // Generate OTP

    generateOTP() {
        const otp = Math.floor(100000 + Math.random() * 9000000);
        return otp.toString();
    }

    createTransporter() {
        return nodemailer.createTransport({
            service: 'gmail', 
            auth: {
                user: process.env.GMAIL_USER,
                pass: process.env.GMAIL_PASS,
            },
        });
    }

    async sendOTP(user) {
        const otp = this.generateOTP(); 
        user.otp = otp;
        user.otpExpires = Date.now() + 10 * 60 * 1000;
        await user.save();

        const mailOptions = {
            from: process.env.GMAIL_USER,
            to: user.email,
            subject: 'Your OTP Code',
            text: `Your OTP code is: ${otp}. It will expire in 10 minutes.`,
        };

        const transporter = this.createTransporter();
        try {
            await transporter.sendMail(mailOptions);
            console.log(`OTP sent to ${user.email}`);
        } catch (error) {
            console.log('Error sending OTP:', error);
        }
    }

    //  verifyOTP 

    async verifyOTP(user,otp) {

        if(user.otp !== otp){
            return false
        }
        if(user.otpExpires < Date.now()) {
            return false
        }
        return true;
    }

    // update user 

    async updateUser(id,body) {
        try {
            return await User.findByIdAndUpdate(id,{$set : body},{new : true});
        } catch (error) {
            console.log(error);
            return error.message;
        }
    };

    // delete user 

    async deleteUser(id) {
        try {
            return await User.findByIdAndDelete(id);
        } catch (error) {
            console.log(error)
            return error.message;
        }
    }
};
