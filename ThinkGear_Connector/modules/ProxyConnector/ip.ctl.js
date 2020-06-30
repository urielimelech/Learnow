import axios from 'axios'
import { socketToWebServer } from "../ConnectionToWebServer/index.js"
import { WebServerSocketController } from '../SocketToWebServerCtl/index.js'

var chainedIP = ''

const getComputerIp = async (serial) => {
    try{
        const result = await axios (
            `https://api.ipify.org/`
        )
        chainedIP = `${result.data} ${serial}`
        console.log(chainedIP)
        if (chainedIP !== '') {
            socketToWebServer.emit('new TGC connection', chainedIP)
            socketToWebServer.on('open TGC', () => {
                console.log('call to new tgc')
                WebServerSocketController(chainedIP)
            })
        }
    }
    catch (e){
        console.log('catch', e)
    }
}

export const getIP = async (req, res, next) => {
    const chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const serialLength = 16
    var randomSerial = ''
    var randomNumber
    for (let i = 0; i < serialLength; i += 1) {
        randomNumber = Math.floor(Math.random() * chars.length)
        randomSerial += chars.substring(randomNumber, randomNumber + 1)
    }
    try {
        await getComputerIp(randomSerial)
        return res.status(200).json({ip: chainedIP})
    }
    catch (e){
        console.log('error get ip', e)
        return res.status(404).json({error: e})
    }
    
}