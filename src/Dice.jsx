import React from "react";
function Dice(props){
let styles={
    backgroundColor:props.value.isHeld?"#5ff694":"white"
    };
    return(
        <button className="dice-face" style={styles} onClick={props.heldData}>
            <h2 className="dice-value">{props.value.value}</h2>
        </button>
    );
}
export default Dice;