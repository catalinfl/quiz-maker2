import React from 'react'
import { PollType } from '../../../models/PollSchema'
import Link from 'next/link';


export type FetchData = { data: {
    polls: PollType[] } };

export default function FetchPoll(data: FetchData) {
  return (
    <div className="fetchPoll">
        { data.data.polls.map((poll: PollType, index: number) => (
            <div className="poll" key={index}>
                <div className="pollQuestionContainer"> 
                <h2 className="title" > {poll.title} </h2>
                <p className="question"> {poll.question} </p>
                </div>
                <div className="buttonContainer"> 
                <Link href={`/poll/${poll._id}`}>
                <button className="accessButton secondary"> Vote </button>
                </Link>
                </div>
            </div>
        ))}
    </div>
    )
}
