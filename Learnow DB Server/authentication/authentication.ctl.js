const express = require('express')
const jwt = require('jsonwebtoken')
const secret = require('../consts.js').secret
const middleware = require('./middleware')

module.exports = {
    login: (req, res) => {

        const enteredEmail = req.query.email
        const enteredPassword = req.query.password

        const dbEmail = req.result.email
        const dbPass = req.result.password

        if (enteredEmail && enteredPassword) {
            if (enteredEmail === dbEmail && enteredPassword === dbPass) {
                const token = jwt.sign({email: enteredEmail},
                secret,
                { 
                    expiresIn: '5h'
                }
                )
                // return the JWT token for the future API calls
                res.status(200).json({
                success: true,
                message: 'Authentication successful!',
                token: token
                })
            } else {
                res.status(403).json({
                success: false,
                message: 'Incorrect username or password'
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
    index: (req, res) => {
        res.json({
        success: true,
        message: 'Index page'
        })
    },
    register: (req, res) => {
        console.log('in register')
        console.log(req.body)
        // console.log(req)
    }
}

// Starting point of the server
function main () {
  const app = express() // Export app for other routes to use
  const handlers = new UserHandler()
  const port = process.env.PORT || 13860
  app.use(express.json({ // Middleware
    extended: true
  }))
  // Routes & Handlers
  app.post('/register', handlers.register)
  app.post('/login', handlers.login)
  app.get('/', middleware.checkToken, handlers.index)
  app.listen(port, () => console.log(`Server is listening on port: ${port}`))
}

// main()