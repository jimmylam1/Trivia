export default async function fetchQuestions(token, category, difficulty) {
    let queryParams = {
        amount: 5,
        category,
        difficulty
    }
    if (token)
        queryParams.token = token

    const formattedParams = new URLSearchParams(queryParams)
    const res = await fetch(`https://opentdb.com/api.php?${formattedParams}`)
    const json = await res.json()
    const questions = json.results.map(i => ({
        question: decodeHtmlCharCodes(i.question),
        choices: getChoices(i.correct_answer, i.incorrect_answers)
    }))

    if (questions.length === 0) {
        return fetchQuestions(null, category, difficulty)
    }

    return questions
}

function getChoices(correctAnswer, incorrectAnswers) {
    function choiceObject(content, isCorrect, isSelected=false) {
        return {
            content: decodeHtmlCharCodes(content),
            isCorrect,
            isSelected,
        }
    }

    let choices = incorrectAnswers.map(i => choiceObject(i, false))
    const idx = Math.floor(Math.random()*incorrectAnswers.length)
    choices.splice(idx, 0, choiceObject(correctAnswer, true))
    return choices
}

const decodedString = document.createElement("textarea");
function decodeHtmlCharCodes(str) {
    decodedString.innerHTML = str;
    return decodedString.value;
}