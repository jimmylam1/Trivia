import React, { useEffect, useState } from "react";
import './styles.css'
import Home from "./components/Home";
import QuestionsScreen from "./components/QuestionsScreen";
import fetchQuestions from "./fetchQuestions";

export default function App() {
    const defaultScreenData = {
        screenNum: 0,
        token: ''
    }
    const [screen, setScreen] = useState(defaultScreenData)  
    const [initialQuestions, setInitialQuestions] = useState([])
    const [category, setCategory] = useState('')
    const [difficulty, setDifficulty] = useState('')

    useEffect(() => {
        setToken() // token prevents questions from repeating
    }, [])
    useEffect(() => {
        fetchQuestions(screen.token, category, difficulty).then(q => setInitialQuestions(q))
    }, [screen, category, difficulty])

    function handleStart() {
        if (!screen.token)
            return
        setScreen(prevScreen => ({
            ...prevScreen,
            screenNum: 1
        }))
    }
    function handleCategorySelect(event) {
        setCategory(event.target.value)
    }
    function handleDifficultySelect(event) {
        setDifficulty(event.target.value)
    }
    function handleHome() {
        setScreen(prevScreen => ({
            ...prevScreen,
            screenNum: 0
        }))
    }
    async function setToken() {
        const res = await fetch('https://opentdb.com/api_token.php?command=request')
        const resJSON = await res.json()
        setScreen(prevScreen => ({
            ...prevScreen,
            token: resJSON.token
        }))
    }

    return <main>
        <div className="yellow-blob"></div>
        <div className="blue-blob"></div>
        {screen.screenNum === 0 && 
            <Home 
                handleStart={handleStart} 
                canStart={screen.token} 
                category={category} 
                handleCategorySelect={handleCategorySelect}
                difficulty={difficulty}
                handleDifficultySelect={handleDifficultySelect}
            />
        }
        {screen.screenNum === 1 && 
            <QuestionsScreen 
                token={screen.token} 
                initialQuestions={initialQuestions} 
                category={category} 
                difficulty={difficulty}
                handleHome={handleHome}
            />
        }
    </main>
}
