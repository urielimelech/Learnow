const jwt = require('jsonwebtoken')
const secret = require('../consts.js').secret

const checkToken = (req, res, next) => {
    const access = req.headers['x-access-token']
    if (access !== undefined) {
        const token = req.body.token
        if (!token) 
            return res.json({
                success: false,
                message: 'Auth token is not supplied'
            })
        try {
            const decoded = jwt.verify(token, secret)
            req.decoded = decoded
            next()
        }
        catch (err) {
            return res.json({
                success: false,
                message: 'Token is not valid'
            })
        }
    }
    else 
        return res.status(401).json({
            message: `Authorization denied`
        })
}

module.exports = {
  checkToken: checkToken
}