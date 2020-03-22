import { getAvarageAttention, getAvarageMeditation } from "../SessionAnalyzer/index.js"

const correlation = (element, monitorData) => {
    const secondsInRange = 5000
    const higherBoundTime= Math.ceil(element) + secondsInRange
    const lowerBoundTime= Math.floor(element) - secondsInRange
    
    const rangedMonitoredData = monitorData.map(element => {
        /** check if the monitordata is in range */
        if(element.timeStamp > lowerBoundTime && element.timeStamp < higherBoundTime){
            return element
        }
    }).filter((element)=>{
        return element !== undefined
    })
    const avarageAttention = getAvarageAttention(rangedMonitoredData)
    const avarageMeditation = getAvarageMeditation(rangedMonitoredData)
    return {
        avarageAttention: avarageAttention,
        avarageMeditation: avarageMeditation,
        rangedMonitoredData: rangedMonitoredData
    }
}

export const Correlator = sessionData => {
    const monitorData = sessionData.monitorData
    const timeAnswersInVideo = sessionData.timeAnswersInVideo
    const timeAnswersInQuiz = sessionData.quizData.userInput

    const videoCorrelation = timeAnswersInVideo.map(element => correlation(element, monitorData))
    const quizCorrelation = timeAnswersInQuiz.map(element => correlation(element.timeStamp, monitorData))

    return { 
        videoCorrelation: videoCorrelation,
        quizCorrelation: quizCorrelation
    }
}