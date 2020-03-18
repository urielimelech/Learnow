var mongoose    = require('mongoose'),
    session        = new mongoose.Schema({
        startTimeStamp:   Number,
        endTimeStamp: Number,
        monitorData:  [],
        startQuizStamp: Number,
        quizData: {}
    });


var Session = mongoose.model('Session', session);

module.exports = Session;