const   ComparisonResult      = require('../models/comparisonResult.js')
        // ObjectId  = require('mongoose').Types.ObjectId;

module.exports = {
    addComparisonResult: (req, res) => {
        const {userEmail = '', startTimeStamp = [], activity = '', comparisonData = {}} = req.body
        const comparisonResult = new ComparisonResult({
            userEmail,
            startTimeStamp, 
            activity,
            comparisonData
        })
        comparisonResult.save().then( (result) => {
            console.log(result);
            res.status(200).send(`{"result": "Success", "params": ${JSON.stringify(result)}}`);
            },
            (err) =>{
                console.log(err);
                res.status(404).send(`{"result": "Failure", "params":${JSON.stringify(result)}, "error": ${JSON.stringify(err)}}`);
        })
    },
    getAllComparisonResult: async (req, res) => {
        const userEmail = req.query.userEmail
        await ComparisonResult.find({userEmail:userEmail}).then(result => {
            console.log({result})
            if(result)
                res.send(JSON.stringify(result));
            else res.status(404).send(`{"Failure": "No Documents Were Found"}`);
        }, err =>{
            res.status(404).send(`{"Failure": "No Documents Were Found"}`);
        });
    }
}