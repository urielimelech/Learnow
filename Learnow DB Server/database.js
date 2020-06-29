const mongoose    = require('mongoose'),
    //   url         = process.env.MLAB_URL,
    
    consts = require('./consts'),
    url = consts.MLAB_URL,
      options     = {
            useNewUrlParser:    true,
            useUnifiedTopology: true,
            // user:               process.env.DB_USER,
            // pass:               process.env.DB_PASS,
            user:               consts.DB_USER,
            pass:              consts.DB_PASS,
    };

mongoose.connect(url ,options).then(
        () => {
            console.log('connected');
        },
        err => {
            console.log(`connection error: ${err}`);
        }
);