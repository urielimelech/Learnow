import http from 'http'
import io from 'socket.io'

import { serverConnectionOptions } from './ThinkgearOptions.js'
import { writeSessionToDataBase } from '../SessionWriterToDB/index.js'
import { dataSessionAnalysis } from '../SessionWriterToDB/index.js'
import { SuggestionFeedback } from '../Feedback/SuggestionFeedback/index.js'

/** create http server to serve io requests */
const serverPort = serverConnectionOptions.port
const serverHost = serverConnectionOptions.host
const serverApp = http.createServer()
serverApp.listen(serverPort, serverHost)

export const serverIOService = io(serverApp)

var rooms = []

/** on connection to serverIO to start serve */
export const connectionToServerIO = soc => {

    soc.emit('connected', 'connection established')

    /** fetch data from neurosky TGC server and send it to react client */
    soc.on('session data', ({ data, myRoom }) => {
        rooms.forEach(e => {
            if (e.roomName === myRoom && e.isReadyForVideo) {
                serverIOService.sockets.in(myRoom).emit('data to client', data)
                data = JSON.parse(data)
                // console.log('data after parse: ', data)
                e.sessionData.monitorData.push(data)
            }
        })
    })

    /** create room for TGC and react */
    soc.on('new TGC connection', () => {
        console.log('new TGC connection')
        const roomNumber = rooms.length + 1
        const roomName = `room ${roomNumber}`
        const obj = {
            roomName: roomName,
            roomNumber: roomNumber,
            isReadyForVideo: false,
            sessionData: {
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
        }
        else {
            soc.emit('room connection failed', )
            console.log('room connection failure')
        }
    })

    /** get notification if headset stopped from sending data */
    soc.on('session ended from headset', myRoom => {
        serverIOService.sockets.in(myRoom).emit('session ended from headset', )
        rooms.forEach(e => {
            if (e.roomName === myRoom && e.sessionData.monitorData.length > 0){
                e.sessionData = writeSessionToDataBase(e.sessionData)
                e.isReadyForVideo = false
            }
        })
        console.log('session ended in', myRoom)
        soc.disconnect(true)
    })

    /** get notification from client if video started */
    soc.on('ready for data stream', roomNumber => {
        console.log('user started video in room', roomNumber)
        rooms.forEach(e => {
            if (e.roomNumber === Number(roomNumber))
                e.isReadyForVideo = true
        })
        // console.log(rooms)
    })

    /** get notification from client if video ended */
    soc.on('end of video', roomNumber => {
        console.log('end of video')
        rooms.forEach(e => {
            if (e.roomNumber === Number(roomNumber) && e.sessionData.monitorData.length > 0)
                e.sessionData.startQuizStamp = e.sessionData.monitorData[e.sessionData.monitorData.length - 1].timeStamp
        })
    })

    /** when user complete the quiz */
    soc.on('end quiz', ({data, roomNumber}) =>{
        rooms.forEach(e => {
            if (e.roomNumber === Number(roomNumber) && e.sessionData.monitorData.length > 0){
                e.sessionData.quizData = data
                e.sessionData = writeSessionToDataBase(e.sessionData)
                e.isReadyForVideo = false
                serverIOService.sockets.in(`room ${roomNumber}`).emit('session ended by quiz', )
            }
        })
        console.log(`session ended in room ${roomNumber}`)
        // console.log(rooms)
    })

    /** take the exact timestamp when the video played the answer */
    soc.on('answer in video', ({date, roomNumber}) =>{
        console.log('timeque', Date(date).toString())
        rooms.forEach(e => {
            if (e.roomNumber === Number(roomNumber))
                e.sessionData.timeAnswersInVideo.push(date)
        })
    })

    /**  */
    soc.on('get last ended session', roomNumber => {
        rooms.forEach(e => {
            if (e.roomNumber === Number(roomNumber))
                soc.emit('last ended session', e.sessionData)
        })
        // sessionData = dataSessionAnalysis(sessionData)
        // soc.emit('last ended session', sessionData)
    })

    /** sends to client the suggestions cards */
    soc.on('get suggestions cards', roomNumber => {
        rooms.forEach(e => {
            if (e.roomNumber === Number(roomNumber))
                soc.emit('suggestions cards', SuggestionFeedback)
        })
    })

    // soc.on('get suggestions cards', () => {
    //     soc.emit('suggestions cards', SuggestionFeedback)
    // })
}