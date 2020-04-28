const   UserConfig      = require('../models/userConfig.js')
        // ObjectId  = require('mongoose').Types.ObjectId

module.exports = {
    addUserConfig: async (req, res, next) => {
        const {userEmail = null, config = null} = req.body
        console.log(userEmail)
        const userconfig = new UserConfig({userEmail, config})
        const response = await UserConfig.findOne({userEmail: userEmail})
        if(response){
            return res.status(409).json({
                success: false,
                message: `configuration of user with email: ${userEmail} already exist`
            });
        }
        userconfig.save()
        .then(result => {
            res.status(200).send(JSON.stringify(result))
        },
        (err) =>{
            console.log(err)
            res.status(404).send(`{"success": false, "params":{"email": "${userEmail}"}, "message": ${JSON.stringify(err)}}`)
        })
    },

    getUserConfigByEmail: async (req, res, next) => {
        const userEmail = req.query.userEmail
        await UserConfig.findOne({userEmail: userEmail}).then(result => {
            result.success = true
            if(result){
                res.status(200).send(JSON.stringify(result))
            }
            else 
            res.status(404).send(`{"success": false, "message": "No User Configuration Were Found"}`)
        }, err =>{
            res.status(404).send(`{"success": false, "message": "No User Configuration Were Found"}`)
        })
    },

    updateUserConfig: async (req, res, next) => {
        const {userEmail, config} = req.body
        const result = await UserConfig.findOneAndUpdate({userEmail: userEmail}, {config: config}, {returnOriginal: false, useFindAndModify: false})
        if (result)
            res.status(200).send(JSON.stringify(result))
        else   
            res.status(400).send(`{"success": false,, "message": could not update configuration}`)
    }
}