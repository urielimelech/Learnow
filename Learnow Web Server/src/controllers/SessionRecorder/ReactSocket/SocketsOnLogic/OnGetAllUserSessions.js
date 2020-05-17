import axios from 'axios'
import { dbURL } from '../../../../dbUrl.js'

export const onGetAllUserSessions = (serverIOService, soc, rooms, userConfigs, email) => {
        axios.get(`${dbURL}/getAllSessions?userEmail=${email}`)
        .then(result => {
            const userSessions = result.data
            soc.emit('all user sessions', userSessions)
        })
        .catch(e => {
            console.log(e)
        })
}