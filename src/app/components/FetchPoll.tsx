import React from 'react'
import { PollType } from '../../../models/PollSchema'

export type FetchData = { data: PollType[] };

export default function FetchPoll(data: FetchData) {
    console.log(data.data.polls)
  return (
    <div className="fetchPoll">
        { data.data.polls.map((poll: PollType, index: number) => (
            <div className="poll" key={index}>
                <h2>{poll.title}</h2>
                <p>{poll.question}</p>
            </div>
        ))}
    </div>
    )
}
