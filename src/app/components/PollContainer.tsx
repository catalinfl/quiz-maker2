"use client"
import '../../../scss/__poll.scss'
import { ChangeEvent, useEffect, useRef, useState } from 'react'
import { AiOutlineFileAdd, AiFillDelete } from 'react-icons/ai'
import Image from 'next/image'
import Img from '../../../public/voting.svg'
import { motion } from 'framer-motion'

const PollContainer = () => {

    const [pollTitle, setPollTitle] = useState<string>("");
    const [pollQuestion, setPollQuestion] = useState<string>("");
    const [responsesNumber, setResponsesNumber] = useState<number>(0);
    const [response, setResponse] = useState<string>("")
    const [allResponses, setAllResponses] = useState<Array<string>>([]);
    const [pollContainer, setPollContainer] = useState<boolean>(false);

    const responsesRef = useRef<HTMLInputElement>(null);

    const setTitleFunc = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 5 && e.target.value.length < 50) {
            setPollTitle(e.target.value);
        }
    }

    const setPollQuestionFunc = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 5 && e.target.value.length < 100) {
            setPollQuestion(e.target.value);
        }
    }

    const setResponseFunc = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.value.length > 5 && e.target.value.length < 100) {
            setResponse(e.target.value);
        }
    }

    const addResponses = () => {
        if (response.length > 5 && response.length < 100) {
            setResponsesNumber(responsesNumber + 1);
            setAllResponses([...allResponses, response]);
            setResponse("");
            responsesRef.current!.value = "";
        }
    }

    console.log(pollTitle, pollQuestion, allResponses)

    const createPollContainer = () => {
        setPollContainer(!pollContainer)
    }

    const handleDeleteResponse = (id: number) => {
        if (allResponses.length > 0) {
            setResponsesNumber(responsesNumber - 1);
            setAllResponses(allResponses.filter((response, index) => index !== id));
        }
    }

    useEffect(() => {
        if (pollContainer) {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            })
        }
    }, [pollContainer])

    return(
        <div className="pollPageContainer">
            <div className="imageContainer">
                <div className="textContainer"> 
                <p className="textName principal"> Create a poll </p>
                <button className="accessButton" onClick={() => createPollContainer()}> Create now </button>
                </div>
                <Image className="image" src={Img} alt="test" />
             </div>
           { pollContainer && 
           <div className="test"> 
           <motion.div animate={{x: 0, opacity: 1}} initial={{x: -100, opacity: 0 }} className="createPollName">
                <p className="textName"> Title of poll </p>
                <input className="nameInput" onChange={(e: ChangeEvent<HTMLInputElement>) => setTitleFunc(e)} type="text" maxLength={50} />
            </motion.div>
            <motion.div animate={{x: 0, opacity: 1}} initial={{x: 100, opacity: 0 }} className="createPollQuestion">
                <p className="questionName"> Question </p>
                <input className="nameInput" onChange={(e: ChangeEvent<HTMLInputElement>) => setPollQuestionFunc(e)} type="text" maxLength={100}/>
            </motion.div>
            <motion.div animate={{x: 0, opacity: 1}} initial={{x: -100, opacity: 0 }} className="createPollResponse">
                 <p className="responseName"> Add a response </p>
                 <div className="responseContainer"> 
                 <input ref={responsesRef} className="nameInput" type="text" maxLength={100} onChange={(e: ChangeEvent<HTMLInputElement>) => setResponseFunc(e)}/>
                 <AiOutlineFileAdd className="icon"/>
                 </div>
                 <div className="allResponses">
                    {allResponses.map((response, index) => {
                        return(
                            <div className="response" key={index}>
                                <p className="responseText"> {response} </p>
                                <AiFillDelete className="icon" onClick={() => handleDeleteResponse(index as number)}/>
                            </div>
                        )
                    })
                    }
                 </div>
            </motion.div>
            <motion.div animate={{ y: 0, opacity: 1 }} initial={{ y: 100, opacity: 0 }} className="buttonContainer">
                <button className="button"> Create </button>
            </motion.div>
            </div> }
        </div>
    ) 
}

export default PollContainer