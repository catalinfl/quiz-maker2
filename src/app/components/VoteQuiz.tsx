"use client"
import { useEffect, useState } from "react";
import { QuizType } from "../../../models/QuizSchema";
import { AiOutlineCheckSquare } from 'react-icons/ai';
import fetchData from "../../../utils/fetch";

type ResponseType = {
  id: number,
  _id: string,
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
  const [questionNumber, setQuestionNumber] = useState<number>(0);
  const [grade, setGrade] = useState<number | string>(0);
  const [containerDisabled, setContainerDisabled] = useState<boolean>(false);

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
      setQuestionNumber(data?.resp?.quizzes?.length)
    }, [data])
    
    console.log(questionNumber)

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

    const setCorrectResponse = (responseId: string) => {
      const newItems = items.map((item: ItemType) => {
        const newResponses = item.responses.map((response: ResponseType) => {
          if (response._id === responseId) {
            return {
              ...response,
              correct: !response.correct
            }
          }
          return response;
        })
        return {
          ...item,
          responses: newResponses
        }
      }
      )
      setItems(newItems);
    };

    const onSubmitShowResults = () => {
      setContainerDisabled(true);
      let numCorrect = 0;
      let responses = 0;
      let trueResponses = 0;
      item.forEach((item: ItemType) => {
        const selectedItem = items.find((selectedItem: ItemType) => selectedItem.id === item.id);
        if (selectedItem) {
          item.responses.forEach((response: ResponseType) => {
            const selectedResponse = selectedItem.responses.find((selectedResponse: ResponseType) => selectedResponse.id === response.id);
            responses++;
            if (selectedResponse?.correct === true) {
              trueResponses++;
            }
            if (selectedResponse && selectedResponse.correct === response.correct) {
              numCorrect++;
            }
          });
        }
      });
      let partialGrade = (numCorrect/responses)*10;
      setGrade(partialGrade.toFixed(2));
      if (trueResponses === 0) {
        setGrade(0);
      }
    };

  return (
    <div className="VoteQuiz">
      { !containerDisabled ? 
      <> 
      <div className="voteTitleContainer">
        <h2 className="voteTitle">{data?.resp?.title}</h2>
      </div>
      <div className="voteContainer">
        {items.map((quiz: ItemType) => {
          return (
            <div key={quiz.id} className="allQuestion"> 
            <div className="voteItemQuestion" key={quiz.id}>
              <h3 className="voteQuestion">{quiz.question}</h3>
            </div>
            <div className="voteResponsesContainer">
              {quiz.responses.map((response: ResponseType) => {
                  return(
                      <div className="voteResponse" style={{
                        backgroundColor: response.correct ? "green" : "",
                        color: response.correct ? "white" : ""
                        }} key={response.id} onClick={() => setCorrectResponse(response._id)}>
                        <AiOutlineCheckSquare className="voteResponseIcon" 
                        style={{
                          color: response.correct ? "white" : ""
                        }}
                        />
                        <p> {response.response} </p>
                      </div>
                  )
              })}
            </div>
            </div>
          )})}
        </div>
        <div className="buttonContainer">
          <button className="showResultButton accessButton" onClick={() => onSubmitShowResults() }>Show results</button>
        </div>
        </>
        : 
        <div className="result">
          <p className="resultText"> Your grade is {grade} </p>
        </div>
        }
    </div>
    )
}
