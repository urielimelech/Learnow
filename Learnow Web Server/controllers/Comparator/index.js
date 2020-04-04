import axios from 'axios'

export const Comparator = (lastSession) => {

    const allSessions = Promise.resolve(getSession())

    const sessions = allSessions.then((session)=>{
        return session
    })
    return sessions.then((session)=>{
        return compareSessions(session[0], lastSession)
    })
}

const compareSessions = (session1, session2) => {
    const session1Attention = getAttentionValues(session1)
    const session2Attention = getAttentionValues(session2)
    const session1Meditation = getMeditationValues(session1)
    const session2Meditation = getMeditationValues(session2)

    const diffLowestAttention = session2Attention.lowest - session1Attention.lowest
    const diffHighestAttention = session2Attention.highest - session1Attention.highest

    const diffLowestMeditation = session2Meditation.lowest - session1Meditation.lowest
    const diffHighestMeditation = session2Meditation.highest - session1Meditation.highest

    const diffAvarageAttention = session2Attention.avarage - session1Attention.avarage
    const diffAvarageMeditation = session2Meditation.avarage - session1Meditation.avarage

    return {
        isLowestAttentionImproved: diffLowestAttention > 0 ? 'improved' : 'not improved',
        isHighestAttentionImproved: diffHighestAttention > 0 ? 'improved' : 'not improved',
        isLowestMeditationImproved: diffLowestMeditation > 0 ? 'improved' : 'not improved',
        isHighestMeditationImproved: diffHighestMeditation > 0 ? 'improved' : 'not improved',
        isAvarageAttentionImproved: diffAvarageAttention > 0 ? 'improved' : 'not improved',
        isAvarageMeditationImproved: diffAvarageMeditation > 0 ? 'improved' : 'not improved'
    }
}

const getAttentionValues = session => {
    return {
        lowest: Math.min(
            ...session.lowestAttentionLevel.map(element => {
                return element.attention
        })),
        highest: Math.max(
            ...session.highestAttentionLevel.map(element => {
                return element.attention
            })),
        avarage: session.avarageAttention
    }
}

const getMeditationValues = session => {
    return {
        lowest: Math.min(
            ...session.lowestMeditationLevel.map(element => {
                return element.meditation
        })),
        highest: Math.max(
            ...session.highestMeditationLevel.map(element => {
                return element.meditation
            })),
        avarage: session.avarageMeditation
    }
}

const getSession = async () => {
    try {
        const result = await axios (
            `http://localhost:13860/getAllSessions`
        )
         return result.data
    }
    catch (e){
        console.log('catch', e)
        return e
    }
}