const   User      = require('../models/user.js')
        // ObjectId  = require('mongoose').Types.ObjectId

module.exports = {
    addUser: async (req, res, next) => {
        const {email = null, name = null, password = null} = req.body
        const user = new User({name, email, password})

        const response =  await User.findOne({email: email})
        if(response){
            return res.status(409).json({
                success: false,
                message: `user with ${email} is already exist`
            });
        }
        user.save().then( (result) => {
            req.result = result
            next()
        },
        (err) =>{
            console.log(err)
            res.status(404).send(`{"result": "Failure", "params":{"email": "${email}", "name": "${name}", "password": "${password}"}, "error": ${JSON.stringify(err)}}`)
        })
    },

    getUser: async (req, res, next) => {
        const email = req.query.email
        await User.findOne({email: email}).then(result => {
            if(result){
                req.result = result
                next()
            }
            else res.status(200).send(`{"result": "Failure", "response": "No Documents Were Found"}`)
        }, err =>{
            res.status(404).send(`{"result": "Failure", "response": "No Documents Were Found"}`)
        })
    }
}