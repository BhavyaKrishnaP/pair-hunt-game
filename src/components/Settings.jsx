import React from 'react'
import { AiFillSound } from 'react-icons/ai'
import { GiSoundOff, GiSoundOn } from 'react-icons/gi'
import { MdDashboardCustomize, MdOutlineCategory } from 'react-icons/md'

function Settings({ shuffleCards, boardSize, setBoardSize, category, setCategory, soundOn, setSoundOn }) {

  return (
    <>
      <div className="w-100">
        <div className="settings-card">
          <div className="d-flex align-items-center gap-2 mb-3  justify-content-center">
            <h2 className='fw-bold' style={{ color: '#0b3868b9' }}>Game Settings</h2>
          </div>
          {/* category */}
          <div className="mb-5">
            <div className='d-flex align-items-center gap-3 mb-4 fs-4 fw-bold text-white'>
              <MdOutlineCategory />
              <span>CATEGORY</span>
            </div>

            <div className="button-grid">
              <button onClick={()=> setCategory('fruits')} className='setting-btn rounded-5 border border-primary fw-bold text-white'>Fruits & Vegetables</button>

              <button onClick={()=> setCategory('programming')} className='setting-btn rounded-5 border border-primary fw-bold text-white'>Programming</button>

              <button onClick={()=> setCategory('birds')} className='setting-btn rounded-5 border border-primary fw-bold text-white'>Birds & Flowers</button>

              <button onClick={()=> setCategory('animals')} className='setting-btn rounded-5 border border-primary fw-bold text-white'>Animals</button>
            </div>
          </div>

          {/* board size */}
          <div className="mb-5">
            <div className='d-flex align-items-center gap-3 mb-4 fs-4 fw-bold text-white'>
              <MdDashboardCustomize />
              <span>BOARD SIZE</span>
            </div>

            <div className="d-flex gap-3 align-items-center justify-content-center">
              <button onClick={()=> setBoardSize(2)} className='setting-btn rounded-5 border border-primary fw-bold text-white w-100'>2x2</button>

              <button onClick={()=> setBoardSize(4)} className='setting-btn rounded-5 border border-primary fw-bold text-white w-100'>4x4</button>

              <button onClick={()=> setBoardSize(6)} className='setting-btn rounded-5 border border-primary fw-bold text-white w-100'>6x6</button>
            </div>
          </div>

          {/* sound buttons */}
          <div className='mb-5'>
            <div className='d-flex align-items-center gap-3 mb-4 fs-4 fw-bold text-white'>
              <AiFillSound />
              <span>SOUND MODE</span>
            </div>

            <div className="d-flex gap-3 align-items-center justify-content-center">
              <button onClick={()=>setSoundOn(true)} className='rounded-5 border border-primary fw-bold text-white w-100 sound-btn sound-on'><GiSoundOn className='fs-3' />ON</button>

              <button onClick={()=>setSoundOn(false)} className='rounded-5 border border-primary fw-bold text-white w-100 sound-btn sound-off'><GiSoundOff className='fs-3' />OFF</button>

            </div>
          </div>

          {/* new game */}
          <button onClick={shuffleCards} className='new-game-btn w-100 border border-primary text-white fw-bold rounded-5 p-3'>New Game</button>
        </div>
      </div>
    </>
  )
}

export default Settings