import axios from 'axios'

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
import { ResultFeedback } from '../Feedback/ResultFeedback/index.js'
import { dbURL } from '../../consts.js'

const sendSessionToDB = session => {
    axios.post(`${dbURL}/addSession`, session)
    .then(res => {
        console.log(res.data)
    })
    .catch(e => {
        console.log(e)
    })
}

const dataSessionAnalysis = (sessionData, userConfig) => {
    if (sessionData.monitorData.length !== 0) {
        sessionData.startTimeStamp = sessionData.monitorData[0].timeStamp
        sessionData.endTimeStamp = sessionData.monitorData[sessionData.monitorData.length-1].timeStamp
        sessionData.avarageAttention = getAvarageAttention(sessionData.monitorData)
        sessionData.avarageMeditation = getAvarageMeditation(sessionData.monitorData)
        sessionData.lowestAttentionLevel = lowestAttentionLevel(sessionData.monitorData, userConfig.analyzer_lowest_attention_range)
        sessionData.lowestMeditationLevel = lowestMeditationLevel(sessionData.monitorData, userConfig.analyzer_lowest_meditation_range)
        sessionData.highestAttentionLevel = highestAttentionLevel(sessionData.monitorData, userConfig.analyzer_highest_attention_range)
        sessionData.highestMeditationLevel = highestMeditationLevel(sessionData.monitorData, userConfig.analyzer_highest_meditation_range)
        sessionData.answersQuiz = ActivityAnalyzer(sessionData.quizData)
        sessionData.correlation = Correlator(sessionData, userConfig.correlator_range_of_seconds)
        sessionData.feedback = ResultFeedback(sessionData, userConfig.feedback_result_balance)
    }
    return sessionData
}

export const writeSessionToDataBase = (sessionData, userConfig) => {
    sessionData = dataSessionAnalysis(sessionData, userConfig)
    sendSessionToDB(sessionData)
    return sessionData
}