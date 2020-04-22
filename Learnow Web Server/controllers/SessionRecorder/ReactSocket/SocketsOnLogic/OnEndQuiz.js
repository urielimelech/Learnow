import { writeSessionToDataBase } from '../../../SessionWriterToDB/index.js'

export const onEndQuiz = (serverIOService, soc, rooms, data, ip) => {
    rooms.forEach(e => {
        if (e.roomName === ip && e.sessionData.monitorData.length > 0){
            e.sessionData.quizData = data
            e.sessionData = writeSessionToDataBase(e.sessionData)
            e.isReadyForVideo = false
            soc.emit('last ended session', e.sessionData)
            rooms.splice(e.roomNumber - 1, 1)
            serverIOService.sockets.in(ip).emit('session ended by quiz', ip)
        }
    })
    console.log(`session ended in room ${ip}`)
}