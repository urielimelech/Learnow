export const sessionObj = () => {
    const obj = {
        roomName: '',
        roomNumber: 0,
        isReadyForVideo: false,
        sessionData: {
            userEmail:                  '',
            startTimeStamp:             0,
            endTimeStamp:               0,
            monitorData:                [],
            startQuizStamp:             0,
            avarageAttention:           0,
            avarageMeditation:          0,
            lowestAttentionLevel:       [],
            highestAttentionLevel:      [],
            lowestMeditationLevel:      [],
            highestMeditationLevel:     [],
            quizData:                   {},
            answersQuiz:                [],
            timeAnswersInVideo:         [],
            correlation:                {},
            feedback:                   []
        }
    }
    return obj
}
