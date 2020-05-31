import axios from 'axios'
import { spawn } from 'child_process'

import { learnowUrl } from "./options.js"
import { socketToWebServer } from "../ConnectionToWebServer/index.js"

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

export const startLearnow = async () => {
    const cmd = spawn('cmd.exe', ['/c', 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe', '/new-window', `${learnowUrl}`])
    var ip = ''
    var isConnectedToRoom = false
    if (ip === ''){
        await getComputerIp()
        .then(res => ip = res)
        .catch(err => console.log(err))
    }
    if (!isConnectedToRoom && ip !== '') {
        socketToWebServer.emit('new TGC connection', ip)
        isConnectedToRoom = true
    }
    socketToWebServer.on('open TGC', () => {
        console.log('call to new tgc')
        import('../SocketToWebServerCtl/index.js')
        .then(({ WebServerSocketController }) => {
            if (isConnectedToRoom)
                WebServerSocketController(ip)
        })
    })
}