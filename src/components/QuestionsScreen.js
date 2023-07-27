import React from "react";
import Question from "./Question";
import fetchQuestions from "../fetchQuestions";
import categories from "../data/categories";
import difficulties from "../data/difficulties";

function setSelectedChoice(choice, questionIdx, choiceIdx, qIdx, cIdx) {
    if (questionIdx !== qIdx)
        return choice.isSelected
    return choiceIdx === cIdx
}

export default function QuestionsScreen({token, initialQuestions, category, difficulty, handleHome}) {
    const [nextQuestionArray, setNextQuestionArray] = React.useState([])
    const [questionsArray, setQuestionsArray] = React.useState(initialQuestions)
    const [isDone, setIsDone] = React.useState(false)

    function numCorrectAnswers() {
        let count = 0
        for (let question of questionsArray) {
            if (question.choices.some(c => c.isSelected && c.isCorrect))
                count++
        }
        return count
    }
    function handleClick(event) {
        if (isDone)
            return
        
        const split = event.target.id.split("-")
        const [questionIdx, choiceIdx] = [parseInt(split[0]), parseInt(split[1])]
        setQuestionsArray(prev => {
            return prev.map((qObj, qIdx) => ({
                ...qObj, 
                choices: qObj.choices.map((c, cIdx) => ({
                    ...c,
                    isSelected: setSelectedChoice(c, questionIdx, choiceIdx, qIdx, cIdx)
                }))
            }))
        })
    }
    function allQuestionsAnswered() {
        for (let q of questionsArray) {
            if (!q.choices.some(c => c.isSelected)) {
                return false
            }
        }
        return true
    }
    function handleMainButton() {
        if (!allQuestionsAnswered())
            return

        if (!isDone)
            return setIsDone(true)
        
        setQuestionsArray(nextQuestionArray)
        fetchQuestions(token, category, difficulty).then(questions => setNextQuestionArray(questions))
        setIsDone(false)
    }

    React.useEffect(() => {
        fetchQuestions(token, category, difficulty).then(questions => setNextQuestionArray(questions))
    }, [])

    const questions = questionsArray.map((q, idx) => {
        return <Question 
            key={idx}
            question={q.question} 
            questionId={idx} 
            choices={q.choices} 
            handleClick={handleClick}
            isDone={isDone}
        />
    })
    const categoryText = categories.find(i => i.value === category).name
    const difficultyText = difficulties.find(i => i.value === difficulty).name

    let mainButtonClassNames = ['main-button']
    if (!allQuestionsAnswered())
        mainButtonClassNames.push('main-button-disabled')

    return <div className="questions">
        <div className="header">
            <div className="home-button" onClick={handleHome}></div>
            <h1>Trivia</h1>
        </div>
        <p id="settings-text">{`Category: ${categoryText} | Difficulty: ${difficultyText}`}</p>
        {questions.length > 1 && questions}
        <div className="main-button-container">
            {isDone && <p className="correct-text">{`You scored ${numCorrectAnswers()}/${questionsArray.length} correct answers`}</p>}
            <button className={mainButtonClassNames.join(" ")} onClick={handleMainButton}>{isDone ? "Play Again" : "Check answers"}</button>
        </div>
    </div>
}
