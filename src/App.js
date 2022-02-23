// Started with node version 16.3.1
// run in dev mode with npm run start
import { useState } from 'react';
import './App.css'

const cardImages = [
  {"src": "/img/avocado.png"},
  {"src": "/img/blueberry.png"},
  {"src": "/img/kiwi.png"},
  {"src": "/img/strawberry.png"},
  {"src": "/img/tomato.png"},
  {"src": "/img/watermelon.png"}
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
      <img src= "/public/img/avocado.png" alt= ""/>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map(card => (
          <div className="card" key= {card.id}>
            <div>
              <img className= "front" scr={card.src} alt= "card front"/>
              <img className= "back" scr= {require("./img/cover.png")} alt= "card back"/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App

