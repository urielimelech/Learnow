import axios from 'axios'

import { dbURL } from '../../../../consts.js'
import { sessionConfig } from '../../SessionConfig.js'

export const onRegisterData = (soc, userConfigs, name, email, password, userType) => {
    /** create new user in users collection */
    const userBody = {
        name: name,
        email: email,
        password: password,
        userType: userType
    }
    const config = sessionConfig()
    const userConfigBody = {
        userEmail: email,
        config: config
    }
    axios.post(`${dbURL}/register`, ({userBody: userBody, userConfig: userConfigBody}))
    .then(res => {
        soc.emit('registration data', {email: email, name: name, userType: userType, token: res.data.token, success: res.data.success, message: res.data.message})
        userConfigs.push(res.data.configResult)
    })
    .catch(err => {
        if (err.response.data.message.hasOwnProperty('message'))
            soc.emit('registration data', {success: err.response.data.success, message: err.response.data.message.message})
        else 
            soc.emit('registration data', {success: err.response.data.success, message: err.response.data.message})
    })
}