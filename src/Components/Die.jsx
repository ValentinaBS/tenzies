import React from "react"

export default function Die(props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }
    
    return (
        <div 
            className="square--die"
            style={styles}
            onClick={props.holdDice}
        >
            <h1 className="number--die">{props.value}</h1>
        </div>
    )
}