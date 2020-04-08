const   express      = require('express'),
        app          = express(),
        cors         = require('cors');
        parser       = require('body-parser'),
        port         = process.env.PORT || 13860,
        sessionCtl   = require('./controllers/session.ctl'),
        userCtl      = require('./controllers/user.ctl'),
        userHandler  = require('./authentication/authentication.ctl')

app.set('port', port);
app.use(cors());
app.use(parser.json({extended : true}));
app.use('/', express.static('./public'));

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Request-Method", "PUT, DELETE, GET, POST");
    res.header("HTTP/1.1 200 OK");
    res.set("Content-Type", "application/json");
    next();
});

/** Session routes */
app.get('/getAllSessions', sessionCtl.getAllSessions);
app.post('/addSession', sessionCtl.addSession);


/** User routes */
app.get('/login', [userCtl.getUser, userHandler.login]);
app.post('/register', [userCtl.addUser, userHandler.register]);

const server = app.listen(port, () => {
    console.log(`listening on port ${port}`);
});

app.all('*', (req, res) => {
    res.status(404).send(`{"result": "Failure", "error": "Bad Route"}`)
});