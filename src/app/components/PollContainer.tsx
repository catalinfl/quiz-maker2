"use client"
import '../../../scss/__poll.scss'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { isQuestionOrPlusOrMinusToken } from 'typescript';
import { AiOutlineFileAdd, AiFillDelete } from 'react-icons/ai'
import Image from 'next/image'
import Img from '../../../public/voting.svg'


const PollContainer = () => {


    const [pollTitle, setPollTitle] = useState<string>("");
    const [pollQuestion, setPollQuestion] = useState<string>("");
    const [responsesNumber, setResponsesNumber] = useState<number>(0);
    const [response, setResponse] = useState<string>("")
    const [allResponses, setAllResponses] = useState<Array<string>>([]);

    const responsesRef = useRef<HTMLInputElement>(null);

    const setTitleFunc = (e: ChangeEvent<HTMLInputElement>) => {
        if (pollTitle.length < 30) {
            setPollTitle(e.target.value);
        }
    }

    const setPollQuestionFunc = (e: ChangeEvent<HTMLInputElement>) => {
        if (pollQuestion.length < 30) {
            setPollQuestion(e.target.value);
        }
    }

    const setResponseFunc = (e: ChangeEvent<HTMLInputElement>) => {
        if (response.length < 30) {
            setResponse(e.target.value);
        }
    }

    const addResponses = () => {
        setResponsesNumber(responsesNumber + 1);
        setAllResponses([...allResponses, response]);
        setResponse("");
        responsesRef.current!.value = "";
    }

    return(
        <div className="pollPageContainer">
            <div className="imageContainer">
                <p className="textName principal"> Create a poll... </p>
                <Image className="image" src={Img} alt="test" />
             </div>
            <div className="createPollName">
                <p className="textName"> Title of poll </p>
                <input className="nameInput" onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleFunc(e)} type="text" />
            </div>
            <div className="createPollQuestion">
                <p className="questionName"> Question </p>
                <input className="nameInput" onChange={(e: ChangeEvent<HTMLInputElement>) => setPollQuestionFunc(e)} type="text" />
            </div>
            <div className="createPollResponse">
                 <p className="responseName"> Add a response </p>
                 <div className="responseContainer"> 
                 <input ref={responsesRef} className="nameInput" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => setResponseFunc(e)}/>
                 <AiOutlineFileAdd className="icon" onClick={() => addResponses()}/>
                 </div>
                 <div className="allResponses">
                    {allResponses.map((response, index) => {
                        return(
                            <div className="response" key={index}>
                                <p className="responseText"> {response} </p>
                                <AiFillDelete className="icon" />
                            </div>
                        )
                    })
                    }
                 </div>
            </div>
            <div className="buttonContainer">
                <button className="button"> Create </button>
            </div>
        </div>
    ) 
}

export default PollContainer