import React from "react";
import Die from "./Components/Die"
import Confetti from "react-confetti"
import {nanoid} from "nanoid"

export default function App() {
    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    const stylesWin = {
        fontSize: tenzies ? "60px" : "30px"
    }
    
    React.useEffect(() => {
        const allHeld = dice.every(die => die.isHeld)
        const firstValue = dice[0].value
        const allSameValue = dice.every(die => die.value === firstValue)
        if (allHeld && allSameValue) {
            setTenzies(true)
        }
    }, [dice])
    
    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    const diceElements = dice.map(die => (
        <Die key={die.id} value={die.value} isHeld={die.isHeld} holdDice={() => holdDice(die.id)} />
    ))
    
    function rollDice() {
        setDice(oldDice => oldDice.map(die => {
            return die.isHeld ? 
                die :
                generateNewDie()
        }))
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? 
                {...die, isHeld: !die.isHeld} :
                die
        }))
    }
    
    function restart() {
        setTenzies(false)
        setDice(allNewDice())
    }
    
    return (
        <main className="container">
            <h1 
                className="tenzies--title"
                style={stylesWin}>
                {tenzies ? "You won!" : "Tenzies"}
            </h1>
            <p 
                className="tenzies--p">
                {tenzies ? "" : "Roll until all dice are the same. Click each die to freeze it at its current value between rolls."}
            </p>
            <div className="container--die">
                {diceElements}
            </div>
            <button 
                className="tenzies--button" 
                onClick={tenzies ? restart : rollDice}>
                {tenzies ? "Restart" : "Roll"}
                {tenzies && <Confetti />}
            </button>
        </main>
    )
}
