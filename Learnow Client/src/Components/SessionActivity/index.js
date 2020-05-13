export const sessionActivity = [
    {
        videoUrl: 'https://www.youtube.com/watch?v=DIJYAWB3MhI',
        img: require('../../images/division.jpg'),
        quizSummary: {
            "quizTitle": "Division Lesson Quiz",
            "quizSynopsis": "Please answer the Questions about the video. Good Luck",
            "questions": [
              {
                "question": "In long division, from which digit we begin to calculate?",
                "questionType": "text",
                "answerSelectionType": "single",
                "answers": [
                  "Units", "Thousands", "The right most digit", "The left most digit"
                ],
                "correctAnswer": "4",
                "messageForCorrectAnswer": "Correct answer. Good job.",
                "messageForIncorrectAnswer": "Incorrect answer.",
                "explanation": "when we need to solve an exercise with long division, we begin our division with the most left digit to the most right digit.",
                "point": "30",
                "timeOfAnswerInVideoBySeconds": "45"
              },
              {
                "question": "If the digit is smaller than the divider, what should we do?",
                "questionType": "text",
                "answerSelectionType": "single",
                "answers": [
                  "Add zero to the right of the digit", "Advanced to the next digit and try to divide again", "Add to the divider the digit 0"
                ],
                "correctAnswer": "2",
                "messageForCorrectAnswer": "Correct answer. Good job.",
                "messageForIncorrectAnswer": "Incorrect answer.",
                "explanation": "If the number is smaller than the divider, we need to advance to the next digit and try to divide again until it is possible to divide the number by the divider.",
                "point": "30",
                "timeOfAnswerInVideoBySeconds": "52"
              },
              {
                "question": "What is the result of 141 / 3? calculate with long division?",
                "questionType": "text",
                "answerSelectionType": "single",
                "answers": [
                    "25", "35.2", "26.5", "47"
                ],
                "correctAnswer": "4",
                "messageForCorrectAnswer": "Correct answer. Good job.",
                "messageForIncorrectAnswer": "Incorrect answer.",
                "explanation": "go to: https://divisible.info/LongDivision/How-to-calculate-141/divided-by-3-using-long-division.html",
                "point": "40",
                "timeOfAnswerInVideoBySeconds": "187"
              }
            ]
        }
    },
    {
        videoUrl: 'https://www.youtube.com/watch?v=0Vy2Je0hLLc',
        img: require('../../images/multiply.jpg'),
        quizSummary: {
            "quizTitle": "Multiplication Lesson Quiz",
            "quizSynopsis": "Please answer the Questions about the video. Good Luck",
            "questions": [
              {
                "question": "In long multiplication, from which digit we begin to calculate?",
                "questionType": "text",
                "answerSelectionType": "single",
                "answers": [
                  "Hundreds", "Thousands", "The right most digit of the second number", "The left most digit of the first number"
                ],
                "correctAnswer": "3",
                "messageForCorrectAnswer": "Correct answer. Good job.",
                "messageForIncorrectAnswer": "Incorrect answer.",
                "explanation": `when we need to solve an exercise with long multiplication, we begin our multiplication with the most right digit of the second number and multiply by all digits of the first number from the most right to the most left digit.
When done multiply all the digits of the first number by the most right digit, we continue with the next digit the same process.`,
                "point": "30",
                "timeOfAnswerInVideoBySeconds": "104"
              },
              {
                "question": "After the multiplication, what should we do?",
                "questionType": "text",
                "answerSelectionType": "single",
                "answers": [
                  "division", "multiply again", "sum"
                ],
                "correctAnswer": "3",
                "messageForCorrectAnswer": "Correct answer. Good job.",
                "messageForIncorrectAnswer": "Incorrect answer.",
                "explanation": "When done multiply, we need to sum the result gained from the multiplication.",
                "point": "30",
                "timeOfAnswerInVideoBySeconds": "198"
              },
              {
                "question": "What is the result of 421 * 39? calculate with long division?",
                "questionType": "text",
                "answerSelectionType": "single",
                "answers": [
                    "16,000", "15,600", "17,400", "16,419"
                ],
                "correctAnswer": "4",
                "messageForCorrectAnswer": "Correct answer. Good job.",
                "messageForIncorrectAnswer": "Incorrect answer.",
                "explanation": "go to: https://www.calculatorsoup.com/calculators/math/longmultiplication.php",
                "point": "40",
                "timeOfAnswerInVideoBySeconds": "250"
              }
            ]
        }
    }
]