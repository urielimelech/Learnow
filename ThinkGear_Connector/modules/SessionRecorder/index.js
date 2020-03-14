import { createSocketToNeuroskyHeadset } from '../DataProcessor/index.js'
import { recordingCommands } from '../DataProcessor/options/RecordingCommands.js'
// import { execFile } from 'child_process'
// import { existsSync, appendFile } from 'fs'
import { socketToWebServer } from '../SessionTransfer/DataToWebServer.js'

// const TGC = execFile('ThinkGear Connector.exe', (error, stdout, stderr) => {
//     if (error){
//         console.log('Error: ', error)
//         return
//     }
// })

// var numberOfSession = 1
const timeout = 5000

export const recorder = () => {

    socketToWebServer.on('connected', res => {
        console.log(res)
    })

    const neuroskySocket = createSocketToNeuroskyHeadset
    neuroskySocket.setTimeout(timeout)
    neuroskySocket.on('timeout', () => {
        console.log("socket timeout")
        socketToWebServer.emit('end session', )
        neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
        neuroskySocket.end()
        neuroskySocket.destroy()
        // TGC.kill()
    })
    neuroskySocket.on('data', (data) => {
        console.log("neurosky data: " + data.toString())
        if (data.includes('{')){
            try {
                const jsonData = JSON.parse(data.toString())
                if (jsonData.poorSignalLevel < 200){
                    const currentMeasure = {
                        timeStamp: Date.now(),
                        attention: jsonData.eSense.attention,
                        meditation: jsonData.eSense.meditation
                    }
                    socketToWebServer.emit('session data', JSON.stringify(currentMeasure))
                }
            } catch {
                console.log("parsing json was failed")
            }
        }
    })
    neuroskySocket.on('error', (err) => {
        socketToWebServer.emit('end session', )
        neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
        neuroskySocket.end()
        neuroskySocket.destroy()
        // TGC.kill()
    })
}