const   User      = require('../models/user.js')

module.exports = {
    addUser: async (req, res, next) => {
        const {email = null, name = null, password = null, userType = null} = req.body.userBody
        const user = new User({name, email, password, userType})

        const response =  await User.findOne({email: email})
        if(response){
            return res.status(409).json({
                success: false,
                message: `user with ${email} is already exist`
            });
        }
        user.save().then( (result) => {
            req.registerResult = result
            next()
        },
        (err) =>{
            console.log(err)
            res.status(404).send(`{"success": false, "params":{"email": "${email}", "name": "${name}", "password": "${password}"}, "message": ${JSON.stringify(err)}}`)
        })
    },

    getUser: async (req, res, next) => {
        const email = req.query.email
        await User.findOne({email: email}).then(result => {
            if(result){
                req.loginResult = result
                next()
            }
            else 
            res.status(404).send(`{"success": false, "message": "No Documents Were Found"}`)
        }, err =>{
            res.status(404).send(`{"success": false, "message": "No Documents Were Found"}`)
        })
    },

    getStudentData: async (req, res, next) => {
        const studentData = {
            name: req.loginResult.name,
            email: req.loginResult.email,
            userType: req.loginResult.userType,
            configResult: req.configResult
        }
        res.status(200).json(studentData)
    },

    getAllStudents: async (req, res) => {
        const userType = 'student'

        await User.find({userType: userType}).then(result => {
            if(result.length){
                const allStudents = result.map(elem => {
                    return {
                        name: elem.name,
                        email: elem.email,
                        userType: elem.userType,
                    }
                })
                res.send(JSON.stringify(allStudents))
            }
            else res.status(404).send(`{"Failure": "No Documents Were Found"}`)
        }, err =>{
            res.status(404).send(`{"Failure": "No Documents Were Found"}`)
        });
    }
}