const jwt = require('jsonwebtoken')
const secret = require('../consts.js').secret

module.exports = {
    login: (req, res) => {

        const enteredEmail = req.query.email
        const enteredPassword = req.query.password

        const dbEmail = req.result.email
        const dbPass = req.result.password 
        const dbName = req.result.name 

        if (enteredEmail && enteredPassword) {
            if (enteredEmail === dbEmail && enteredPassword === dbPass) {
                const token = getToken(enteredEmail, dbName)
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
    register: (req, res) => {
        const email = req.result.email
        const name = req.result.name
        const token = getToken(email, name)
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