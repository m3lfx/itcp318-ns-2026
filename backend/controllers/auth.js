const User = require('../models/user');
const crypto = require('crypto')
const cloudinary = require('cloudinary')

exports.registerUser = async (req, res, next) => {
    console.log(req.body)
    const result = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: 'avatars',
        width: 150,
        crop: "scale"
    }, (err, res) => {
        console.log(err, res);
    });
    const { name, email, password, } = req.body;
    const user = await User.create({
        name,
        email,
        password,
        avatar: {
            public_id: result.public_id,
            url: result.secure_url
        },
    })
    //test token
    const token = user.getJwtToken();

    return res.status(201).json({
        success: true,
        user,
        token
    })
    // sendToken(user, 200, res)
}

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    // Checks if email and password is entered by user
    if (!email || !password) {
        return res.status(400).json({ error: 'Please enter email & password' })
    }


    // Finding user in database

    let user = await User.findOne({ email }).select('+password')
    if (!user) {
        return res.status(401).json({ message: 'Invalid Email or Password' })
    }


    // Checks if password is correct or not
    const isPasswordMatched = await user.comparePassword(password);


    if (!isPasswordMatched) {
        return res.status(401).json({ message: 'Invalid Email or Password' })
    }
    const token = user.getJwtToken();

    res.status(201).json({
        success: true,
        token,
        user
    });
    //  user = await User.findOne({ email })
    // sendToken(user, 200, res)
}