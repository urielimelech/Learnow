import { writeSessionToDataBase } from '../../../SessionWriterToDB/index.js'

export const onBreakSession = (serverIOService, soc, rooms, ip) => {
    
    /** dissconnect the sensors when the user choose to break the session */
    rooms.forEach(e => {
        /** clear the session data from web server when session ended */
        if (e.roomName === ip && e.sessionData.monitorData.length > 0) {
            const broken = true
            e.sessionData.isBroken = true
            e.sessionData = writeSessionToDataBase(e.sessionData, e.config, broken)
            e.isReadyForVideo = false
            soc.emit('last ended session', e.sessionData)
            e.counter = 0
            e.stopIndex = 0
            e.sessionData = {
                userEmail:                  '',
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
        serverIOService.sockets.in(ip).emit('session ended by quiz', )
        soc.leave(ip)
    })
}