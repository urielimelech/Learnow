import { getAvarageAttention, getAvarageMeditation } from "../SessionAnalyzer/index.js"

export const Correlator = sessionData => {
    const monitorData = sessionData.monitorData
    const timeAnswersInVideo = sessionData.timeAnswersInVideo

    return timeAnswersInVideo.map(element => {
        const higherBoundTime= Math.ceil(element) + 5000
        const lowerBoundTime= Math.floor(element) - 5000
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
    })
}