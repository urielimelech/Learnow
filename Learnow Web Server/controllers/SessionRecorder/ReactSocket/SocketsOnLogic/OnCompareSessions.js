import { Comparator } from '../../../Comparator/index.js'

export const onCompareSessions = async (soc, sessionData) => {
    const comparison = await Comparator(sessionData)
    soc.emit('compared sessions', comparison)
}