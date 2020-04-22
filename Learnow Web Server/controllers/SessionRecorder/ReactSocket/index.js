import { onIp } from './SocketsOnLogic/OnIp.js'
import { onValidateToken } from './SocketsOnLogic/OnValidateToken.js'
import { onRegisterData } from './SocketsOnLogic/OnRegisterData.js'
import { onLoginData } from './SocketsOnLogic/OnLoginData.js'
import { onEndOfVideo } from './SocketsOnLogic/OnEndOfVideo.js'
import { onReadyForDataStream } from './SocketsOnLogic/OnReadyForDataStream.js'
import { onAnswerInVideo } from './SocketsOnLogic/OnAnswerInVideo.js'
import { onEndQuiz } from './SocketsOnLogic/OnEndQuiz.js'
import { onGetSuggestionsCards } from './SocketsOnLogic/OnGetSuggestionsCards.js'
import { onCompareSessions } from './SocketsOnLogic/OnCompareSessions.js'

export const socketWithReact = (serverIOService, soc, rooms) => {

    /** when react is disconnecting */
    // soc.on('disconnect', () => {
    //     // console.log('line 11:', soc.id)
    //     const roomData = serverIOService.sockets.adapter.rooms
    //     // console.log({roomData})
    //     rooms.forEach(e => {
    //         if (e.react === soc.id){
    //             // console.log(e.neuro)
    //             if (e.neuro !== true){
    //                 // console.log('splice')
    //                 rooms.splice(e.roomNumber - 1, 1)
    //             }
    //         }
    //     })
    // })

    /** create room with ip as the name of the room or joining the client to an exist room */
    soc.on('ip', ip => {
        onIp(serverIOService, soc, ip)
    })

    /** validate token with DB server */
    soc.on('validate token', token => {
        onValidateToken(soc, token)
    })

    /** get register parameters from react and send to db if user can register */
    soc.on('register data', ({name, email, password}) => {
        onRegisterData(soc, name, email, password)
    })

    /** get login parameters from react and send to db if user can login */
    soc.on('login data', ({email, password}) => {
        onLoginData(soc, email, password)
    })
    
    /** get notification from client if video ended */
    soc.on('end of video', ip => {
        onEndOfVideo(rooms, ip)
    })

    /** get notification from client if video started */
    soc.on('ready for data stream', ({ip, email}) => {
        onReadyForDataStream(rooms, ip, email)
    })

    /** take the exact timestamp when the video played the answer */
    soc.on('answer in video', ({date, ip}) => {
        onAnswerInVideo(rooms, date, ip)
    })

    /** when user complete the quiz */
    soc.on('end quiz', ({data, ip}) => {
        onEndQuiz(serverIOService, soc, rooms, data, ip)
    })

    /** sends to client the suggestions cards */
    soc.on('get suggestions cards', email => {
        onGetSuggestionsCards(soc, email)
    })

    /** send to client the comparison result between two sessions */
    soc.on('compare sessions', sessionData => {
        onCompareSessions(soc, sessionData)
    })
}