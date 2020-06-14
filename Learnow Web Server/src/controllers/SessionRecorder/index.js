import http from 'http'
import io from 'socket.io'

import { serverConnectionOptions } from './ThinkgearOptions.js'
import { socketWithReact } from './ReactSocket/index.js'
import { socketWithThinkgear } from './ThinkgearSocket/index.js'

/** create http server to serve io requests */
const serverPort = serverConnectionOptions.port
const serverApp = http.createServer((req, res) => {
    res.write('This is a logic server of learnow application.\nGo here to learnow app -> https://learnow-5ed2b.firebaseapp.com/')
    res.end('')
})
serverApp.listen(serverPort)

export const serverIOService = io(serverApp)

var rooms = []
var userConfigs = []

/** on connection to serverIO to start serve */
export const connectionToServerIO = soc => {
    socketWithReact(serverIOService, soc, rooms, userConfigs)
    socketWithThinkgear(serverIOService, soc, rooms, userConfigs)
}