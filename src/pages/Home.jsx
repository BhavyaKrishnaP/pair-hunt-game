import React, { useEffect, useRef, useState } from 'react'
import ScoreBoard from '../components/ScoreBoard'
import { categories } from '../data/cards'
import MemoryGrid from '../components/MemoryGrid'
import Settings from '../components/Settings'
import { Button, Modal } from 'react-bootstrap'
import bgMusic from '../assets/sounds/bgmusic.mp3'
import matchSound from '../assets/sounds/match.wav'
import Confetti from 'react-confetti-boom';
import { useNavigate } from 'react-router-dom'
import { FaHome } from 'react-icons/fa'

function Home() {

  const navigate = useNavigate()
  const [cards, setCards] = useState([])
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  const [moves, setMoves] = useState(0)
  const [matches, setMatches] = useState(0)
  const [time, setTime] = useState(300)
  const [gameStarted, setGameStarted] = useState(false)
  const [showWinModal, setShowWinModal] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [showLoseModal, setShowLoseModal] = useState(false)
  const [message, setMessage] = useState('')
  const [boardSize, setBoardSize] = useState(2)
  const [category, setCategory] = useState('fruits')
  const [soundOn, setSoundOn] = useState(true)

  const backgroundAudio = useRef(new Audio(bgMusic))
  const matchAudio = useRef(new Audio(matchSound))

  let maxMoves = 5

  if (boardSize == 4) {
    maxMoves = 20
  }
  if (boardSize == 6) {
    maxMoves = 40
  }

  let totalMatches = 2

  if (boardSize == 4) {
    totalMatches = 8
  }
  if (boardSize == 6) {
    totalMatches = 18
  }

  const shuffleCards = () => {

    const selectedCards = categories[category].cards.slice(0, totalMatches)

    const shuffledCards = [...selectedCards, ...selectedCards].sort(() => Math.random() - 0.5).map(card => ({ image: card, uniqueId: Math.random(), matched: false }))

    setCards(shuffledCards)
    setChoiceOne(null)
    setChoiceTwo(null)
    setMoves(0)
    setMatches(0)
    if (boardSize == 6) {
      setTime(300)
    } else if(boardSize == 4){
      setTime(180)
    }else{
      setTime(60)
    }
    setGameStarted(false)
    setDisabled(false)
  }

  const handleChoice = (card) => {
    if (!gameStarted) {
      setGameStarted(true)
    }
    if (choiceOne && choiceOne.uniqueId === card.uniqueId) {
      return
    }
    if (card.matched) {
      return
    }
    if (!disabled) {
      choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
    }
  }

  // check match
  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true)
      if (choiceOne.image === choiceTwo.image) {
        if (soundOn) {
          matchAudio.current.currentTime = 0
          matchAudio.current.play().catch(error => console.log(error))
        }
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.image === choiceOne.image) {
              return { ...card, matched: true }
            } else {
              return card
            }
          })
        })
        setMatches(prev => prev + 1)
        resetTurn()
      } else {
        setTimeout(() => {
          resetTurn()
        }, 800)
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setMoves(prev => prev + 1)
    setDisabled(false)
  }

  // timer
  useEffect(() => {
    if (!gameStarted) return

    const timer = setInterval(() => {
      setTime(prev => {
        if (prev <= 1) {
          clearInterval(timer)
          setMessage('Time Over!')
          backgroundAudio.current.pause()
          setShowLoseModal(true)
          if (boardSize == 6) {
            return 300
          } else {
            return 180
          }
        }
        return prev - 1
      })
    }, 1000);
    return () => clearInterval(timer)
  }, [gameStarted, boardSize, category])

  // music
  useEffect(() => {
    backgroundAudio.current.loop = true

    if (gameStarted && soundOn) {
      backgroundAudio.current.play().catch(error => console.log(error));
    } else {
      backgroundAudio.current.pause()
    }

    return () => {
      backgroundAudio.current.pause()
    }
  }, [soundOn, gameStarted])

  // moves limit
  useEffect(() => {
    if (moves >= maxMoves) {
      setMessage('Move Limit Reached!')
      backgroundAudio.current.pause()
      setShowLoseModal(true)
    }
  }, [moves])

  // win
  useEffect(() => {
    if (matches === totalMatches) {
      backgroundAudio.current.pause()
      setShowConfetti(true)

      setTimeout(() => {
        setShowWinModal(true)
      }, 700);

      setTimeout(() => {
        setShowConfetti(false)
      }, 4000);
    }
  }, [matches])

  // auto restart
  useEffect(() => {
    shuffleCards()
  }, [boardSize, category])

  // time format
  const formatTime = () => {
    const minutes = Math.floor(time / 60)
    const seconds = time % 60
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <>
      {showConfetti && (
        <Confetti mode="boom"
          x={0.5}
          y={0.4}
          particleCount={300}
        />
      )}
      <div className='main-bg'>

        <div className="container-fluid px-lg-4 py-3 px-3">
          <div className="top-bar">
            <div>
              <h1 className='fw-bold home-title mb-0'><span style={{ color: "red" }}>Pair</span> Hunt</h1>

              <div className='d-flex align-items-center gap-3 flex-wrap'>
                <p className='text-secondary mb-0'>Flip • Match • Win</p>
                <button className='home-btn d-flex align-items-center gap-2' onClick={() => navigate('/')}>
                  <FaHome /> Home
                </button>
              </div>
            </div>
            <ScoreBoard
              moves={moves}
              maxMoves={maxMoves}
              matches={matches}
              totalMatches={totalMatches}
              time={formatTime()} />
          </div>

          <div className="row g-3 align-items-start">
            <div className="col-lg-8">

              <div className="glass rounded-4 p-3 game-container">
                <MemoryGrid
                  cards={cards}
                  handleChoice={handleChoice}
                  choiceOne={choiceOne}
                  choiceTwo={choiceTwo}
                  disabled={disabled}
                  boardSize={boardSize}
                  backImage={categories[category].backImage} />
              </div>
            </div>

            <div className="col-lg-4">
              <Settings
                shuffleCards={shuffleCards}
                boardSize={boardSize}
                setBoardSize={setBoardSize}
                category={category}
                setCategory={setCategory}
                soundOn={soundOn}
                setSoundOn={setSoundOn} />
            </div>
          </div>
        </div>
      </div>

      {/* win modal */}
      <Modal
        show={showWinModal}
        centered
        backdrop="static" contentClassName='custom-help-modal'>
        <Modal.Body className='text-center p-4 modal-bg'>
          <div className='display-1 mb-3'>🏆</div>
          <h2 className="fw-bold text-success">You Won!! 🎉 </h2>
          <Button className='mt-3 rounded-4 win-btn'
            onClick={() => {
              setShowWinModal(false)
              if (soundOn) {
                backgroundAudio.current.play()
              }
              shuffleCards()
            }}>
            Play Again
          </Button>
        </Modal.Body>
      </Modal>

      {/* lose modal */}
      <Modal
        show={showLoseModal}
        centered
        backdrop="static" contentClassName='custom-help-modal'>
        <Modal.Body className='text-center p-4 modal-bg'>
          <h2 className="fw-bold text-danger mb-3">{message}</h2>
          <p className='text-secondary'>Better Luck Next Time!</p>
          <Button variant='danger' className='mt-3 lose-btn rounded-4' onClick={() => {
            setShowLoseModal(false)
            if (soundOn) {
              backgroundAudio.current.play()
            }
            shuffleCards()
          }}>Restart Game</Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Home