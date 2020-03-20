export const ActivityAnalyzer = quiz => {
    return quiz.questions.map(question => {
        return Number(question.correctAnswer) === quiz.userInput[question.questionIndex - 1].index ? true :  false
    });
}