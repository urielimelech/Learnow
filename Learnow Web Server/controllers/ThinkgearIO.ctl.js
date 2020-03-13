import http from 'http'
import io from 'socket.io'

import { connectionOptions } from './ThinkgearOptions.js'
import { dataBaseOptions } from './DataBaseOptions.js'

const port = connectionOptions.port
const app = http.createServer()
app.listen(port)

export const ioServer = io(app)

const socketToDataBase = http.request(dataBaseOptions, (res) => {
    res.on('data', data => {
        // console.log('data: ' , data)
        process.stdout.write(data)
    })
    res.on('end', () => {
        console.log('end session socket')
    })

    res.on('error', (error) => {
        console.log('error: ', error)
    })
})

var sessionData = {
    startTimeStamp: 0,
    endTimeStamp: 0,
    monitorData: []
}

ioServer.on('connection', soc => {
    soc.emit('connected', { connection: 'user connected' })
    soc.on('session data', data => {
        data = JSON.parse(data)
        console.log('data after parse: ', data)
        sessionData.monitorData.push(data)
    })
    soc.on('end session', () => {
        sessionData.startTimeStamp = sessionData.monitorData[0].timeStamp
        sessionData.endTimeStamp = sessionData.monitorData[sessionData.monitorData.length-1].timeStamp
        socketToDataBase.write(JSON.stringify(sessionData))
        console.log('session ended')
    })
})

