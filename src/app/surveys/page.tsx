import { PollType } from "../../../models/PollSchema";
import { QuizType } from "../../../models/QuizSchema";
import Navbar from "../components/Navbar";
import '../../../scss/__survey.scss'
import { ChangeEvent } from "react";
import FetchPoll from "../components/FetchPoll";
import FetchQuiz from "../components/FetchQuiz";

async function fetchQuiz() {
    "use server"
    const res = await fetch('http://localhost:3000/api/quiz', {
        next: { revalidate: 60 }
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }   
    return res.json()
  }
   
async function fetchPoll() {
    "use server"
    const res = await fetch('http://localhost:3000/api/poll',
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
                <div className="container"> 
                    <FetchPoll data={pollData} />
                </div>
            </div>
        </div>
    )
  }