import { serverIOService, connectionToServerIO } from './controllers/SessionRecorder/index.js'

serverIOService.on('connection', soc => connectionToServerIO(soc))