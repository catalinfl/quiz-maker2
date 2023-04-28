"use client"
import React, { ChangeEvent, useEffect, useState } from 'react'
import '../../../scss/__quiz.scss'
import '../../../scss/__poll.scss'
import Img from '../../../public/quiz.svg'
import Image from 'next/image'
import { AiOutlineFileAdd, AiFillDelete } from 'react-icons/ai'
import { motion } from 'framer-motion'



export default function QuizContainer() {

  const [activateQuiz, setActivateQuiz] = useState<boolean>();
  const [quiz, setQuiz] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [response, setResponse] = useState<string>("");

  const [allResponses, setAllResponses] = useState<Array<string>>([]);
  const [responsesNumber, setResponsesNumber] = useState<number>(0);

  const [allQuestions, setAllQuestions] = useState<Array<string>>([]);
  const [questionsNumber, setQuestionsNumber] = useState<number>(0);

  const activateQuizFunc = () => {
    setActivateQuiz(!activateQuiz);
  }

  useEffect(() => {
    if (activateQuiz) {
      window.scrollTo({
        top: document.body.scrollHeight,
        behavior: 'smooth'
      })
    }
  }, [activateQuiz])


  const handleChangeEvent = (e: ChangeEvent<HTMLInputElement>, input: string) => {
    if (e.target.value.length >= 2 && e.target.value.length <= 100) {
      if (input === "quiz") {
        setQuiz(e.target.value);
      }
      if (input === "question") {
        setQuestion(e.target.value);
      }
      if (input === "response") {
        setResponse(e.target.value);
      }
    }
  }

  const handleAddEvent = (type: string) => {
    if (type === "question") {
      if (question.length >= 2 && question.length <= 100) {
        setQuestionsNumber(questionsNumber + 1);
        setAllQuestions([...allQuestions, question]);
        setQuestion("");
      }
    }
    if (type === "response") {
      if (response.length >= 2 && response.length <= 100) {
        setResponsesNumber(responsesNumber + 1);
        setAllResponses([...allResponses, response]);
        setResponse("");
      }
    }
  }

  const handleDeleteEvent = (type: string, index: number) => {
    if (type === "question") {
      setAllQuestions(allQuestions.filter((question, i) => i !== index));
      setQuestionsNumber(questionsNumber - 1);
    }
    if (type === "response") {
      setAllResponses(allResponses.filter((response, i) => i !== index));
      setResponsesNumber(responsesNumber - 1);
    }
  }



  return (
    <div className="QuizContainer">
        <div className="quizPageContainer">
          <Image className="quizImg" src={Img} alt="name" />
          <div className="quizTextContainer">
          <p className="quizText"> Create a quiz </p>
          <button className="accessButton" onClick={() => activateQuizFunc()}> Create now </button>
          </div>
        </div>
        { activateQuiz && <div className="motionContainer">
        <motion.div className="quizAdd" animate={{x: 0, opacity: 1}} initial={{x: 100, opacity: 0}}>
          <p className="quizName"> Quiz name </p>
          <input className="quizInput" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEvent(e, "quiz")} />
        </motion.div>
        <motion.div className="quizQuestion" animate={{x: 0, opacity: 1}} initial={{x: -100, opacity: 0}}>
          <div className="quizQuestionContainer">
          <p className="quizQuestionName"> Question </p>
          <AiOutlineFileAdd className="icon" onClick={() => handleAddEvent("question")}/>
          </div>
          <input className="quizInput" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEvent(e, "question")}/>
          <div className="quizResponsesContainer">
            {allQuestions.map((question, index) => {
              return (
                <div key={index} className="quizResponseContainer">
                  <p className="quizResponseName"> {question} </p>
                  <AiFillDelete className="icon" onClick={() => handleDeleteEvent("question", index)}/>
                </div>
              )
            })}
          </div>
        </motion.div>
        <motion.div className="quizResponse" animate={{x: 0, opacity: 1}} initial={{x: 100, opacity: 0}}> 
          <div className="responseContainer"> 
          <p className="quizResponseName"> Response </p>
          <AiOutlineFileAdd className="icon" onClick={() => handleAddEvent("response")}/>
          </div>
          <input className="quizInput" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEvent(e, "response")}/>
          <div className="quizResponsesContainer">
            {allResponses.map((response, index) => {
              return (
                <div key={index} className="quizResponseContainer">
                  <p className="quizResponseName"> {response} </p>
                  <AiFillDelete className="icon" onClick={() => handleDeleteEvent("response", index)}/>
                </div>
              )
            })}
          </div>
        </motion.div>
        <motion.div animate={{ y: 0, opacity: 1 }} initial={{ y: 100, opacity: 0 }} className="buttonContainer">
                <button className="button"> Create </button>
        </motion.div>
        </div>}
    </div>
    )
}
