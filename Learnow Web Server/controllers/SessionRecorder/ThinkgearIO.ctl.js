import http from 'http'
import io from 'socket.io'

import { serverConnectionOptions } from './ThinkgearOptions.js'
import { dataBaseOptions } from './DataBaseOptions.js'


import { 
    getAvarageAttention, 
    getAvarageMeditation, 
    lowestAttentionLevel, 
    lowestMeditationLevel, 
    highestAttentionLevel, 
    highestMeditationLevel } from '../SessionAnalyzer/index.js'
import { ActivityAnalyzer } from '../ActivityAnalyzer/index.js'
import { Correlator } from '../correlator/index.js'

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
    timeAnswersInVideo:         []
}

const resetSessionData = () => {
    sessionData.startTimeStamp          = 0
    sessionData.endTimeStamp            = 0
    sessionData.monitorData             = []
    sessionData.startQuizStamp          = 0
    sessionData.quizData                = {}
    sessionData.avarageAttention        = 0
    sessionData.avarageMeditation       = 0
    sessionData.lowestAttentionLevel    = []
    sessionData.highestAttentionLevel   = []
    sessionData.lowestMeditationLevel   = []
    sessionData.highestMeditationLevel  = []
    sessionData.answersQuiz             = []
    sessionData.timeAnswersInVideo      = []
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
    sessionData.avarageAttention = getAvarageAttention(sessionData.monitorData)
    sessionData.avarageMeditation = getAvarageMeditation(sessionData.monitorData)
    // console.log('average attention', sessionData.avarageAttention)
    // console.log('average meditation', sessionData.avarageMeditation)
    sessionData.lowestAttentionLevel = lowestAttentionLevel(sessionData.monitorData)
    // console.log('lowest attention level', sessionData.lowestAttentionLevel)
    sessionData.lowestMeditationLevel = lowestMeditationLevel(sessionData.monitorData)
    // console.log('lowest meditation level', sessionData.lowestMeditationLevel)
    sessionData.highestAttentionLevel = highestAttentionLevel(sessionData.monitorData)
    // console.log('highest attention level', sessionData.highestAttentionLevel)
    sessionData.highestMeditationLevel = highestMeditationLevel(sessionData.monitorData)
    // console.log('highest meditation level', sessionData.highestMeditationLevel)
    sessionData.answersQuiz = ActivityAnalyzer(sessionData.quizData)
    // console.log('answersQuiz', sessionData.answersQuiz)
    console.log(Correlator(sessionData))
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
        if (sessionData.monitorData.length > 0)
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
        if (sessionData.monitorData.length > 0)
            sessionData.startQuizStamp = sessionData.monitorData[sessionData.monitorData.length-1].timeStamp
    })

    /** when user complete the quiz */
    soc.on('end quiz', data =>{
        sessionData.quizData = data
        // console.log('quizdata', sessionData.quizData)
        // ActivityAnalyzer(data)
        if(sessionData.monitorData.length > 0)
            writeSessionToDataBase()
        serverIOService.sockets.emit('session ended by quiz', )
        console.log('session ended')
        ready = false
    })

    soc.on('answer in video', data =>{
        console.log('timeque', Date(data).toString())
        sessionData.timeAnswersInVideo.push(data)
    })
}