const mongoose = require('mongoose');

const storeSchema = mongoose.Schema({

    email : {
        type : String
    },

    otp : {
        type : String
    },

    isDelete : {
        type : Boolean,
        default : false
    }
});

module.exports = mongoose.model('store',storeSchema);