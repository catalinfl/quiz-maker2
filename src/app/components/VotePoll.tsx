"use client"
import React, { useEffect, useState } from 'react'
import { PollType } from '../../../models/PollSchema'
import fetchData from '../../../utils/fetch'

type PollDataType = {
  resp: PollType
}


export default function VotePoll() {
  
  const [data, setData] = useState<PollDataType>({ resp: { title: "", question: "", response: [] } });
  const url = new URL(window.location.href)
  const id = url.pathname.split('/')[2]

  useEffect(() => {
    fetchData('poll', id).then(dataFetch => {
      setData(dataFetch)
    })
  }, [id])

  console.log(data.resp?.response)

  return (
    <div className="VotePoll">
      <div className="voteQuestionContainer">
        <h2 className="voteQuestion">{data.resp?.question}</h2>
      </div>
      <div className="voteResponseContainer">
        {data.resp?.response?.map((response, index) => {
          return (
            <div className="voteResponse" key={index}>
              <h3 className="voteResponseText">{response}</h3>
            </div>
          )
        })}
      </div>
    </div>
    )
}


