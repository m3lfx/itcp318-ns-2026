const User = require('../models/user')
const jwt = require("jsonwebtoken")

exports.isAuthenticatedUser = async (req, res, next) => {

    const token  = req.header('Authorization').split(' ')[1];
     console.log(token)
   

    if (!token) {
        return res.status(401).json({ message: 'Login first to access this resource' })
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = await User.findById(decoded.id);

    next()
};

exports.authorizeRoles = (...roles) => {

    return (req, res, next) => {
        // console.log(roles, req.user, req.body);
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: `Role (${req.user.role}) is not allowed to acccess this resource` })

        }
        next()
    }
}