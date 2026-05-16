import React from 'react'
import Card from './Card'

function MemoryGrid({ cards, handleChoice, choiceOne, choiceTwo, disabled, backImage, boardSize }) {

  return (
    <>
      <div className={`row justify-content-center ${boardSize === 6 ? 'g-1' : 'g-3'}`}>
        {cards.map(card => (
          <Card
            key={card.uniqueId}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === choiceOne || card === choiceTwo || card.matched
            }
            disabled={disabled}
            backImage={backImage}
            boardSize={boardSize} />
        ))}
      </div>
    </>
  )
}

export default MemoryGrid