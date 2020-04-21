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

    socketToWebServer.on('TGC collector and React are connected', () => {
        console.log('TGC collector and React are connected')
    })

    neuroskySocket.setTimeout(timeout)
    neuroskySocket.on('timeout', () => {
        console.log("socket timeout")
        socketToWebServer.emit('session ended from headset', ip)
        neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
        neuroskySocket.end()
        neuroskySocket.destroy()
        TGC.kill()
    })

    neuroskySocket.on('data', (data) => {
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
                    if (!isConnectedToRoom) {
                        socketToWebServer.emit('new TGC connection', ip)
                        isConnectedToRoom = true
                    }
                    const currentMeasure = {
                        timeStamp: Date.now(),
                        attention: jsonData.eSense.attention,
                        meditation: jsonData.eSense.meditation
                    }
                    console.log('my room that i want to send to webserver as a parameter', ip)
                    socketToWebServer.emit('session data', { data: currentMeasure, ip: ip })
                }
            } catch {
                console.log("parsing json was failed")
            }
        }
    })

    neuroskySocket.on('error', (err) => {
        socketToWebServer.emit('session ended from headset', ip)
        neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
        neuroskySocket.end()
        neuroskySocket.destroy()
        TGC.kill()
    })

    socketToWebServer.on('session ended by quiz', () => {
        neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
        neuroskySocket.end()
        neuroskySocket.destroy()
        socketToWebServer.disconnect(true)
        TGC.kill()
    })
}