// Started with node version 16.3.1
// run in dev mode with npm run start
import { useEffect, useState } from "react";
import "./App.css";
import SingleCard from "./SingleCard";

const cardImages = [
  { src: "/images/avocado.png", matched: false },
  { src: "/images/blueberry.png", matched: false },
  { src: "/images/kiwi.png", matched: false },
  { src: "/images/strawberry.png", matched: false },
  { src: "/images/tomato.png", matched: false },
  { src: "/images/watermelon.png", matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  //shuffle cards and add id to each card
  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setChoiceOne(null)
    setChoiceTwo(null)
    setCards(shuffledCards);
    setTurns(0);
  };

  //handle a choice
  //if choice one is null, set state of choiceOne with card,
  //otherwise set state of choiceTwo with card
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card);
  };

  //reset choices and increase turns
  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurns((prevTurns) => prevTurns + 1)
    setDisabled(false)
  };

  //compare two selected cards
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.src === choiceTwo.src) {
        //set cards state
        setCards((prevCards) => {
          //because we want to change one value of state, we can map over the state array
          return prevCards.map((card) => {
            if (card.src === choiceOne.src) {
              //and change only the matched value if there is a match
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo]);

  useEffect(() =>{
    shuffleCards()
  }, [])

  

  return (
    <div className="App">
      <h1>Memory Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns Taken: {turns}</p>
    </div>
  );
}

export default App;
