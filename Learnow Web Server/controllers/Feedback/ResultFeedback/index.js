export const ResultFeedback = (SessionData) =>{
    const  answersQuiz = SessionData.answersQuiz
    const correlation = SessionData.correlation
    const balance = 50

    return answersQuiz.map((element, index) => {
        const isBalancedAttentionVideo = correlation.videoCorrelation[index].avarageAttention > balance ? '1' : '0'
        const isBalancedMeditationVideo = correlation.videoCorrelation[index].avarageMeditation > balance ? '1' : '0'
        const isBalancedAttentionQuiz = correlation.quizCorrelation[index].avarageAttention > balance ? '1' : '0'
        const isBalancedMeditationQuiz = correlation.quizCorrelation[index].avarageMeditation > balance ? '1' : '0'
        const elem = element ? '1' : '0'
        switch(elem + isBalancedMeditation + isBalancedAttention) {
            case('000'):
                console.log('answer was incorrect and meditation was low and attention was low')
                return {answer:'incorrect', meditation:'low', attention:'low'}
            case('001'):
                console.log('answer was incorrect and meditation was low and attention was high')
                return {answer:'incorrect', meditation:'low', attention:'high'}
            case('010'):
                console.log('answer was incorrect and meditation was high and attention was low')
                return {answer:'incorrect', meditation:'high', attention:'low'}
            case('011'):
                console.log('answer was incorrect and meditation was high and attention was high')
                return {answer:'incorrect', meditation:'high', attention:'high'}
            case('100'):
                console.log('answer was correct and meditation was low and attention was low')
                return {answer:'correct', meditation:'low', attention:'low'}
            case('101'):
                console.log('answer was correct and meditation was low and attention was high')
                return {answer:'correct', meditation:'low', attention:'high'}
            case('110'):
                console.log('answer was correct and meditation was high and attention was low')
                return {answer:'correct', meditation:'high', attention:'low'}
            case('111'):
                console.log('answer was correct and meditation was high and attention was high')
                return {answer:'correct', meditation:'high', attention:'high'}
        }
    });
}