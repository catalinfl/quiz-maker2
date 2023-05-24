"use client"
import { useEffect, useState } from "react";
import { QuizType } from "../../../models/QuizSchema";
import fetchData from "../../../utils/fetch";
type QuizDataType = {
  resp: QuizType
}


export default function VoteQuiz() {
  
  const params = new URLSearchParams(window.location.search);
  console.log(params)
  const [data, setData] = useState<any>({ resp: { title: "", quizzes: [] } });
  const url = new URL(window.location.href)
  const id = url.pathname.split('/')[2]
  console.log(url);
  useEffect(() => {
    fetchData('quiz', id).then(data => {
      setData(data)
    })
  }, [id])
  console.log(data);

  return (
    <div className="VoteQuiz">
      <div className="voteTitleContainer">
        <h2 className="voteTitle">{data.resp.title}</h2>
      </div>
    </div>
    )
}
