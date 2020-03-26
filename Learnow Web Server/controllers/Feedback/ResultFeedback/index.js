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
        console.log('the result of feedback:', elem + isBalancedMeditationQuiz + isBalancedAttentionQuiz + isBalancedMeditationVideo + isBalancedAttentionVideo)
        switch(elem + isBalancedMeditationQuiz + isBalancedAttentionQuiz + isBalancedMeditationVideo + isBalancedAttentionVideo) {
            case('00000'): /** 0 */
                console.log('answer was incorrect, attention and meditation in quiz: was low and attention and meditation in video: was low')
                return {answer:'incorrect', isBalancedMeditationQuiz:'low', isBalancedAttentionQuiz:'low', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'low'}
            case('00001'): /** 1 */
                console.log('answer was incorrect and in quiz: meditation was low and attention was low and in video: meditation was low and attention was high')
                return {answer:'incorrect', isBalancedMeditationQuiz:'low', isBalancedAttentionQuiz:'low', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'high'}
            case('00010'): /** 2 */
                console.log('answer was incorrect and in quiz: meditation was low and attention was low and in video: meditation was high and attention was low')
                return {answer:'incorrect', isBalancedMeditationQuiz:'low', isBalancedAttentionQuiz:'low', isBalancedMeditationVideo:'high', isBalancedAttentionVideo:'low'}
            case('00011'): /** 3 */
                console.log('answer was incorrect and in quiz: meditation was low and attention was low and in video: meditation was high and attention was high')
                return {answer:'incorrect', isBalancedMeditationQuiz:'low', isBalancedAttentionQuiz:'low', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'high'}
            case('00100'): /** 4 */
                console.log('answer was incorrect and in quiz: meditation was low and attention was high and in video: meditation was low and attention was low')
                return {answer:'incorrect', isBalancedMeditationQuiz:'low', isBalancedAttentionQuiz:'high', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'low'}
            case('00101'): /** 5 */
                console.log('answer was incorrect and in quiz: meditation was low and attention was high and in video: meditation was low and attention was high')
                return {answer:'incorrect', isBalancedMeditationQuiz:'low', isBalancedAttentionQuiz:'high', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'high'}
            case('00110'): /** 6 */
                console.log('answer was incorrect and in quiz: meditation was low and attention was high and in video: meditation is high and attention is low')
                return {answer:'incorrect', isBalancedMeditationQuiz:'low', isBalancedAttentionQuiz:'high', isBalancedMeditationVideo:'high', isBalancedAttentionVideo:'low'}
            case('00111'): /** 7 */
                console.log('answer was incorrect and in quiz: meditation was low and attention was high and in video: meditation was high and attention was high')
                return {answer:'incorrect', isBalancedMeditationQuiz:'low', isBalancedAttentionQuiz:'high', isBalancedMeditationVideo:'high', isBalancedAttentionVideo:'high'}
            case('01000'): /** 8 */
                console.log('answer was incorrect and in quiz: meditation was high and attention was low and in video: meditation was low and attention was low')
                return {answer:'incorrect', isBalancedMeditationQuiz:'high', isBalancedAttentionQuiz:'low', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'low'}
            case('01001'): /** 9 */
                console.log('answer was incorrect and in quiz: meditation was high and attention was low and in video: meditation was low and attention was high')
                return {answer:'incorrect', isBalancedMeditationQuiz:'high', isBalancedAttentionQuiz:'low', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'high'}
            case('01010'): /** 10 */
                console.log('answer was incorrect and in quiz: meditation was high and attention was low and in video meditation was high and attention was low')
                return {answer:'incorrect', isBalancedMeditationQuiz:'high', isBalancedAttentionQuiz:'low', isBalancedMeditationVideo:'high', isBalancedAttentionVideo:'low'}
            case('01011'): /** 11 */
                console.log('answer was incorrect and in quiz: meditation was high and attention was low and in video: meditation was high and attention was high')
                return {answer:'incorrect', isBalancedMeditationQuiz:'high', isBalancedAttentionQuiz:'low', isBalancedMeditationVideo:'high', isBalancedAttentionVideo:'high'}
            case('01100'): /** 12 */
                console.log('answer was incorrect and in quiz: meditation was high and attention was high and in video: meditation was low and attention was low')
                return {answer:'incorrect', isBalancedMeditationQuiz:'high', isBalancedAttentionQuiz:'high', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'low'}
            case('01101'): /** 13 */
                console.log('answer was incorrect and in quiz: meditation was high and attention was high and in video: meditation was low and attention was high')
                return {answer:'incorrect', isBalancedMeditationQuiz:'high', isBalancedAttentionQuiz:'high', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'high'}
            case('01110'): /** 14 */
                console.log('answer was incorrect and in quiz: meditation was high and attention was high and in video: meditation was high and attention aws low')
                return {answer:'incorrect', isBalancedMeditationQuiz:'high', isBalancedAttentionQuiz:'high', isBalancedMeditationVideo:'high', isBalancedAttentionVideo:'low'}
            case('01111'): /** 15 */
                console.log('answer was correct and in quiz: meditation was high and attention was high and in video: meditation was high and attention was high')
                return {answer:'incorrect', isBalancedMeditationQuiz:'high', isBalancedAttentionQuiz:'high', isBalancedMeditationVideo:'high', isBalancedAttentionVideo:'high'}
            case('10000'): /** 16 */
                console.log('answer was incorrect and in quiz: meditation was low and attention was low and in video: meditation was low and attention was low')
                return {answer:'correct', isBalancedMeditationQuiz:'low', isBalancedAttentionQuiz:'low', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'low'}
            case('10001'): /** 17 */
                console.log('answer was incorrect and in quiz: meditation was low and attention was low and in video: meditation was low and attention was high')
                return {answer:'correct', isBalancedMeditationQuiz:'low', isBalancedAttentionQuiz:'low', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'high'}
            case('10010'): /** 18 */
                console.log('answer was incorrect and in quiz: meditation was low and attention was low and in video: meditation was high and attention was low')
                return {answer:'correct', isBalancedMeditationQuiz:'low', isBalancedAttentionQuiz:'low', isBalancedMeditationVideo:'high', isBalancedAttentionVideo:'low'}
            case('10011'): /** 19 */
                console.log('answer was incorrect and in quiz: meditation was low and attention was low and in video: meditation was high and attention was high')
                return {answer:'correct', isBalancedMeditationQuiz:'low', isBalancedAttentionQuiz:'low', isBalancedMeditationVideo:'high', isBalancedAttentionVideo:'high'}
            case('10100'): /** 20 */
                console.log('answer was correct and in quiz: meditation was low and attention was high and in video: meditation was low and attention was low')
                return {answer:'correct', isBalancedMeditationQuiz:'low', isBalancedAttentionQuiz:'high', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'low'}
            case('10101'): /** 21 */
                console.log('answer was correct and in quiz: meditation was low and attention was high and in video: meditation was low and attention was high')
                return {answer:'correct', isBalancedMeditationQuiz:'low', isBalancedAttentionQuiz:'high', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'high'}
            case('10110'): /** 22 */
                console.log('answer was correct and in quiz: meditation was low and attention was high and in video: meditation was high and attention was low')
                return {answer:'correct', isBalancedMeditationQuiz:'low', isBalancedAttentionQuiz:'high', isBalancedMeditationVideo:'high', isBalancedAttentionVideo:'low'}
            case('10111'): /** 23 */
                console.log('answer was correct and in quiz: meditation was low and attention was high and in video: meditation was high and attention was high')
                return {answer:'correct', isBalancedMeditationQuiz:'low', isBalancedAttentionQuiz:'high', isBalancedMeditationVideo:'high', isBalancedAttentionVideo:'high'}
            case('11000'): /** 24 */
                console.log('answer was correct and in quiz: meditation was high and attention was low and in video: meditation was low and attention was low')
                return {answer:'correct', isBalancedMeditationQuiz:'high', isBalancedAttentionQuiz:'low', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'low'}
            case('11001'): /** 25 */
                console.log('answer was correct and in quiz: meditation was high and attention was low and in video: meditation was low and attention was high')
                return {answer:'correct', isBalancedMeditationQuiz:'high', isBalancedAttentionQuiz:'low', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'high'}
            case('11010'): /** 26 */
                console.log('answer was correct and in quiz: meditation was high and attention was low and in video: meditation was high and attention was low')
                return {answer:'correct', isBalancedMeditationQuiz:'high', isBalancedAttentionQuiz:'low', isBalancedMeditationVideo:'high', isBalancedAttentionVideo:'low'}
            case('11011'): /** 27 */
                console.log('answer was correct and in quiz: meditation was high and attention was low and in video: meditation was high and attention was high')
                return {answer:'correct', isBalancedMeditationQuiz:'high', isBalancedAttentionQuiz:'low', isBalancedMeditationVideo:'high', isBalancedAttentionVideo:'high'}
            case('11100'): /** 28 */
                console.log('answer was correct and in quiz: meditation was high and attention was high and in video: meditation was low and attention was low')
                return {answer:'correct', isBalancedMeditationQuiz:'high', isBalancedAttentionQuiz:'high', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'low'}
            case('11101'): /** 29 */
                console.log('answer was correct and in quiz: meditation was high and attention was high and in video: meditation was low and attention was high')
                return {answer:'correct', isBalancedMeditationQuiz:'high', isBalancedAttentionQuiz:'high', isBalancedMeditationVideo:'low', isBalancedAttentionVideo:'high'}
            case('11110'): /** 30 */
                console.log('answer was correct and in quiz: meditation was high and attention was high and in video: meditation was high and attention was low')
                return {answer:'correct', isBalancedMeditationQuiz:'high', isBalancedAttentionQuiz:'high', isBalancedMeditationVideo:'high', isBalancedAttentionVideo:'low'}
            case('11111'): /** 31 */
                console.log('answer was correct and in quiz: meditation was high and attention was high and in video: meditation was high and attention was high')
                return {answer:'correct', isBalancedMeditationQuiz:'high', isBalancedAttentionQuiz:'high', isBalancedMeditationVideo:'high', isBalancedAttentionVideo:'high'}
        }
    })
}