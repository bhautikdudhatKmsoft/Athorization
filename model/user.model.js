const mongoose  = require('mongoose');

const userSchema = mongoose.Schema({

    firstName : {
        type : String,
    },

    lastName : {
        type : String,
    },

    email : {
        type : String,
        unique : true
    },

    mobileNumber : {
        type : Number,
    },
    
    otp : {
        type : String,
    },

    otpExpires : {
        type : Date,
        required : false
    },

    isDelete : {
        type : Boolean,
        default : false
    }

});

module.exports = mongoose.model('auth',userSchema);