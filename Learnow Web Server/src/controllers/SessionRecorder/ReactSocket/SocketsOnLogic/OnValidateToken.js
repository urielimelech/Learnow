import axios from 'axios'

import { dbURL } from '../../../../dbUrl.js'

export const onValidateToken = (soc, token) => {
    axios.get(`${dbURL}/checkUserToken`, { headers: { 'x-jwt-token': token } })
        .then(res => {
            soc.emit('get dbToken', {success: res.data.success, message: res.data.message, token: res.data.token})
        })
        .catch(err=> {
            console.log({err})
            soc.emit('get dbToken', {success: err.response.data.success, message: err.response.data.message}
        ) }
        )
}