import axios from 'axios'
import { dbURL } from '../../../../dbUrl.js'

export const onSaveConfiguration = (userData) => {
    axios.put(`${dbURL}/updateUserConfig`, userData)
    .then(res => console.log('user', userData.userEmail, 'save configuration successfully', res.data))
    .catch(err => {
        console.log(err)
    })
}