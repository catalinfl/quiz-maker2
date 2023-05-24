import React from 'react'
import '../../../../scss/__pollID.scss'
import Navbar from '@/app/components/Navbar'
import VotePoll from '@/app/components/VotePoll'


export default function PollPageID() {
  return (
    <div className="pollPageID"> 
    <Navbar />
    <VotePoll />
    </div>
    )
}
