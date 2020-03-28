var mongoose    =               require('mongoose'),
    session     =               new mongoose.Schema({
        startTimeStamp:         Number,
        endTimeStamp:           Number,
        monitorData:            [],
        startQuizStamp:         Number,
        avarageAttention:       Number,
        avarageMeditation:      Number,
        lowestAttentionLevel:   [],
        highestAttentionLevel:  [],
        lowestMeditationLevel:  [],
        highestMeditationLevel: [],
        quizData:               {},
        answersQuiz:            [],
        correlation:            {},
        feedback:               []
    });


var Session = mongoose.model('Session', session);

module.exports = Session;