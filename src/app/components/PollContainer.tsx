"use client"
import '../../../scss/__poll.scss'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { isQuestionOrPlusOrMinusToken } from 'typescript';
import { AiOutlineFileAdd } from 'react-icons/ai'

const PollContainer = () => {

    const [pollTitle, setPollTitle] = useState<string>("");
    const [responses, setResponses] = useState<number>(1);

    const numberInputRef = useRef<HTMLInputElement>(null);

    const setTitleFunc = (e: ChangeEvent<HTMLInputElement>) => {
        if (pollTitle.length < 30) {
            setPollTitle(e.target.value);
        }
    }

    const addResponses = () => {
        setResponses(responses + 1);
    }




    return(
        <div className="pollPageContainer">
            <div className="createPollName">
                <p className="textName"> Title of poll </p>
                <input className="nameInput" onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleFunc(e)} type="text" />
            </div>
            <div className="createPollQuestion">
                <p className="questionName"> Question </p>
                <input className="nameInput" onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleFunc(e)} type="text" />
            </div>
            <div className="createPollResponse">
                 <p className="responseName"> Add a response </p>
                 <div className="responseContainer"> 
                 <input className="nameInput" type="text" />
                 <AiOutlineFileAdd className="icon"/>
                 </div>
            </div>
        </div>
    ) 
}

export default PollContainer