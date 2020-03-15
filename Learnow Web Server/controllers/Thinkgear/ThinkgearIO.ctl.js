import http from 'http'
import io from 'socket.io'

import { serverConnectionOptions } from './ThinkgearOptions.js'
import { dataBaseOptions } from './DataBaseOptions.js'

/** create http server to serve io requests */
const serverPort = serverConnectionOptions.port
const serverHost = serverConnectionOptions.host
const serverApp = http.createServer()
serverApp.listen(serverPort, serverHost)

export const serverIOService = io(serverApp)

var ready = false
var sessionData = {
    startTimeStamp: 0,
    endTimeStamp: 0,
    monitorData: []
}

const resetSessionData = () => {
    sessionData.startTimeStamp = 0
    sessionData.endTimeStamp = 0
    sessionData.monitorData = []
}

/** define a socket to database */
const createSocketToDataBase = () => {
    return http.request(dataBaseOptions, (res) => {
        res.on('data', data => {
            process.stdout.write(data)
        })
        res.on('end', () => {
            res.destroy()
            console.log('end session socket')
        })
        res.on('error', (error) => {
            console.log('error: ', error)
        })
    })
}

const writeSessionToDataBase = () => {
    sessionData.startTimeStamp = sessionData.monitorData[0].timeStamp
    sessionData.endTimeStamp = sessionData.monitorData[sessionData.monitorData.length-1].timeStamp
    const socketToDataBase = createSocketToDataBase()
    socketToDataBase.write(JSON.stringify(sessionData))
    socketToDataBase.end()
    resetSessionData()
}

/** on connection to serverIO to start serve */
export const connectionToServerIO = soc => {
    soc.emit('connected', 'connection established')

    /** fetch data from neurosky TGC server and send it to react client */
    soc.on('session data', data => {
        console.log(ready)
        console.log('data: ', data)
        if (ready){
            serverIOService.sockets.emit('data to client', data)
            data = JSON.parse(data)
            console.log('data after parse: ', data)
            sessionData.monitorData.push(data)
        }
    })

    /** get notification if headset stopped from sending data */
    soc.on('session ended from headset', () => {
        serverIOService.sockets.emit('session ended from headset', )
        console.log('session ended from serverIOService')
        writeSessionToDataBase()
        console.log('session ended')
        soc.disconnect(true)
        ready = false
    })

    /** get notification from client if video started */
    soc.on('ready for data stream', () => {
        console.log('user started video')
        ready = true
    })

    /** get notification from client if video ended */
    soc.on('end of video', () => {
        console.log('end of video')
        writeSessionToDataBase()
        serverIOService.sockets.emit('session ended by video', )
        console.log('session ended')
        ready = false
    })
}