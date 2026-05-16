import React from 'react'

function Card({ card, handleChoice, flipped, disabled, backImage, boardSize }) {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card)
    }
  }

  let gridClass = 'col-6'
  
  if(boardSize === 4){
    gridClass = 'col-3'
  }
  if(boardSize === 6){
    gridClass = 'col-2'
  }

  return (
    <>
      <div className={gridClass}>

        <div className='memory-card' onClick={handleClick}>
          <div className={flipped ? 'flipped' : ''}>
            <img className='front' src={card.image} alt="image" />

            <img className='back' src={backImage} alt="image" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Card