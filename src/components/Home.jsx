import React from "react";
import categories from "../data/categories";
import difficulties from "../data/difficulties";

export default function Home({handleStart, canStart, category, handleCategorySelect, difficulty, handleDifficultySelect}) {
    let classNames = ['main-button']
    if (!canStart)
        classNames.push('home-disabled')

    const categoryChoices = categories.map((c, idx) => <option key={idx} value={c.value}>{c.name}</option>)
    const difficultyChoices = difficulties.map((d, idx) => <option key={idx} value={d.value}>{d.name}</option>)

    return <div className='home'>
        <h1>Trivia</h1>
        <p>How many questions can you get correct?</p>
        <label htmlFor="category-select">Category</label>
        <select id="category-select" value={category} onChange={handleCategorySelect}>
            {categoryChoices}
        </select>
        <label htmlFor="difficulty-select">Difficulty</label>
        <select id="difficulty-select" value={difficulty} onChange={handleDifficultySelect}>
            {difficultyChoices}
        </select>
        <button className={classNames.join(" ")} onClick={handleStart}>{canStart ? 'Start Trivia' : 'Loading...'}</button>
    </div>
}