// Started with node version 16.3.1
// run in dev mode with npm run start
import { useState } from 'react';
import './App.css';
import SingleCard from "./SingleCard";

const cardImages = [
  {"src": "/images/avocado.png"},
  {"src": "/images/blueberry.png"},
  {"src": "/images/kiwi.png"},
  {"src": "/images/strawberry.png"},
  {"src": "/images/tomato.png"},
  {"src": "/images/watermelon.png"}
]

function App() {

  const [cards, setCards] = useState([])
  const [turns, setTurns] = useState(0)

  //shuffle cards and add id to each card
  const shuffleCards = () => {

    const shuffledCards = [...cardImages, ...cardImages]
    .sort(() => Math.random() - 0.5)
    .map((card) => ({ ...card, id : Math.random() }));

    setCards(shuffledCards);
    setTurns(0);

    console.log("cards", cards);
    console.log("turns", turns);
  };

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
         <SingleCard key={card.id} card={card}/>
        ))}
      </div>
    </div>
  );
}

export default App

