import http from 'http'
import io from 'socket.io'

import { serverConnectionOptions } from './ThinkgearOptions.js'
import { writeSessionToDataBase } from '../SessionWriterToDB/index.js'

/** create http server to serve io requests */
const serverPort = serverConnectionOptions.port
const serverHost = serverConnectionOptions.host
const serverApp = http.createServer()
serverApp.listen(serverPort, serverHost)

export const serverIOService = io(serverApp)

var ready = false
var sessionData = {
    startTimeStamp:             0,
    endTimeStamp:               0,
    monitorData:                [],
    startQuizStamp:             0,
    avarageAttention:           0,
    avarageMeditation:          0,
    lowestAttentionLevel:       [],
    highestAttentionLevel:      [],
    lowestMeditationLevel:      [],
    highestMeditationLevel:     [],
    quizData:                   {},
    answersQuiz:                [],
    timeAnswersInVideo:         [],
    correlation:                {}
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
        if (sessionData.monitorData.length > 0)
            sessionData = writeSessionToDataBase(sessionData)
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
        if (sessionData.monitorData.length > 0)
            sessionData.startQuizStamp = sessionData.monitorData[sessionData.monitorData.length-1].timeStamp
    })

    /** when user complete the quiz */
    soc.on('end quiz', data =>{
        sessionData.quizData = data
        if(sessionData.monitorData.length > 0){
            console.log(sessionData)
            sessionData = writeSessionToDataBase(sessionData)
            console.log(sessionData)
        }
        serverIOService.sockets.emit('session ended by quiz', )
        console.log('session ended')
        ready = false
    })

    soc.on('answer in video', data =>{
        console.log('timeque', Date(data).toString())
        sessionData.timeAnswersInVideo.push(data)
    })
}