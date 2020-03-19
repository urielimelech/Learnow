export const ActivityAnalyzer = quiz => {
    return quiz.questions.map(question => {
        // console.log('date.now', Date(Date.now()).toString())
        // console.log('user ddtaenow', Date(quiz.userInput[question.questionIndex - 1].timestamp).toString())
        return Number(question.correctAnswer) === quiz.userInput[question.questionIndex - 1].index ? true :  false
    });
}