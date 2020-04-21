import http from 'http'

import { 
    getAvarageAttention, 
    getAvarageMeditation, 
    lowestAttentionLevel, 
    lowestMeditationLevel, 
    highestAttentionLevel, 
    highestMeditationLevel 
} from '../SessionAnalyzer/index.js'
import { ActivityAnalyzer } from '../ActivityAnalyzer/index.js'
import { Correlator } from '../Correlator/index.js'
import { dataBaseOptions } from './DataBaseOptions.js'
import { ResultFeedback } from '../Feedback/ResultFeedback/index.js'

const resetSessionData = sessionData => {
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
    sessionData.correlation             = {}
    sessionData.feedback                = []
    return sessionData
}

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

export const dataSessionAnalysis = sessionData => {
    if (sessionData.monitorData.length !== 0) {
        sessionData.startTimeStamp = sessionData.monitorData[0].timeStamp
        sessionData.endTimeStamp = sessionData.monitorData[sessionData.monitorData.length-1].timeStamp
        sessionData.avarageAttention = getAvarageAttention(sessionData.monitorData)
        sessionData.avarageMeditation = getAvarageMeditation(sessionData.monitorData)
        sessionData.lowestAttentionLevel = lowestAttentionLevel(sessionData.monitorData)
        sessionData.lowestMeditationLevel = lowestMeditationLevel(sessionData.monitorData)
        sessionData.highestAttentionLevel = highestAttentionLevel(sessionData.monitorData)
        sessionData.highestMeditationLevel = highestMeditationLevel(sessionData.monitorData)
        sessionData.answersQuiz = ActivityAnalyzer(sessionData.quizData)
        sessionData.correlation = Correlator(sessionData)
        sessionData.feedback = ResultFeedback(sessionData)
    }
    return sessionData
}

export const writeSessionToDataBase = sessionData => {
    sessionData = dataSessionAnalysis(sessionData)
    const socketToDataBase = createSocketToDataBase()
    socketToDataBase.write(JSON.stringify(sessionData))
    socketToDataBase.end()
    return sessionData
    // return resetSessionData(sessionData)
}