import { Comparator } from '../../../Comparator/index.js'

export const onCompareSessions = (soc, userConfigs, email, sessionData) => {
    userConfigs.forEach(async userConfig => {
        if (userConfig.userEmail === email) {
            const comparison = await Comparator(sessionData, userConfig.config)
            soc.emit('compared sessions', comparison)
        }
    })
}