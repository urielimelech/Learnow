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
import { onBreakSession } from './SocketsOnLogic/OnBreakSession.js'
import { onGetAllComparison } from './SocketsOnLogic/OnGetAllComparison.js'
import { onKillTGC } from './SocketsOnLogic/OnKillTGC.js'

export const socketWithReact = (serverIOService, soc, rooms, userConfigs) => {

    /** create room with ip as the name of the room or joining the client to an exist room */
    soc.on('ip', ({ip, email}) => {
        console.log('on ip')
        onIp(serverIOService, soc, rooms, userConfigs, ip, email)
    })

    /** validate token with DB server */
    soc.on('validate token', token => {
        console.log('on validate token')
        onValidateToken(soc, token)
    })

    /** get register parameters from react and send to db if user can register */
    soc.on('register data', ({name, email, password, userType}) => {
        console.log('on register data')
        onRegisterData(soc, userConfigs, name, email, password, userType)
    })

    /** get login parameters from react and send to db if user can login */
    soc.on('login data', ({email, password}) => {
        console.log('on login data')
        onLoginData(soc, userConfigs, email, password)
    })
    
    /** get notification from client if video ended */
    soc.on('end of video', ip => {
        console.log('on end of video')
        onEndOfVideo(rooms, ip)
    })

    /** get notification from client if video started */
    soc.on('ready for data stream', ({ip, email, activity}) => {
        console.log('on ready for data stream')
        onReadyForDataStream(rooms, ip, email, activity)
    })

    /** take the exact timestamp when the video played the answer */
    soc.on('answer in video', ({date, ip}) => {
        console.log('on answer video')
        onAnswerInVideo(rooms, date, ip)
    })

    /** when user complete the quiz */
    soc.on('end quiz', ({data, ip}) => {
        console.log('on end quiz')
        onEndQuiz(serverIOService, soc, rooms, data, ip)
    })

    /** sends to client the suggestions cards */
    soc.on('get suggestions cards', email => {
        console.log('on get suggestions cards')
        onGetSuggestionsCards(soc, email)
    })

    /** send to client the comparison result between two sessions */
    soc.on('compare sessions', ({sessionData, secondSession, studentConfig}) => {
        console.log('on compare sessions')
        onCompareSessions(soc, studentConfig, sessionData, secondSession)
    })

    /** sends to client the configuration */
    soc.on('get user configuration', email => {
        console.log('on user configuration')
        onGetUserConfiguration(soc, userConfigs, email)
    })

    /** save user configuration to the DB */
    soc.on('save configuration', ({userData}) => {
        console.log('on save configuration')
        onSaveConfiguration(userData)
    })

    /** when user logout from react */
    soc.on('logout', email => {
        console.log('on logout')
        onLogout(userConfigs, email)
    })

    /** get user sessions */
    soc.on('get all user sessions', email =>{
        console.log('on get all user sessions')
        onGetAllUserSessions(serverIOService, soc, rooms, userConfigs, email)
    })

    /** on client disconnect, clean all client listners */
    soc.on('disconnect', () => {
        console.log('on disconnect react', soc.id)
        soc.removeAllListeners()
    })

    /** end session when user break the session and move to feedback page */
    soc.on('break session', ({ip}) => {
        console.log('on break session')
        onBreakSession(serverIOService, soc, rooms, ip)
    })

    /** get all comparison data between sessions for recommendation */
    soc.on('get all comparison', email => {
        console.log('on all comparison')
        onGetAllComparison(soc, email)
    })

    /** send to thinkgear a command to stop the TGC process if active */
    soc.on('kill TGC', () => {
        console.log('on kill tgc')
        onKillTGC(serverIOService, soc, rooms)
    })
}