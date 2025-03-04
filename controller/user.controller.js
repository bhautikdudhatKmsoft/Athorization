// const UserServices = require('../services/userService');
// const userServices = new UserServices();
// const jwt = require('jsonwebtoken');

// exports.registerUser = async(req,res) => {
//     try {
//         let user = await userServices.getUser({email : req.body.email});

//         if(user) {
//             return res.status(400).json({message : `User already registered.........`});
//         }
        
//         user = await userServices.addUser({...req.body});

//         await userServices.sendOTP(user);

//         res.status(201).json({user,message : `User register successfully............ OTP send to your email/phone`});

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message : `Interanal server error...........${console.error()}`});
//     }
// };

// exports.loginUser = async(req,res) => {
//     try {
//         let user = await userServices.getUser({email : req.body.email, isDelete : false});

//         if(!user) {
//             return res.status(404).json({message : `User is not registered.............`});
//         }

//         const otpValidate = await userServices.verifyOTP(user,req.body.otp);

//         if(!otpValidate) {
//             return res.status(401).json({message : `Invalid or expired OTP.....`})
//         }
        
//         let token = await jwt.sign({userId : user._id},'User');
//         console.log(token);

//         res.status(200).json({user,token,message : `User login successfully............`});

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message : `Interanal server error...........${console.error()}`});
//     }
// };

// exports.getAllUser = async(req,res) => {
//     try {
//         let users = await userServices.getAllUsers({isDelete : false});

//         if(!users) {
//             return res.status(404).json({message : `Users  not found......`});
//         }

//         res.status(200).json(users);

//     } catch (error) {
//         console.log(error);
//         res.status(500).json({message : `Internal server error.............${console.error()}`});
//     }
// }

const UserServices = require('../services/userService');
const StoreServices = require('../services/store.service');
const storeServices = new StoreServices();
const userServices = new UserServices();
const jwt = require('jsonwebtoken');

exports.sendOTP = async (req, res) => {
    try {
        let user = req.body.email

        user = await storeServices.addUser({ ...req.body });

        await storeServices.sendOTP(user);

        res.status(201).json({message: `OTP sent to your email.`});

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
};

exports.verifyOTP = async (req, res) => {
    try {
        let user = await storeServices.getUser({ email: req.body.email});
        
        if (!user) {
            return res.status(404).json({ message: `Email already found....` });
        }
        const otpValidate = await storeServices.verifyOTP(user, req.body.otp);

        if (!otpValidate) {
            return res.status(401).json({ message: `Invalid or expired OTP...` });
        }
        user = await storeServices.deleteUser(user._id);

        let data = await userServices.getUser({email : req.body.email});

        if(!data) {
            return res.status(404).json({message : `user does not registered........`});
        }


        let token = await jwt.sign({ userId: data._id }, 'User');
        console.log(token);
        
        res.status(200).json({token,message: `verify OTP successfully...` });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
};

exports.signUp = async(req,res) => {
    try {
        let user = await userServices.getUser({email : req.body.email});

        if(user) {
            return res.status(404).json({message : `User already found.............`});
        }

        let firstName = req.body.firstName;

        if(!firstName) {
            return res.json({message : `Invlude firstName.......`});
        }

        let lastName = req.body.lastName;

        if(!lastName) {
            return res.json({message : `lastName is not found.......`});
        }

        let mobileNumber = req.body.mobileNumber;

        if(!mobileNumber) {
            return res.json({message : `Mobile number is not found.......`});
        }
        
        user = await userServices.addUser({...req.body});

        let token = await jwt.sign({ userId: user._id }, 'User');
        console.log(token);


        res.status(201).json({user,token,message : `signUp ssucsessfully...............`});
    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Interanal server error..........${console.error()}`});
    }
}

exports.getAllUser = async (req, res) => {
    try {
        let users = await userServices.getAllUsers({ isDelete: false });

        if (!users) {
            return res.status(404).json({ message: `Users not found...` });
        }

        res.status(200).json(users);

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: `Internal server error: ${error.message}` });
    }
};

exports.logOut = async(req,res) => {
    try {
        let user = await userServices.getUserById(req.query.userId);

        if(!user) {
            return res.status(404).json({message : `User is already not found........`});
        }

        user = await userServices.updateUser(user._id,{isDelete : true});

        res.status(200).json({user,message : `User logout successfully........`});

    } catch (error) {
        console.log(error);
        res.status(500).json({message : `Internal server error..........${console.error()}`});
    }
}