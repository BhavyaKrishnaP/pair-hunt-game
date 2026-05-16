import React from 'react'

function ScoreBoard({ moves, maxMoves, matches, totalMatches, time }) {

  return (
    <>
      <div className="score-wrapper">
        
        <div className="score-box">
          <div className="score-title">
            MOVES
          </div>
          <div className="score-value">
            {moves}/{maxMoves}
          </div>
        </div>
       
       <div className="score-box">
          <div className="score-title">
            MATCHES
          </div>
          <div className="score-value">
            {matches}/{totalMatches}
          </div>
        </div>

        <div className="score-box">
          <div className="score-title">
            TIME
          </div>
          <div className="score-value">
            {time}
          </div>
        </div>

      </div>
    </>
  )
}

export default ScoreBoard