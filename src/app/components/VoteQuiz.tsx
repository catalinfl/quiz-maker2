"use client"
import { useEffect, useState } from "react";
import { QuizType } from "../../../models/QuizSchema";
import { AiOutlineCheckSquare } from 'react-icons/ai';
import fetchData from "../../../utils/fetch";

type ResponseType = {
  id: number,
  response: string,
  correct: boolean,
}

type ItemType = {
  id: number,
  _id: string,
  question: string,
  responses: Array<ResponseType>;
}


export default function VoteQuiz() {
  
  const [data, setData] = useState<any>({ resp: { title: "", quizzes: [] } });
  const [item, setItem] = useState<ItemType[]>([]);
  const url = typeof window !== 'undefined' ? new URL(window.location.href) : null;
  const id = url?.pathname.split('/')[2] || null;
  const [items, setItems] = useState<ItemType[]>([]); 

  useEffect(() => {
    fetchData('quiz', id as string).then(data => {
      setData(data)
    })
  }, [id])



  const [userResponses, setUserResponses] = useState<any>();
  


    useEffect(() => {
      data?.resp?.quizzes?.map((quiz: ItemType) => {
        setItem((prevItem: any) => {
          if (prevItem.question === quiz.question) {
            return prevItem;
          }
          return [...prevItem, quiz]});
      });
    }, [data])

    useEffect(() => {
      const newItems = item.map((item: ItemType) => {
        const newResponses = item.responses.map((response: ResponseType) => {
          return {
            ...response, 
            correct: false
          }
        })
        return {
          ...item,
          responses: newResponses
        }
      })
      setItems(newItems);
    }, [item])



  

  return (
    <div className="VoteQuiz">
      <div className="voteTitleContainer">
        <h2 className="voteTitle">{data?.resp?.title}</h2>
      </div>
      <div className="voteContainer">
        {item.map((quiz: ItemType) => {
          return (
            <div key={quiz.id} className="allQuestion" onClick={() => {
              
            }}> 
            <div className="voteItemQuestion" key={quiz.id}>
              <h3 className="voteQuestion">{quiz.question}</h3>
            </div>
            <div className="voteResponsesContainer">
              {quiz.responses.map((response: ResponseType) => {
                  return(
                      <div className="voteResponse" key={response.id}>
                        <AiOutlineCheckSquare className="voteResponseIcon" />
                        <p> {response.response} </p>
                      </div>
                  )
              })}
            </div>
            </div>
          )})}
        </div>
        <div className="buttonContainer">
          <button className="showResultButton accessButton">Show results</button>
        </div>
    </div>
    )
}
