"use client"
import React, { useEffect, useState } from 'react'
import '../../../scss/__quiz.scss'
import '../../../scss/__poll.scss'
import Img from '../../../public/quiz.svg'
import Image from 'next/image'
import { AiOutlineFileAdd, AiFillDelete } from 'react-icons/ai'
import { motion } from 'framer-motion'



export default function QuizContainer() {

  const [activateQuiz, setActivateQuiz] = useState<boolean>();

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
          <input className="quizInput" type="text" />
        </motion.div>
        <motion.div className="quizQuestion" animate={{x: 0, opacity: 1}} initial={{x: -100, opacity: 0}}>
          <div className="quizQuestionContainer">
          <p className="quizQuestionName"> Question </p>
          <AiOutlineFileAdd className="icon"/>
          </div>
          <input className="quizInput" type="text" />
        </motion.div>
        <motion.div className="quizResponse" animate={{x: 0, opacity: 1}} initial={{x: 100, opacity: 0}}> 
          <div className="responseContainer"> 
          <p className="quizResponseName"> Response </p>
          <AiOutlineFileAdd className="icon"/>
          </div>
          <input className="quizInput" type="text" />
        </motion.div>
        <motion.div animate={{ y: 0, opacity: 1 }} initial={{ y: 100, opacity: 0 }} className="buttonContainer">
                <button className="button"> Create </button>
        </motion.div>
        </div>}
    </div>
    )
}
