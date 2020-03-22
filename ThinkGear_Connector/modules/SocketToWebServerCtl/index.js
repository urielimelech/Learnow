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

const timeout = 5000

export const WebServerSocketController = () => {

    const TGC = newTGCProcess()
    const neuroskySocket = createSocketToNeuroskyHeadset
    var isConnectedToRoom = false
    var myRoom = ''

    socketToWebServer.on('connected', res => {
        console.log(res)
    })

    socketToWebServer.on('room name for client', room => {
        console.log('connect to: ', room)
        myRoom = room
        console.log({myRoom})
    })

    socketToWebServer.on('TGC collector and React are connected', () => {
        console.log('TGC collector and React are connected')
    })

    neuroskySocket.setTimeout(timeout)
    neuroskySocket.on('timeout', () => {
        console.log("socket timeout")
        socketToWebServer.emit('session ended from headset', myRoom )
        neuroskySocket.write(JSON.stringify(recordingCommands.stop_recording))
        neuroskySocket.end()
        neuroskySocket.destroy()
        TGC.kill()
    })

    neuroskySocket.on('data', (data) => {
        console.log("neurosky data: " + data.toString())
        if (data.includes('{')){
            try {
                const jsonData = JSON.parse(data.toString())
                if (jsonData.poorSignalLevel < 200) {
                    if (!isConnectedToRoom) {
                        socketToWebServer.emit('new TGC connection', )
                        isConnectedToRoom = true
                    }
                    const currentMeasure = {
                        timeStamp: Date.now(),
                        attention: jsonData.eSense.attention,
                        meditation: jsonData.eSense.meditation
                    }
                    console.log('my room that i want to send to webserver as a parameter', myRoom)
                    socketToWebServer.emit('session data', { data: JSON.stringify(currentMeasure), myRoom: myRoom })
                }
            } catch {
                console.log("parsing json was failed")
            }
        }
    })

    neuroskySocket.on('error', (err) => {
        socketToWebServer.emit('session ended from headset', myRoom)
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