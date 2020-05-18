import { serverIOService, connectionToServerIO } from './controllers/SessionRecorder/index.js'

serverIOService.on('connection', soc => connectionToServerIO(soc))
console.log('learnow web server is running')