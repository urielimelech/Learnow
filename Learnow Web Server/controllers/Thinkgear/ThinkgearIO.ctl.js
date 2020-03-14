import http from 'http'
import io from 'socket.io'
// import ioClient from 'socket.io-client'

import { serverConnectionOptions } from './ThinkgearOptions.js'
import { dataBaseOptions } from './DataBaseOptions.js'
// import { clientConnectionOptions } from './ClientOptions.js'

/** create http server to serve io requests */
const serverPort = serverConnectionOptions.port
const serverHost = serverConnectionOptions.host
const serverApp = http.createServer()
serverApp.listen(serverPort, serverHost)

// const clientPort = clientConnectionOptions.port
// const clientHost = clientConnectionOptions.host
// const clientApp = http.createServer()
// clientApp.listen(clientPort, clientHost)

export const serverIOService = io(serverApp)

// export const clientIOService = io(clientApp)

// const socketFromServerToClient = ioClient(`http://${clientConnectionOptions.host}:${clientConnectionOptions.port}`)

// var recivedData = null
// var isEnded = false
var ready = false
var sessionData = {
    startTimeStamp: 0,
    endTimeStamp: 0,
    monitorData: []
}

/** define a socket to database */
// const createSocketToDataBase = () => {
//     return http.request(dataBaseOptions, (res) => {
//         res.on('data', data => {
//             // console.log('data: ' , data)
//             process.stdout.write(data)
//         })
//         res.on('end', () => {
//             // res.destroy()
//             console.log('end session socket')
//         })
    
//         res.on('error', (error) => {
//             console.log('error: ', error)
//         })
//     })
// }
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
        // recivedData = data
    })

    /** get notification if headset stopped from sending data */
    soc.on('session ended from headset', () => {
        // isEnded = true
        serverIOService.sockets.emit('session ended from headset', )
        console.log('session ended from serverIOService')
        sessionData.startTimeStamp = sessionData.monitorData[0].timeStamp
        sessionData.endTimeStamp = sessionData.monitorData[sessionData.monitorData.length-1].timeStamp
        // const socketToDataBase = createSocketToDataBase()
        socketToDataBase.write(JSON.stringify(sessionData))
        // socketToDataBase.end()
        // socketToDataBase.destroy()
        console.log('session ended')
        soc.disconnect(true)
        ready = false
    })

    /** get notification from client if video started */
    soc.on('ready for data stream', () => {
        console.log('user started video')
        ready = true
        // console.log(ready)
    })

    /** get notification from client if video ended */
    soc.on('end of video', () => {
        console.log('end of video')
        sessionData.startTimeStamp = sessionData.monitorData[0].timeStamp
        sessionData.endTimeStamp = sessionData.monitorData[sessionData.monitorData.length-1].timeStamp
        // const socketToDataBase = createSocketToDataBase()
        socketToDataBase.write(JSON.stringify(sessionData))
        // socketToDataBase.end()
        // socketToDataBase.destroy()
        serverIOService.sockets.emit('session ended by video', )
        console.log('session ended')
        ready = false
    })
}

// export const connectionToClientIO = soc => {
//     soc.on('data to client', data => {
//         console.log(ready)
//         if (ready) {
//             soc.emit('client data', data)
//             data = JSON.parse(data)
//             console.log('data after parse: ', data)
//             sessionData.monitorData.push(data)
//         }
//     })
//     // while (recivedData !== null) {
//     //     console.log('in dataRecived if')
     
//     //     recivedData = null
//     // }
//     soc.on('ready for data stream', isReady => {
//         console.log('user started video')
//         ready = isReady
//         // console.log(ready)
//     })
//     soc.on('session ended from headset', () => {
//         soc.emit('end session', )
//         console.log('session ended from headset')
//         soc.disconnect(true)
//         ready = false
//     })
//     // if (isEnded) {
//     //     soc.emit('end session', )
//     // }
//     // soc.on()
// }



// const socketToDataBase = http.request(dataBaseOptions, (res) => {
//     res.on('data', data => {
//         // console.log('data: ' , data)
//         process.stdout.write(data)
//     })
//     res.on('end', () => {
//         console.log('end session socket')
//     })

//     res.on('error', (error) => {
//         console.log('error: ', error)
//     })
// })

// var sessionData = {
//     startTimeStamp: 0,
//     endTimeStamp: 0,
//     monitorData: []
// }

// export const connectionToThinkGear = socket => {
//     socket.emit('connected', { connection: 'user connected' })
//     socket.on('session data', data => {
//         socketToClient.emit('session data', data)
//         // data = JSON.parse(data)
//         // console.log('data after parse: ', data)
//         // sessionData.monitorData.push(data)
//     })
//     // socketToClient.on('stop recording', () => {
//     //     socket.emit('stop recording', )
//     // })
//     socket.on('end session', () => {
//         socketToClient.emit('end session', )
//         // sessionData.startTimeStamp = sessionData.monitorData[0].timeStamp
//         // sessionData.endTimeStamp = sessionData.monitorData[sessionData.monitorData.length-1].timeStamp
//         // socketToDataBase.write(JSON.stringify(sessionData))
//         console.log('session ended')
//     })
// }