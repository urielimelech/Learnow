import { writeSessionToDataBase } from '../../SessionWriterToDB/index.js'
import open from 'open'

export const socketWithThinkgear = (serverIOService, soc, rooms) => {

    /** create room for TGC and react */
    soc.on('new TGC connection', () => {
        console.log('new TGC connection')
        const roomNumber = rooms.length + 1
        const roomName = `room ${roomNumber}`
        const obj = {
            roomName: roomName,
            roomNumber: roomNumber,
            isReadyForVideo: false,
            sessionData: {
                startTimeStamp:             0,
                endTimeStamp:               0,
                monitorData:                [],
                startQuizStamp:             0,
                avarageAttention:           0,
                avarageMeditation:          0,
                lowestAttentionLevel:       [],
                highestAttentionLevel:      [],
                lowestMeditationLevel:      [],
                highestMeditationLevel:     [],
                quizData:                   {},
                answersQuiz:                [],
                timeAnswersInVideo:         [],
                correlation:                {},
                feedback:                   []
            }
        }
        rooms.push(obj)
        soc.join(roomName)
        serverIOService.sockets.in(roomName).emit('room name for client', roomName)
        open('http://localhost:3000/Session'/*, {app: 'google chrome'}*/)
    })

     /** fetch data from neurosky TGC server and send it to react client */
     soc.on('session data', ({ data, myRoom }) => {
        rooms.forEach(e => {
            if (e.roomName === myRoom && e.isReadyForVideo) {
                serverIOService.sockets.in(myRoom).emit('data to client', data)
                data = JSON.parse(data)
                // console.log('data after parse: ', data)
                e.sessionData.monitorData.push(data)
            }
        })
    })

    /** get notification if headset stopped from sending data */
    soc.on('session ended from headset', myRoom => {
        serverIOService.sockets.in(myRoom).emit('session ended from headset', )
        rooms.forEach(e => {
            if (e.roomName === myRoom && e.sessionData.monitorData.length > 0){
                e.sessionData = writeSessionToDataBase(e.sessionData)
                e.isReadyForVideo = false
            }
        })
        console.log('session ended in', myRoom)
        soc.disconnect(true)
    })

}