const   Session      = require('../models/session.js')
        // ObjectId  = require('mongoose').Types.ObjectId;

module.exports = {
    addSession: (req, res) => {
        req.on('data', data=>{
            console.log('data db server',data.toString())
            const {
                userEmail               = null,
                startTimeStamp          = null,
                endTimeStamp            = null, 
                monitorData             = [], 
                startQuizStamp          = null, 
                avarageAttention        = null,
                avarageMeditation       = null,
                lowestAttentionLevel    = [],
                highestAttentionLevel   = [],
                lowestMeditationLevel   = [],
                highestMeditationLevel  = [],
                quizData                = {},
                answersQuiz             = [],
                correlation             = {},
                feedback                = []
            } = JSON.parse(data.toString())
            const session = new Session({
                userEmail,
                startTimeStamp, 
                endTimeStamp, 
                monitorData, 
                startQuizStamp, 
                avarageAttention,
                avarageMeditation,
                lowestAttentionLevel,
                highestAttentionLevel,
                lowestMeditationLevel,
                highestMeditationLevel, 
                quizData,
                answersQuiz,
                correlation,
                feedback
            });
            session.save().then( (result) => {
                console.log(result);
                res.status(200).send(`{"result": "Success", "params": ${JSON.stringify(result)}}`);
                },
                (err) =>{
                    console.log(err);
                    res.status(404).send(`{"result": "Failure", "params":{"startTimeStamp": "${startTimeStamp}", "endTimeStamp": "${endTimeStamp}"}, "error": ${JSON.stringify(err)}}`);
                });
        })
        // const {startTimeStamp = null, endTimeStamp = null, monitorData=[]} = req.body;
    },
    getAllSessions: async (req, res) => {
        Session.find({}).then(result => {
            console.log({result})
            if(result)
                res.send(JSON.stringify(result));
            else res.status(404).send(`{"Failure": "No Documents Were Found"}`);
        }, err =>{
            res.status(404).send(`{"Failure": "No Documents Were Found"}`);
        });
    }
}

