import { Comparator } from '../../../Comparator/index.js'

export const onCompareSessions = (soc, studentConfig, sessionData, secondSession) => {
    const comparison = Comparator(sessionData, studentConfig, secondSession)
    soc.emit('compared sessions', comparison)
}