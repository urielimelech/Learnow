const   Session      = require('../models/session.js'),
        ObjectId  = require('mongoose').Types.ObjectId;

module.exports = {
    addSession: (req, res) => {

        req.on('data', data=>{
            // console.log('data',data.toString())
            const {startTimeStamp = null, endTimeStamp = null, monitorData=[]} = JSON.parse(data.toString())
            const session = new Session({startTimeStamp, endTimeStamp,monitorData});
            session.save().then( (result) => {
                console.log(result);
                res.status(200).send(`{"result": "Success", "params": ${JSON.stringify(result)}}`);
                },
                (err) =>{
                    console.log(err);
                    res.status(404).send(`{"result": "Failure", "params":{"startTimeStamp": "${startTimeStamp}", "endTimeStamp": "${endTimeStamp}"}, "error": ${JSON.stringify(err)}}`);
                });
        })

        const {startTimeStamp = null, endTimeStamp = null, monitorData=[]} = req.body;
        
        
        
        
        
    }
}

