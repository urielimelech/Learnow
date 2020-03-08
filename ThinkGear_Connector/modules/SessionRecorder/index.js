import { createSocketToNeuroskyHeadset } from '../DataProcessor/index.js'
import { recordingCommands } from '../DataProcessor/options/RecordingCommands.js'
import { execFile } from 'child_process'
import { existsSync, appendFile } from 'fs'
import { createSocketToSessionServer } from '../SessionTransfer/index.js'

const TGC = execFile('ThinkGear Connector.exe', (error, stdout, stderr) => {
    if (error){
        console.log('Error: ', error)
        return
    }
})

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
    // console.log(neuroskySocket)
    neuroskySocket.setTimeout(timeout)
    neuroskySocket.on('timeout', () => {
        console.log("socket timeout")
        if (sessionData.monitorData.length > 0) {
            const sessionMonitorDataLength = sessionData.monitorData.length - 1
            sessionData.endTimeStamp = sessionData.monitorData[sessionMonitorDataLength].timeStamp
            neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
            neuroskySocket.end()
            const sessionSocket = createSocketToSessionServer
            console.log(sessionData)
            sessionSocket.write(JSON.stringify(sessionData))
            // console.log('before end')
            sessionSocket.end()
            // console.log('after end')
            // sessionSocket.abort()
            // appendFile(`./sessions/session${numberOfSession}.json`, JSON.stringify(sessionData), (err) => {
            //     if (err) throw err
            // })
        }
        neuroskySocket.destroy()
        TGC.kill()
    })
    neuroskySocket.on('data', (data) => {
        console.log("neurosky data: " + data.toString())
        if (data.includes('{')){
            try {
                const jsonData = JSON.parse(data.toString())
                if (jsonData.poorSignalLevel < 200){
                    sessionData.startTimeStamp === 0 ? sessionData.startTimeStamp = Date.now() : null
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
    neuroskySocket.on('error', (err) => {
        if (sessionData.monitorData.length > 0) {
            const sessionMonitorDataLength = sessionData.monitorData.length - 1
            sessionData.endTimeStamp = sessionData.monitorData[sessionMonitorDataLength].timeStamp
            neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
            neuroskySocket.end()
            const sessionSocket = createSocketToSessionServer
            console.log(sessionData)
            sessionSocket.write(JSON.stringify(sessionData))
            // console.log('before end')
            sessionSocket.end()
            // appendFile(`./sessions/session${numberOfSession}.json`, JSON.stringify(sessionData), (err) => {
            //     if (err) throw err
            // })
        }
        neuroskySocket.destroy()
        TGC.kill()
    })
}