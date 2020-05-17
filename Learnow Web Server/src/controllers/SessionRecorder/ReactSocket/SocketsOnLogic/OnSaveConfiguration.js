import axios from 'axios'
import { dbURL } from '../../../../dbUrl.js'

export const onSaveConfiguration = (userConfigs, config, userEmail) => {
    userConfigs.forEach(userConfig => {
        if (userConfig.userEmail === userEmail) {
            userConfig.config = config
            axios.put(`${dbURL}/updateUserConfig`, userConfig)
            .then(res => console.log('user', userEmail, 'save configuration successfully', res.data))
            .catch(err => {
                console.log(err)
            })
        }
    })
}