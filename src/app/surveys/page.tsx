import { PollType } from "../../../models/PollSchema";
import { QuizType } from "../../../models/QuizSchema";
import Navbar from "../components/Navbar";
import '../../../scss/__survey.scss'
import { ChangeEvent } from "react";
import FetchPoll from "../components/FetchPoll";
import FetchQuiz from "../components/FetchQuiz";

async function fetchQuiz() {
    "use server"
    const res = await fetch('http://https://astounding-meringue-02e083.netlify.app/api/quiz', {
        next: { revalidate: 60 }
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }   
    return res.json()
  }
   
async function fetchPoll() {
    const url = typeof window !== 'undefined' ? new URL(window.location.href) : null;

    "use server"
    const res = await fetch(`http://https://astounding-meringue-02e083.netlify.app/api/poll`,
    { next: { revalidate: 60 } }
    )
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

  export default async function Page() {
    
    const quizData: { quizzes: QuizType[] }  = await fetchQuiz();
    const pollData: { polls: PollType[] } = await fetchPoll();


    return (
        <div className="SurveyPage">
            <Navbar />
            <div className="EnterContainer">
                <h1 className="surveyTitle"> Surveys </h1>
                <div className="titleContainer">
                    <h2 className="title"> Polls </h2>
                    <h2 className="title"> Quizzes </h2>
                </div>
                <div className="container"> 
                    <FetchPoll data={pollData} />
                    <FetchQuiz data={quizData} />
                </div>
            </div>
        </div>
    )
  }