import axios from 'axios'

export const onGetAllUserSessions = async (serverIOService, soc, rooms, userConfigs, email) => {
    try {
        const result = await axios (
            `http://localhost:13860/getAllSessions?userEmail=${email}`
        )
        const userSessions = result.data
        soc.emit('all user sessions', userSessions)
    }
    catch (e){
        console.log('catch', e)
        return e
    } 
}