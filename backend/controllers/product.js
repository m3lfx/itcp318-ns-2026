const Product = require('../models/product')
const cloudinary = require('cloudinary')

exports.newProduct = async (req, res, next) => {
    console.log(req.files)
    let images = []
    if (typeof req.files === 'string') {
        images.push(req.files)
    } else {
        images = req.files
    }

    // if (typeof req.body.images === 'string') {
    //     images.push(req.body.images)
    // } else {
    //     images = req.body.images
    // }

    let imagesLinks = [];

    for (let i = 0; i < images.length; i++) {
        try {
            const result = await cloudinary.v2.uploader.upload(images[i].path, {
                folder: 'products',
                width: 150,
                crop: "scale",
            });

            imagesLinks.push({
                public_id: result.public_id,
                url: result.secure_url
            })

        } catch (error) {
            console.log(error)
        }

    }

    req.body.images = imagesLinks
    // req.body.user = req.user.id;

    const product = await Product.create(req.body);

    if (!product)
        return res.status(400).json({
            success: false,
            message: 'Product not created'
        })


    return res.status(201).json({
        success: true,
        product
    })
}