"use client"
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import '../../../scss/__quiz.scss'
import '../../../scss/__poll.scss'
import Img from '../../../public/quiz.svg'
import Image from 'next/image'
import { AiOutlineFileAdd, AiFillDelete } from 'react-icons/ai'
import { motion } from 'framer-motion'
import { convertToObject } from 'typescript'
import { maxHeaderSize } from 'http'
import axios from 'axios'

export type ResponseProps = {
  response: string | null;
  id: number | null;
  correct: boolean | null;
}

type SavedQuestionProps = {
  question: string;
  id: number;
}

interface QuestionFullProps extends SavedQuestionProps {
  responses: Array<ResponseProps>;
}

export default function QuizContainer() {

  const [activateQuiz, setActivateQuiz] = useState<boolean>();
  const [quiz, setQuiz] = useState<string>("");
  const [question, setQuestion] = useState<string>("");
  const [response, setResponse] = useState<string>("");
  const [count, setCount] = useState<number>(0);
  const [confirmText, setConfirmText] = useState<boolean>(false);
  const [responsesNumber, setResponsesNumber] = useState<number>(0);
  const [questionsNumber, setQuestionsNumber] = useState<number>(0);
  const [informMessage, setInformMessage] = useState<boolean>(false);

  const questionRef = useRef<HTMLInputElement>(null);
  const responseRef = useRef<HTMLInputElement>(null);

  const [current, setCurrent] = useState<number>(0)

  const [allQuestionsFull, setAllQuestionsFull] = useState<Array<QuestionFullProps>>([]);

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

  console.log(quiz)

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

  const setCurrentFunc = (id: number) => {
    setCurrent(id);
  }

  const [data, setData] = useState<any>();
  const url = new URL(window.location.href.split('/')[2]);

  const handleSaveQuiz = () => {
    setCount(count+1);
    if (count === 0) {
        setConfirmText(true);
    }
    setData({title: quiz, quizzes: allQuestionsFull})
    axios.post(`http://${url}/api/quiz`, data)
  }
  

  const handleAddEvent = (type: string) => {
    if (type === "question") {
      if (question.length >= 2 && question.length <= 100) {
        setQuestionsNumber(questionsNumber + 1);
        const savedQuestion = { question: question, id: questionsNumber, responses: [{
          response: null,
          id: null,
          correct: null
        }] };
        setAllQuestionsFull([...allQuestionsFull, savedQuestion]);
        setQuestion("");
        questionRef.current!.value = ""
      }
    }
    if (type === "response") {
      if (response.length >= 2 && response.length <= 100) {
        setResponsesNumber(allQuestionsFull[current].responses.length);
        console.log("current: " + current, "response:" + responsesNumber)
        setResponsesNumber(responsesNumber + 1)
        const savedResponse = { response: response, id: responsesNumber, correct: false };
        const questionResp = allQuestionsFull.map((question) => {
          if (question.responses.some((questionResponse) => questionResponse.id === null || questionResponse.response === null)) {
            return {
              ...question,
              responses: question.responses.filter((questionResponse) => questionResponse.id !== null && questionResponse.response !== null)
            };
          }
          return question;
        });
        questionResp[current].responses.push(savedResponse);
        setAllQuestionsFull(
          questionResp
          )
        setResponse("");
        responseRef.current!.value = ""
      }
    }
  }

  const handleDeleteEvent = (type: string, index: number) => {
    if (type === "question") {
      setAllQuestionsFull(allQuestionsFull.filter((question: QuestionFullProps, i) => i !== index));
      setQuestionsNumber(questionsNumber - 1);
    }
    if (type === "response") {
      setAllQuestionsFull(allQuestionsFull.map((question: any) => {
        question.responses = question.responses.filter((response: any, i: number) => i !== index);
        return question;
      })
      )
      }
      setResponsesNumber(responsesNumber - 1);
    }


  const handleCorrectResponse = (id: number) => {
    setAllQuestionsFull(allQuestionsFull.map((question) => {
      if (question.id === current) {
        return {
          ...question,
          responses: question.responses.map((response) => {
            if (response.id === id) {
              return {
                ...response,
                correct: !response.correct 
              }
            }              
            return response;
          })
        }
      }
      return question;
    }))
  }

  useEffect(() => {
    if (count === 2) {
      setActivateQuiz(false);
      setConfirmText(false);
      setCount(0);
      setQuiz("");
      setQuestion("");
      setResponse("");
      setAllQuestionsFull([]);
      setResponsesNumber(0);
      setQuestionsNumber(0);
      setInformMessage(true);
    }
  }, [count])



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
          <input ref={questionRef} className="quizInput" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEvent(e, "question")}/>
          {allQuestionsFull.length > 0 && <p> You&apos;re currently editing {allQuestionsFull[current]?.question} </p>}
          <div className="quizResponsesContainer">
            {allQuestionsFull.map((question, index) => {
              return (
                <div key={index} className="quizResponseContainer" onClick={() => setCurrentFunc(index)}>
                  <p className="quizResponseName"> {question.question} </p>
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
          <input ref={responseRef} className="quizInput" type="text" onChange={(e: ChangeEvent<HTMLInputElement>) => handleChangeEvent(e, "response")}/>
          <div className="quizResponsesContainer">
          {allQuestionsFull !== undefined && allQuestionsFull[current]?.responses[0]?.response !== null && allQuestionsFull[current]?.responses.map((question, index) => (
          <div key={question.id}>
              <div key={question.id} className="quizResponseContainer" onClick={() => handleCorrectResponse(question.id as number)} style={{
                backgroundColor: question.correct ? "#519651" : "#ffffff"
              }}>
                <p className="quizResponseName">{question.response}</p>
                <AiFillDelete className="icon" onClick={() => handleDeleteEvent("response", index)} />
              </div>
          </div>
        ))}
          </div>
        </motion.div>
        <motion.div animate={{ y: 0, opacity: 1 }} initial={{ y: 100, opacity: 0 }} className="buttonContainer">
                <button className="button" onClick={() => handleSaveQuiz()}> {confirmText 
                ? "Confirm"
                : "Create" } </button>
        </motion.div> 
        </div>}
        {informMessage && <div className="informMessageContainer">
          <p className="informMessage"> You have created a quiz! </p>
         </div>
          }
    </div>
    )
}
