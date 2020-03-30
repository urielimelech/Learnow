export const ResultFeedback = (SessionData) =>{
    const answersQuiz = SessionData.answersQuiz
    const correlation = SessionData.correlation

    const checkVideoCorrelation = index => {
        if (correlation.videoCorrelation.length === 0 || correlation.videoCorrelation.length < index + 1)
            return false
        else
            return true
    }

    const checkBalance = avarage => {
        const balance = 50
        return avarage > balance ? 'high' : 'low'
    }

    return answersQuiz.map((element, index) => {
        const isBalancedAttentionVideo = checkVideoCorrelation(index) ? checkBalance(correlation.videoCorrelation[index].avarageAttention) : 'low'
        const isBalancedMeditationVideo = checkVideoCorrelation(index) ? checkBalance(correlation.videoCorrelation[index].avarageMeditation) : 'low'
        const isBalancedAttentionQuiz = checkBalance(correlation.quizCorrelation[index].avarageAttention)
        const isBalancedMeditationQuiz = checkBalance(correlation.quizCorrelation[index].avarageMeditation)
        const elem = element ? 'correct' : 'incorrect'
        return (
            {
                answer: elem,
                isBalancedMeditationQuiz: isBalancedMeditationQuiz,
                isBalancedAttentionQuiz: isBalancedAttentionQuiz,
                isBalancedMeditationVideo: isBalancedMeditationVideo,
                isBalancedAttentionVideo: isBalancedAttentionVideo
            }
        )
    })
}