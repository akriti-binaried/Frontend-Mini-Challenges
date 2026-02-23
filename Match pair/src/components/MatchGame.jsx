import React, { useState, useEffect } from 'react';


const SYMBOLS = ['⭐', '🍎', '🚀', '🌈', '💎', '👻', '🍀', '🔥'];

const MatchGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedCards, setMatchedCards] = useState([]);
  const [attempts, setAttempts] = useState(0);

  // Game setup function
  const initGame = () => {
    const shuffledCards = [...SYMBOLS, ...SYMBOLS]
      .sort(() => Math.random() - 0.5)
      .map((symbol, index) => ({ id: index, symbol }));
    
    setCards(shuffledCards);
    setMatchedCards([]);
    setFlippedCards([]);
    setAttempts(0);
  };

 
  useEffect(() => {
    initGame();
  }, []);

  const handleCardClick = (index) => {
    
    if (flippedCards.length === 2 || flippedCards.includes(index) || matchedCards.includes(index)) return;

    const newFlipped = [...flippedCards, index];
    setFlippedCards(newFlipped);

    
    if (newFlipped.length === 2) {
      setAttempts(prev => prev + 1);
      
      const firstCard = cards[newFlipped[0]];
      const secondCard = cards[newFlipped[1]];

      if (firstCard.symbol === secondCard.symbol) {
        setMatchedCards(prev => [...prev, newFlipped[0], newFlipped[1]]);
        setFlippedCards([]);
      } else {
       
        setTimeout(() => setFlippedCards([]), 800);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100 p-4">
      <h1 className="text-3xl font-bold mb-6 text-slate-800">Memory Match</h1>

      
      <div className="grid grid-cols-4 gap-3  rounded-xl">
        {cards.map((card, index) => {
          const isFlipped = flippedCards.includes(index) || matchedCards.includes(index);
          return (
            <div
              key={card.id}
              onClick={() => handleCardClick(index)}
              className={`w-16 h-16 sm:w-20 sm:h-20 flex items-center justify-center text-2xl cursor-pointer rounded-lg transition-all duration-300 transform ${
                isFlipped ? 'bg-yellow-200 text-white rotate-0' : 'bg-yellow-200 rotate-180'
              }`}
            >
              {isFlipped ? card.symbol : ''}
            </div>
          );
        })}
      </div>

     
      <div className="flex flex-col items-center mt-8 gap-4">
        <button
          onClick={initGame}
          className="px-8 py-2 bg-gray-300 hover:bg-gray-600 text-black border border-black"
        >
          Reset Game
        </button>

        <div className="text-xl font-semibold text-black px-6 py-2">
          Attempts: <span className="text-black">{attempts}</span>
        </div>
      </div>

     
    </div>
  );
};

export default MatchGame;