import { createSocketToNeuroskyHeadset } from '../DataProcessor/index.js'
import { recordingCommands } from '../DataProcessor/options/RecordingCommands.js'
import { execFile } from 'child_process'
import { socketToWebServer } from '../ConnectionToWebServer/index.js'
import axios from 'axios'

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

const getComputerIp = async () => {
    try{
        const result = await axios (
            `http://api.ipify.org:80`
        )
        return result.data
    }
    catch (e){
        console.log('catch', e)
    }
}

export const WebServerSocketController = () => {

    const TGC = newTGCProcess()
    const timeout = 5000
    const neuroskySocket = createSocketToNeuroskyHeadset
    var isConnectedToRoom = false
    var ip = ''
    const defaultFloodProtect = 20
    var floodProtect = defaultFloodProtect

    /** kill the proccess of TGC when the sensors disconnect */
    socketToWebServer.on('disconnect', () => {
        neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
        neuroskySocket.end()
        neuroskySocket.destroy()
        TGC.kill()
    })

    /** disconnect TGC from web server when sensors powered off */
    neuroskySocket.setTimeout(timeout)
    neuroskySocket.on('timeout', () => {
        console.log("socket timeout")
        socketToWebServer.disconnect()
        neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
        neuroskySocket.end()
        neuroskySocket.destroy()
        TGC.kill()
    })

    /** get data from sensors */
    neuroskySocket.on('data', data => {
        console.log("neurosky data: " + data.toString())
        if (ip === ''){
            getComputerIp()
            .then(res => ip = res)
            .catch(err => console.log(err))
        }
        if (data.includes('{')){
            try {
                const jsonData = JSON.parse(data.toString())
                if (jsonData.poorSignalLevel < 200) {
                    /** if room does not exist, create a new one */
                    if (!isConnectedToRoom) {
                        socketToWebServer.emit('new TGC connection', ip)
                        isConnectedToRoom = true
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
                    if (isConnectedToRoom && floodProtect <= 0) {
                        floodProtect = defaultFloodProtect
                        socketToWebServer.emit('sensor not connected', ip)
                    }
                }
            } catch (e) {
                console.log("parsing json was failed", e)
            }
        }
    })

    /** on error from sensors, disconnect */
    neuroskySocket.on('error', (err) => {
        socketToWebServer.emit('session ended from headset', ip)
        neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
        neuroskySocket.end()
        neuroskySocket.destroy()
        TGC.kill()
    })

    /** on end of quiz, terminates process and send data to DB */
    socketToWebServer.on('session ended by quiz', () => {
        neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
        neuroskySocket.end()
        neuroskySocket.destroy()
        socketToWebServer.disconnect(true)
        TGC.kill()
    })
}