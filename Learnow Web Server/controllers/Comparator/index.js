export const Comparator = async (lastSession, config, secondSession) => {
    return compareSessions(secondSession, lastSession, config)
}

const compareSessions = (session1, session2, config) => {
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
        isLowestAttentionImproved: diffLowestAttention > config.comparator_diff_lowest_attention ? 'improved' : 'not improved',
        isHighestAttentionImproved: diffHighestAttention > config.comparator_diff_highest_attention ? 'improved' : 'not improved',
        isLowestMeditationImproved: diffLowestMeditation > config.comparator_diff_lowest_meditation ? 'improved' : 'not improved',
        isHighestMeditationImproved: diffHighestMeditation > config.comparator_diff_highest_meditation ? 'improved' : 'not improved',
        isAvarageAttentionImproved: diffAvarageAttention > config.comparator_diff_avarage_attention ? 'improved' : 'not improved',
        isAvarageMeditationImproved: diffAvarageMeditation > config.comparator_diff_avarage_meditation ? 'improved' : 'not improved'
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