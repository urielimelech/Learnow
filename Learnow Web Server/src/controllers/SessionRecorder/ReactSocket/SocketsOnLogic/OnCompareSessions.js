import { Comparator } from '../../../Comparator/index.js'

export const onCompareSessions = (soc, userConfigs, email, sessionData, secondSession) => {
    userConfigs.forEach(async userConfig => {
        if (userConfig.userEmail === email) {
            const comparison = await Comparator(sessionData, userConfig.config, secondSession)
            soc.emit('compared sessions', comparison)
        }
    })
}