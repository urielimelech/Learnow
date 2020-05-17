import axios from 'axios'
import { dbURL } from '../../../../dbUrl.js'

export const onGetAllUserSessions = (serverIOService, soc, rooms, userConfigs, email) => {
    try {
        const result = axios (
            `${dbURL}/getAllSessions?userEmail=${email}`
        )
        const userSessions = result.data
        soc.emit('all user sessions', userSessions)
    }
    catch (e){
        console.log('catch', e)
        return e
    } 
}