import { createSocketToNeuroskyHeadset } from '../DataProcessor/index.js'
import { recordingCommands } from '../DataProcessor/options/RecordingCommands.js'
import { execFile } from 'child_process'
import { socketToWebServer } from '../ConnectionToWebServer/index.js'

const newTGCProcess = () => {
    return execFile('ThinkGear Connector.exe', (error, stdout, stderr) => {
        if (error){
            if (error.killed)
                return
            console.log('Error: ', error)
            return
        }
    })
}

export const WebServerSocketController = ip => {

    const TGC = newTGCProcess()
    const timeout = 5000
    const neuroskySocket = createSocketToNeuroskyHeadset()
    var isSensorConnected = false
    const defaultFloodProtect = 20
    var floodProtect = defaultFloodProtect

    /** kill the proccess of TGC when the sensors disconnect */
    socketToWebServer.on('disconnect', () => {
        console.log('web server disconnection')
        neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
        neuroskySocket.end()
        neuroskySocket.removeAllListeners()
        neuroskySocket.destroy()
        TGC.kill()
    })

    /** disconnect TGC from web server when sensors powered off */
    neuroskySocket.setTimeout(timeout)
    neuroskySocket.on('timeout', () => {
        console.log("socket timeout")
        socketToWebServer.emit('disconnected sensor', ip)
        neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
        neuroskySocket.end()
        neuroskySocket.removeAllListeners()
        neuroskySocket.destroy()
        TGC.kill()
    })

    /** get data from sensors */
    neuroskySocket.on('data', data => {
        console.log("neurosky data: " + data.toString())
        if (data.includes('{')){
            try {
                const jsonData = JSON.parse(data.toString())
                if (jsonData.poorSignalLevel < 200) {
                    /** if room does not exist, create a new one */
                    if (!isSensorConnected) {
                        socketToWebServer.emit('connected sensor', ip)
                        isSensorConnected = true
                    }
                    /** if poor signal not equals to 0, means there is a problem with the sensors contacts */
                    if (jsonData.poorSignalLevel !== 0) {
                        floodProtect--
                        if (floodProtect <= 0) {
                            socketToWebServer.emit('poor signal', ip)
                            floodProtect = defaultFloodProtect
                        }
                    }
                    /** parse sensor data */
                    const currentMeasure = {
                        timeStamp: Date.now(),
                        attention: jsonData.eSense.attention,
                        meditation: jsonData.eSense.meditation
                    }
                    console.log(ip)
                    /** sends the data to web server */
                    socketToWebServer.emit('session data', { data: currentMeasure, ip: ip })
                }
                /** if poor signal equals 200, means sensors is not connected */
                else if (jsonData.poorSignalLevel === 200) {
                    floodProtect--
                    if (isSensorConnected && floodProtect <= 0) {
                        floodProtect = defaultFloodProtect
                        socketToWebServer.emit('sensor not connected', ip)
                    }
                }
            } catch (e) {
                console.log(e)
                console.log("parsing json was failed")
            }
        }
    })

    /** on error from sensors, disconnect */
    neuroskySocket.on('error', (err) => {
        console.log('neurosky error')
        socketToWebServer.emit('session ended from headset', ip)
        neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
        neuroskySocket.end()
        neuroskySocket.removeAllListeners()
        neuroskySocket.destroy()
        TGC.kill()
    })

    /** on end of quiz, terminates process and send data to DB */
    socketToWebServer.on('session ended by quiz', () => {
        console.log('web server end of session')
        neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
        neuroskySocket.end()
        neuroskySocket.removeAllListeners()
        neuroskySocket.destroy()
        socketToWebServer.off('session ended by quiz')
        TGC.kill()
    })
}