import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'
import { FaPlay } from 'react-icons/fa'
import { IoIosHelpCircle } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

function Intro() {
    const navigate = useNavigate()
    const [showHelp, setShowHelp] = useState(false)

    return (
        <>
            <div className="intro-bg d-flex justify-content-center align-items-center">
                <div className="intro-card text-center p-4 p-md-5">
                    <div className="mb-4">
                        <img src="https://cdn-icons-png.freepik.com/512/3813/3813722.png" alt="logo" className='intro-logo' />
                    </div>

                    <div>
                        <h1 className='fw-bold home-title mb-0'><span style={{ color: "red" }}>Pair</span> Hunt</h1>

                        <p className='text-secondary'>Flip • Match • Win</p>
                    </div>

                    <div className='d-flex flex-column flex-md-row gap-3 justify-content-center mt-4'>
                        <Button className='play-btn rounded-5 fw-bold gap-2 d-flex justify-content-center align-items-center px-5 py-2' onClick={() => navigate('/game')}>
                            <FaPlay />PLAY GAME</Button>

                        <Button className='help-btn rounded-5 fw-bold gap-2 d-flex justify-content-center align-items-center px-5 py-2' onClick={() => setShowHelp(true)}>
                            <IoIosHelpCircle />HELP</Button>
                    </div>
                </div>
            </div>

            {/* help modal */}
            <Modal show={showHelp} centered onHide={() => setShowHelp(false)} contentClassName='custom-help-modal'>
               
                    <Modal.Body className='help-modal p-5'>
                        <h2 className='fw-bold text-center mb-4 text-white'>How To Play</h2>
    
                        <div className="help-steps">
                            <ul>
                                <li>Flip two cards</li>
                                <li>Match identical pairs</li>
                                <li>Complete before time ends</li>
                                <li>Use limited moves carefully</li>
                                <li>Turn sounds ON/OFF from settings</li>
                                <li>Match all cards to win</li>
                            </ul>
                        </div>
    
                        <div className="text-center mt-4">
                            <Button onClick={() => setShowHelp(false)} className='px-5 py-2 rounded-5 gotit-btn text-primary fw-bold'>Got It</Button>
                        </div>
                    </Modal.Body>
                
            </Modal>
        </>
    )
}

export default Intro