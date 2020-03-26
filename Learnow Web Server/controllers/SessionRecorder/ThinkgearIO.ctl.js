import http from 'http'
import io from 'socket.io'

import { serverConnectionOptions } from './ThinkgearOptions.js'
import { writeSessionToDataBase } from '../SessionWriterToDB/index.js'
import { dataSessionAnalysis } from '../SessionWriterToDB/index.js'

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
    correlation:                {},
    feedback:                   []
}
var rooms = []

/** on connection to serverIO to start serve */
export const connectionToServerIO = soc => {

    soc.emit('connected', 'connection established')

    /** fetch data from neurosky TGC server and send it to react client */
    soc.on('session data', ({ data, myRoom }) => {
        if (rooms.some(e => e.roomName === myRoom && e.isReadyForVideo )){
            serverIOService.sockets.in(myRoom).emit('data to client', data)
            data = JSON.parse(data)
            console.log('data after parse: ', data)
            sessionData.monitorData.push(data)
        }
    })

    /** create room for TGC and react */
    soc.on('new TGC connection', () => {
        console.log('new TGC connection')
        const roomNumber = rooms.length + 1
        const roomName = `room ${roomNumber}`
        const obj = {
            roomName: roomName,
            roomNumber: roomNumber,
            isReadyForVideo: false
        }
        rooms.push(obj)
        soc.join(roomName)
        soc.emit('room name for client', roomName)
    })

    /** add the react client to the room specified */
    soc.on('add client to room', roomNumber => {
        if (rooms.some(e => e.roomNumber === Number(roomNumber)) && serverIOService.sockets.adapter.rooms[`room ${roomNumber}`] !== undefined) {
            soc.join(`room ${roomNumber}`)
            serverIOService.sockets.in(`room ${roomNumber}`).emit('TGC collector and React are connected', )
            console.log('connection established between react and TGC in room', roomNumber)
        }
        else {
            soc.emit('room connection failed', )
            console.log('room connection failure')
        }
    })

    /** get notification if headset stopped from sending data */
    soc.on('session ended from headset', myRoom => {
        console.log({myRoom})
        serverIOService.sockets.in(myRoom).emit('session ended from headset', )
        console.log('session ended from serverIOService')
        if (sessionData.monitorData.length > 0)
            sessionData = writeSessionToDataBase(sessionData)
        console.log('session ended')
        soc.disconnect(true)
        ready = false
    })

    /** get notification from client if video started */
    soc.on('ready for data stream', roomNumber => {
        console.log('user started video in room', roomNumber)
        rooms.forEach(e => {
            console.log('room number', e.roomNumber, 'gotten number', roomNumber)
            if (e.roomNumber === Number(roomNumber))
                e.isReadyForVideo = true
        })
        console.log(rooms)
        // ready = true
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
            sessionData = writeSessionToDataBase(sessionData)
            console.log(sessionData)
        }
        serverIOService.sockets.emit('session ended by quiz', )
        console.log('session ended')
        ready = false
    })

    /** take the exact timestamp when the video played the answer */
    soc.on('answer in video', data =>{
        console.log('timeque', Date(data).toString())
        sessionData.timeAnswersInVideo.push(data)
    })

    /**  */
    soc.on('get last ended session', () => {
        sessionData = dataSessionAnalysis(sessionData)
        soc.emit('last ended session', sessionData)
    })
}