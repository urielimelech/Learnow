import axios from 'axios'

import { dbURL } from '../../../../consts.js'

export const onRegisterData = (soc, name, email, password, userType) => {
    console.log(userType)
    const body = {
        name: name,
        email: email,
        password: password,
        userType: userType
    }
    axios.post(`${dbURL}/register`, body)
    .then(res => soc.emit('registration data', {email: email, name: name, userType: userType, token: res.data.token, success: res.data.success, message: res.data.message}))
    .catch(err => {
        if (err.response.data.message.hasOwnProperty('message'))
            soc.emit('registration data', {success: err.response.data.success, message: err.response.data.message.message})
        else 
            soc.emit('registration data', {success: err.response.data.success, message: err.response.data.message})
    })
}