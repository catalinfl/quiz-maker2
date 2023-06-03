"use client"
import React, { useEffect, useState } from 'react'
import { PollType } from '../../../models/PollSchema'
import fetchData from '../../../utils/fetch'
import { motion } from 'framer-motion'

type PollDataType = {
  resp: PollType
}


export default function VotePoll() {
  
  const [data, setData] = useState<PollDataType>({ resp: { title: "", question: "", response: [] } });
  const url = typeof window !== 'undefined' ? new URL(window.location.href) : null;
  const id = url?.pathname.split('/')[2]
  const [voteUnavailable, setVoteUnavailable] = useState<boolean>(false)
  const [tempResponse, setTempResponse] = useState<string>("");
  
  useEffect(() => {
    fetchData('poll', id as string).then(dataFetch => {
      setData(dataFetch)
    })
  }, [id])

  const voteFor = (index: number) => {
    setTempResponse(data.resp?.response[index] as string);
  }


  const handleAnimationComplete = () => {
    setVoteUnavailable(true);
  };

  const [animation, setAnimation] = useState<boolean>(false)


  return (
    <div className="VotePoll">
      {!voteUnavailable ? (
      <motion.div
        animate={ animation ? { opacity: 0 } : { opacity: 1 }}
        transition={animation ? { duration: 0.5 } : { }}
        onAnimationComplete={animation ? handleAnimationComplete : () => { }}
      >
          <div className="voteTitleContainer">
            <h1 className="voteTitle">{data.resp?.title}</h1>
          </div>
          <div className="voteQuestionContainer">
            <h2 className="voteQuestion">{data.resp?.question}</h2>
          </div>
          <div className="voteResponseContainer">
            {data.resp?.response?.map((response: any, index) => {
              return (
                <div
                  className="voteResponse"
                  style={{
                    backgroundColor: tempResponse === response ? "orange" : "white",
                    color: tempResponse === response ? "white" : "black"
                  }}
                  key={index}
                >
                  <h3
                    className="voteResponseText"
                    onClick={() => voteFor(index)}
                  >
                    {response}
                  </h3>
                </div>
              )
            })}
          </div>
          <div className="buttonContainer">
            <button className="accessButton" onClick={() => setAnimation(true)}>
              Vote
            </button>
          </div>
          </motion.div>
      ) : (
        <div>
          <p>Thank you for voting</p>
        </div>
      )}
    </div>
  )
}


