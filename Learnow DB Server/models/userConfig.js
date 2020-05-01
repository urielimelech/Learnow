var mongoose    =               require('mongoose'),
    userconfig  =               new mongoose.Schema({
        userEmail:              
            {
                type: String,
                required: true
            },
        config:
            {
                type: Object,
                required: true
            }
    });

var UserConfig = mongoose.model('userconfig', userconfig);

module.exports = UserConfig;