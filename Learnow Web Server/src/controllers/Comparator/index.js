import axios from 'axios'
import { dbURL } from '../../dbUrl.js'

export const Comparator = (secondSession, config, firstSession) => {
    const comparison = compareSessions(firstSession, secondSession, config)

    const comparisonResult = {
        comparisonData: comparison,
        userEmail: secondSession.userEmail,
        activity: [firstSession.activity, secondSession.activity],
        startTimeStamp: [firstSession.startTimeStamp, secondSession.startTimeStamp]
    }

    axios.post(`${dbURL}/addComparisonResult`, comparisonResult)
    .then(res => {
        console.log(res.data)
    })
    .catch(err => {
        console.log(err)
    })

    return comparisonResult
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

    /** check if there is an improvment */
    const isLowestAttentionImproved = diffLowestAttention > config.comparator_diff_lowest_attention ? true : false
    const isHighestAttentionImproved = diffHighestAttention > config.comparator_diff_highest_attention ? true : false
    const isLowestMeditationImproved = diffLowestMeditation > config.comparator_diff_lowest_meditation ? true : false
    const isHighestMeditationImproved = diffHighestMeditation > config.comparator_diff_highest_meditation ? true : false
    const isAvarageAttentionImproved = diffAvarageAttention > config.comparator_diff_avarage_attention ? true : false
    const isAvarageMeditationImproved = diffAvarageMeditation > config.comparator_diff_avarage_meditation ? true : false

    const howHelpful = (diff, specConfig) => {
        if (diff > specConfig + config.comparator_high_improve)
            return 'high'
        else if (diff > specConfig + config.comparator_medium_improve)
            return 'medium'
        else if (diff > specConfig + config.comparator_low_improve)
            return 'low'
    }
 
     /** check the improvment level in sessions */
    const howLowestAttentionImproved = isLowestAttentionImproved ? howHelpful(diffLowestAttention, config.comparator_diff_lowest_attention) : false
    const howHighestAttentionImproved = isHighestAttentionImproved ? howHelpful(diffHighestAttention, config.comparator_diff_highest_attention) : false
    const howLowestMeditationImproved = isLowestMeditationImproved ? howHelpful(diffLowestMeditation, config.comparator_diff_lowest_meditation) : false
    const howHighestMeditationImproved = isHighestMeditationImproved ? howHelpful(diffHighestMeditation, config.comparator_diff_highest_meditation) : false
    const howAvarageAttentionImproved = isAvarageAttentionImproved ? howHelpful(diffAvarageAttention, config.comparator_diff_avarage_attention) : false
    const howAvarageMeditationImproved = isAvarageMeditationImproved ? howHelpful(diffAvarageMeditation, config.comparator_diff_avarage_meditation) : false

    return {
        lowest_attention_level: howLowestAttentionImproved, 
        highest_attention_level: howHighestAttentionImproved, 
        lowest_meditation_level: howLowestMeditationImproved, 
        highest_meditation_level: howHighestMeditationImproved,
        avarage_attention_level: howAvarageAttentionImproved, 
        avarage_meditation_level: howAvarageMeditationImproved
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