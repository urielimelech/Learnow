import { writeSessionToDataBase } from '../../SessionWriterToDB/index.js'
import { sessionObj } from '../SessionObject.js'
import open from 'open'
import { getAvarageAttention, getAvarageMeditation } from '../../SessionAnalyzer/index.js'

export const socketWithThinkgear = (serverIOService, soc, rooms) => {

    /** when TGC is disconnecting */
    // soc.on('disconnect', () => {
        
    // })

    /** create room for TGC and react */
    soc.on('new TGC connection', ip => {
        console.log('new TGC connection', ip)
        const roomData = serverIOService.sockets.adapter.rooms[ip]
        /** check if room does not exist */
        if (!roomData){
            /** if room does not exist, update parameters in session object */
            const obj = sessionObj()
            obj.roomName = ip
            obj.roomNumber = rooms.length + 1
            obj.neuro = true
            /** save session object in the array of all active objects */
            rooms.push(obj)
            /** create a room with the same name as ip address obtained from the client PC */
            soc.join(ip)
        }
        serverIOService.sockets.in(ip).emit('TGC connected to room', ip)
        // open('http://localhost:3000/Session'/*, {app: 'google chrome'}*/)
    })

     /** fetch data from neurosky TGC server and send it to react client */
     soc.on('session data', ({ data, ip }) => {
        rooms.forEach(e => {
            if (e.roomName === ip && e.isReadyForVideo) {
                e.sessionData.monitorData.push(data)
                e.counter++
                if (e.counter % 30 === 0) {
                    const tempArr = []
                    for(let i = e.stopIndex; i < e.counter; i++) {
                        tempArr.push(e.sessionData.monitorData[i])
                    }
                    e.stopIndex = e.counter
                    const avgAttention = getAvarageAttention(tempArr)
                    const avgMeditation = getAvarageMeditation(tempArr)
                    serverIOService.sockets.in(ip).emit('avarage in worked session', ({attention: avgAttention, meditation: avgMeditation}))
                }
                serverIOService.sockets.in(ip).emit('data to client', data)
            }
        })
    })

    /** get notification if headset stopped from sending data */
    soc.on('session ended from headset', ip => {
        serverIOService.sockets.in(ip).emit('session ended from headset', )
        rooms.forEach(e => {
            if (e.roomName === ip && e.sessionData.monitorData.length > 0){
                e.sessionData = writeSessionToDataBase(e.sessionData)
                e.isReadyForVideo = false
            }
        })
        console.log('session ended in', ip)
        soc.disconnect(true)
    })
}