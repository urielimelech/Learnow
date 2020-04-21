const jwt = require('jsonwebtoken')
const secret = require('../consts.js').secret

const checkToken = (req, res, next) => {
    const token = req.headers['x-jwt-token']
    if (!token) 
        return res.status(401).json({
            success: false,
            message: 'Auth token is not supplied'
        })
    try {
        const decoded = jwt.verify(token, secret)
        req.decoded = decoded
        return res.status(200).json({
            success: true,
            token: token,
            decoded: decoded
        })
        // next()
    }
    catch (err) {
        return res.status(403).json({
            success: false,
            message: 'Token is not valid'
        })
    }
    // else 
    // return res.status(401).json({
    //     message: `Authorization denied`
    // })
}

module.exports = {
  checkToken: checkToken
}