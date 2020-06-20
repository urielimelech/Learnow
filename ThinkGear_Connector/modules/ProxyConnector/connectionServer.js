import express from 'express'
import cors from 'cors'
import parser from 'body-parser'

import { getIP } from './ip.ctl.js'

const app = express()
const port = 5000

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
})

export const server = app.listen(port, () => {
    console.log(`listening on port ${port}`);
})

app.get('/getIP', getIP)

app.all('*', (req, res) => {
    res.status(404).send(`{"success": false, "message": "Bad Route"}`)
})