var mongoose          = require('mongoose'),
    comparisonResult  = new mongoose.Schema({
        userEmail:              String,
        startTimeStamp:         [],
        activity:               [],
        comparisonData:         {}
    });

var ComparisonResult = mongoose.model('ComparisonResult', comparisonResult);

module.exports = ComparisonResult;