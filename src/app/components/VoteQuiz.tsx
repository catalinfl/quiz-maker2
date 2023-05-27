"use client"
import { useEffect, useState } from "react";
import { QuizType } from "../../../models/QuizSchema";
import { AiOutlineCheckSquare } from 'react-icons/ai';
import fetchData from "../../../utils/fetch";
type QuizDataType = {
  resp: QuizType
}

type ResponseType = {
  id: number,
  response: string,
  correct: boolean,
}

type ItemType = {
  id: number,
  question: string,
  responses: Array<ResponseType>;
}


export default function VoteQuiz() {
  
  const [data, setData] = useState<any>({ resp: { title: "", quizzes: [] } });
  const [item, setItem] = useState<ItemType[]>([]);
  const url = typeof window !== 'undefined' ? new URL(window.location.href) : null;
  console.log(url);
  const id = url?.pathname.split('/')[2] || null;
  useEffect(() => {
    fetchData('quiz', id as string).then(data => {
      setData(data)
    })
  }, [id])


    useEffect(() => {
      data?.resp?.quizzes?.map((quiz: ItemType) => {
        setItem((prevItem: any) => {
          if (prevItem.question === quiz.question) {
            return prevItem;
          }
          return [...prevItem, quiz]});
      });
    }, [data])

    console.log(item);

  return (
    <div className="VoteQuiz">
      <div className="voteTitleContainer">
        <h2 className="voteTitle">{data?.resp?.title}</h2>
      </div>
      <div className="voteContainer">
        {item.map((quiz: ItemType) => {
          return (
            <div key={quiz.id}> 
            <div className="voteItemQuestion" key={quiz.id}>
              <h3 className="voteQuestion">{quiz.question}</h3>
            </div>
            <div className="voteResponsesContainer">
              {quiz.responses.map((response: ResponseType) => {
                  return(
                      <div className="voteResponse" key={response.id}>
                        <p> {response.response} </p>
                        <AiOutlineCheckSquare className="voteResponseIcon" />
                      </div>
                  )
              })}
            </div>
            </div>
          )})}
        </div>
    </div>
    )
}
