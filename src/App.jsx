import React from "react";
import "./styles.css";
import Dice from "./Dice.jsx";
import Confetti from "react-confetti";
import audioEffect from "./audio/crowd.mp3";
function App() {
    
    const [audio] = React.useState(new Audio(audioEffect)); // Create an Audio object
    function randomNumbers() {
        let rand = [];
        for (let i = 0; i < 10; i++) {
    
        rand.push({
          value: Math.floor(Math.random() * 6 + 1),
          isHeld: false,
          id: i,
        });
      }
    
    return rand;
  }
  const [dice, setDice] = React.useState(randomNumbers());
  const [tenzies,setTenzies]=React.useState(false);
  function handleClick() {
    if(tenzies)
    {
        setDice(randomNumbers());
        setTenzies(false);
        audio.pause();
    }
    else
    {
    setDice((prevData)=>{
        let temp=prevData.map((dice)=>{
            if(dice.isHeld)
            {   
                console.log(dice.isHeld);
                return dice;
            }
            else
            {
                return {...dice,value: Math.floor(Math.random() * 6 + 1)}
            }
        });
        return temp;
    });
    }
  }
  function heldData(id){
    
    setDice((prevData)=>
    {
    let temp=prevData.map((object)=>{
        if(object.id===id)
        {   
            return {...object,isHeld:!object.isHeld}
        }
        else
        {
            return object;
        }
    });   
    
    return temp;  
});
console.log(dice);   
  
}
React.useEffect(()=>{
    let flag=1;
  
    for(let i=1;i<dice.length;i++)
    {   
        if((dice[i].value!==dice[i-1].value))
        {
            flag=0;
        }
        if(!dice[i].isHeld||!dice[i-1].isHeld)
        {
            flag=0;
        }
    }
    if(flag===1)
    {
        setTenzies(true);
        audio.play();
    }
},[dice,audio]);
  
React.useEffect(()=>{
console.log("YOU WON")
},[tenzies]);
  return (
      <main>
      {tenzies && <Confetti/>}
      <h1 className="title">Tenzies</h1>
        <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
        <div className="dice-container">
          {dice.map((data) => {
            return <Dice key={data.id} value={data} heldData={()=>heldData(data.id)}/>;
          })}
        </div>
        <button onClick={handleClick} className="btn">{tenzies?"NEW GAME":"ROLL"}</button>
      </main>
  );
}
export default App;
