export const getAvarageAttention = monitorData => {
    var monitorDataLength = monitorData.length
    var sumAttention = 0
    monitorData.forEach(element => {
        if (element.attention === 0)
            monitorDataLength--
        sumAttention = element.attention + sumAttention
    })
    if(monitorDataLength === 0) return 0
    const attentionAvarage = sumAttention / monitorDataLength
    return attentionAvarage
}

export const getAvarageMeditation = monitorData => {
    var monitorDataLength = monitorData.length
    var sumMeditation = 0
    monitorData.forEach(element => {
        if (element.meditation === 0)
            monitorDataLength--
        sumMeditation = element.meditation + sumMeditation
    })
    if(monitorDataLength === 0) return 0
    const meditationAvarage = sumMeditation / monitorDataLength
    return meditationAvarage
}

export const lowestAttentionLevel = monitorData => {
    const attentionArr = monitorData.map((value) => {
        if (value.attention != 0)
            return value.attention
        return 101
    })
    const minAttentionValue = Math.min(...attentionArr)
    return monitorData.map(element => {
        if (element.attention !== 0 && element.attention <= minAttentionValue + 10 )
            return element
    }).filter(item => {
        return item !== undefined
    })
}

export const lowestMeditationLevel = monitorData => {
    const meditationArr = monitorData.map((value) => {
        if (value.meditation != 0)
            return value.meditation
        return 101
    })
    const minMeditationValue = Math.min(...meditationArr)
    return monitorData.map(element => {
        if (element.meditation !== 0 && element.meditation <= minMeditationValue + 10)
            return element
    }).filter(item => {
        return item !== undefined 
    })
}

export const highestAttentionLevel = monitorData => {
    const attentionArr = monitorData.map((value) => {
        return value.attention
    })
    const maxAttentionValue = Math.max(...attentionArr)
    return monitorData.map(element => {
        if (element.attention >= maxAttentionValue - 10)
            return element
    }).filter(item => {
        return item !== undefined
    })
}

export const highestMeditationLevel = monitorData => {
    const meditationArr = monitorData.map((value) => {
        return value.meditation
    })
    const maxMeditationValue = Math.max(...meditationArr)
    return monitorData.map(element => {
        if (element.meditation >= maxMeditationValue - 10)
            return element
    }).filter(item => {
        return item !== undefined
    })
}