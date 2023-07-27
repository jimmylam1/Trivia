import React from "react";

export default function Question({question, questionId, choices, handleClick, isDone}) {
    const buttons = choices.map((c, idx) => {
        let classNames = ['choice-button']
        if (c.isSelected && !isDone)
            classNames.push('selected')
        if (isDone) {
            const hasCorrectAnswer = choices.some(i => i.isSelected && i.isCorrect)
            if (hasCorrectAnswer) 
                classNames.push(c.isSelected ? 'correct' : 'shadow')
            else {
                if (c.isSelected)
                    classNames.push('incorrect')
                else if (c.isCorrect)
                    classNames.push('correct')
                else
                    classNames.push('shadow')
            }
        }

        return <button 
            key={idx} 
            className={classNames.join(" ")} 
            onClick={handleClick} 
            id={`${questionId}-${idx}`}>{c.content}
        </button>
    })
    return <div className="question">
        <h2>{question}</h2>
        <div className="question-buttons">
            {buttons}
        </div>
    </div>
}