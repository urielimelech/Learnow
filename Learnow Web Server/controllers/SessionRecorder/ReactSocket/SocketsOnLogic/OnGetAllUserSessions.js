import axios from 'axios'
import { dbURL } from '../../../../consts.js'

export const onGetAllUserSessions = async (serverIOService, soc, rooms, userConfigs, email) => {
    try {
        const result = await axios (
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