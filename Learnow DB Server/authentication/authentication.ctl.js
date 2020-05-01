const jwt = require('jsonwebtoken')
const secret = require('../consts.js').secret

module.exports = {
    login: (req, res) => {

        const enteredEmail = req.query.email
        const enteredPassword = req.query.password

        const dbEmail = req.loginResult.email
        const dbPass = req.loginResult.password 
        const dbName = req.loginResult.name 
        const userType = req.loginResult.userType

        if (enteredEmail && enteredPassword) {
            if (enteredEmail === dbEmail && enteredPassword === dbPass) {
                const token = getToken(enteredEmail, dbName)
                token.userType = userType
                token.configResult = req.configResult
                res.status(200).json(token)
            } else {
                res.status(403).json({
                success: false,
                message: 'Incorrect email or password'
                })
            }
        }
        else {
        res.status(400).json({
            success: false,
            message: 'Authentication failed! Please check the request'
        })
        }
    },
    register: (req, res, next) => {
        const email = req.registerResult.email
        const name = req.registerResult.name
        const token = getToken(email, name)
        token.configResult = req.configResult
        return res.status(200).send(token)
    }
}

const getToken = (email, name) => {
    const token = jwt.sign(
        { email: email },
        secret,
        { expiresIn: '2h' }
    )
    // return the JWT token for the future API calls
    return ({
        success: true,
        message: 'Authentication successful!',
        token: token,
        name: name
    })
}