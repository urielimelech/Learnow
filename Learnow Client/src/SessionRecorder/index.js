import { createSocketToNeuroskyHeadset } from '../DataProcessor/index.js'
import { recordingCommands } from '../DataProcessor/options/RecordingCommands.js'

import { existsSync, appendFile } from 'fs'

var numberOfSession = 1
var timeout = 5000
var sessionData = {
    startTimeStamp: 0,
    endTimeStamp: 0,
    monitorData: []
}

const sessionNumber = () => {
    while (existsSync(`sessions/session${numberOfSession}.json`)){
        numberOfSession++
    }
}

export const recorder = () => {
    sessionNumber()
    
    const neuroskySocket = createSocketToNeuroskyHeadset
    neuroskySocket.setTimeout(timeout)
    neuroskySocket.on('timeout', () => {
        console.log("socket timeout")
        const sessionMonitorDataLength = sessionData.monitorData.length - 1
        sessionData.endTimeStamp = sessionData.monitorData[sessionMonitorDataLength].timeStamp
        neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
        neuroskySocket.end()
        appendFile(`./sessions/session${numberOfSession}.json`, JSON.stringify(sessionData), (err) => {
            if (err) throw err
        })
        neuroskySocket.destroy()
    })
    neuroskySocket.on('data', (data) => {
        console.log("neurosky data: " + data.toString())
        if (data.includes('{')){
            try {
                const jsonData = JSON.parse(data.toString())
                if (jsonData.poorSignalLevel < 200){
                    if (sessionData.startTimeStamp === 0)
                        sessionData.startTimeStamp = Date.now()
                    sessionData.monitorData.push({
                        timeStamp: Date.now(),
                        attention: jsonData.eSense.attention,
                        meditation: jsonData.eSense.meditation
                    })
                }
            } catch {
                console.log("parsing json was failed")
            }
        }
    })
}