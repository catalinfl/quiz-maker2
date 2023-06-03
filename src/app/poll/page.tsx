"use client"
import Navbar from "../components/Navbar"
import '../../../scss/__navbar.scss'
import '../../../scss/__poll.scss'
import PollContainer from "../components/PollContainer"
import { openPoll, OpenPollContext } from "../../../context/OpenPollContext"
import { useContext, useState } from "react"

function PollPage() {

    const isOpen = useContext(OpenPollContext)
    
    return (
        <div className="pollPage">
            <Navbar />
            <OpenPollContext.Provider value={isOpen}>
            {!isOpen ? 
            <PollContainer />
            :
            <p> Poll created </p>
            }
            </OpenPollContext.Provider>
        </div>
        )
}

export default PollPage