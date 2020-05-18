import { writeSessionToDataBase } from '../../../SessionWriterToDB/index.js'

export const onEndQuiz = (serverIOService, soc, rooms, data, ip) => {
    rooms.forEach(e => {
        if (e.roomName === ip && e.sessionData.monitorData.length > 0) {
            e.sessionData.quizData = data
            e.sessionData = writeSessionToDataBase(e.sessionData, e.config)
            e.isReadyForVideo = false
            soc.emit('last ended session', e.sessionData)

            /** clear the session data from web server when session ended */
            rooms.splice(e.roomNumber - 1, 1)
            serverIOService.sockets.in(ip).emit('session ended by quiz', )

            /** clear all clients from room whe session ended */
            serverIOService.of('/').in(ip).clients((error, sockets) => {
                if (error) throw error
                sockets.forEach(s => {
                    serverIOService.sockets.sockets[s].leave(ip)
                })
            })

        }
    })
    console.log(`session ended in room ${ip}`)
}