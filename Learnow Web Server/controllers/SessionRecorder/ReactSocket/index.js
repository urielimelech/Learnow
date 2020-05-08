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
import { onGetUserConfiguration } from './SocketsOnLogic/OnGetUserConfiguration.js'
import { onSaveConfiguration } from './SocketsOnLogic/OnSaveConfiguration.js'
import { onLogout } from './SocketsOnLogic/OnLogout.js'
import { onGetAllUserSessions } from './SocketsOnLogic/OnGetAllUserSessions.js'

export const socketWithReact = (serverIOService, soc, rooms, userConfigs) => {

    /** create room with ip as the name of the room or joining the client to an exist room */
    soc.on('ip', ({ip, email}) => {
        onIp(serverIOService, soc, rooms, userConfigs, ip, email)
    })

    /** validate token with DB server */
    soc.on('validate token', token => {
        onValidateToken(soc, token)
    })

    /** get register parameters from react and send to db if user can register */
    soc.on('register data', ({name, email, password, userType}) => {
        onRegisterData(soc, userConfigs, name, email, password, userType)
    })

    /** get login parameters from react and send to db if user can login */
    soc.on('login data', ({email, password}) => {
        onLoginData(soc, userConfigs, email, password)
    })
    
    /** get notification from client if video ended */
    soc.on('end of video', ip => {
        onEndOfVideo(rooms, ip)
    })

    /** get notification from client if video started */
    soc.on('ready for data stream', ({ip, email, activity}) => {
        onReadyForDataStream(rooms, ip, email, activity)
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
    soc.on('compare sessions', ({sessionData, email, secondSession}) => {
        onCompareSessions(soc, userConfigs, email, sessionData, secondSession)
    })

    /** sends to client the configuration */
    soc.on('get user configuration', email => {
        onGetUserConfiguration(soc, userConfigs, email)
    })

    /** save user configuration to the DB */
    soc.on('save configuration', ({config, userEmail}) => {
        onSaveConfiguration(userConfigs, config, userEmail)
    })

    /** when user logout from react */
    soc.on('logout', email => {
        onLogout(userConfigs, email)
    })

    /** get user sessions */
    soc.on('get all user sessions', email =>{
        onGetAllUserSessions(serverIOService, soc, rooms, userConfigs, email)
    })

    /** on client disconnect, clean all client listners */
    soc.on('disconnect', () => {
        soc.removeAllListeners()
    })
}