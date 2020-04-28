import axios from 'axios'

import { dbURL } from '../../../../consts.js'

export const onLoginData = (soc, userConfigs, email, password) => {
    /** get user data from db */
    axios.get(`${dbURL}/login`, {
        params: {
            email: email,
            password: password
        }
    })
    .then(res => {
        soc.emit('logged data', {email: email, name: res.data.name, userType: res.data.userType, token: res.data.token, success: res.data.success, message: res.data.message})
    })
    .catch(err => {
        soc.emit('logged data', {success: err.response.data.success, message: err.response.data.message})
    })

    /** get user config from db */
    axios.get(`${dbURL}/getUserConfigByEmail`, {
        params: {
            userEmail: email
        }
    })
    .then(res => {
        userConfigs.push(res.data)
        console.log(userConfigs[0].userEmail)
    })
    .catch(err => {
        console.log(err)
    })
}