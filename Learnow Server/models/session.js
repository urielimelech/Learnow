var mongoose    = require('mongoose'),
    session        = new mongoose.Schema({
        startTimeStamp:   Number,
        endTimeStamp: Number,
        monitorData:  []
    });


var Session = mongoose.model('Session', session);

module.exports = Session;