const   Session      = require('../models/session.js')
        // ObjectId  = require('mongoose').Types.ObjectId;

module.exports = {
    addSession: (req, res) => {
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
            feedback                = [],
            activity                = '',
            isBroken                = null
        } = req.body
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
            feedback,
            activity,
            isBroken
        })
        session.save().then( (result) => {
                console.log(result)
                res.status(200).send(`{"result": "Success", "params": ${JSON.stringify(result)}}`);
            },
            (err) => {
                console.log(err);
                res.status(404).send(`{"result": "Failure", "params":{"startTimeStamp": "${startTimeStamp}", "endTimeStamp": "${endTimeStamp}"}, "error": ${JSON.stringify(err)}}`);
        })
    },
    getAllSessions: async (req, res) => {
        const userEmail = req.query.userEmail
        await Session.find({userEmail:userEmail}).then(result => {
            if(result.length)
                res.send(JSON.stringify(result));
            else res.status(404).send(`{"Failure": "No Documents Were Found"}`);
        }, err =>{
            res.status(404).send(`{"Failure": "No Documents Were Found"}`);
        });
    },
    getUserLastSession: async (req, res) => {
        const userEmail = req.query.userEmail
        await Session.find({userEmail:userEmail}).then(result => {
            result.sort((a,b) => a.startTimeStamp < b.startTimeStamp ? 1 : -1)
            if(result.length){
                res.send(JSON.stringify(result[0]));
            }
            else res.status(404).send(`{"Failure": "No Documents Were Found"}`)
        }, err =>{
            res.status(404).send(`{"Failure": "No Documents Were Found"}`)
        })
    }
}