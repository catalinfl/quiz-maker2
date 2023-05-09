import { PollType } from "../../../models/PollSchema";
import { QuizType } from "../../../models/QuizSchema";
import Navbar from "../components/Navbar";
import '../../../scss/__survey.scss'
import { ChangeEvent } from "react";

async function fetchQuiz() {
    const res = await fetch('http://localhost:3000/api/quiz', {
        next: { revalidate: 60 }
    });
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }   
    return res.json()
  }
   
async function fetchPoll() {
    const res = await fetch('http://localhost:3000/api/poll',
    { next: { revalidate: 60 } }
    )
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    return res.json();
}

  export default async function Page() {
    
    const quizData: QuizType = await fetchQuiz();
    const pollData: PollType = await fetchPoll();
    

    return (
        <div className="SurveyPage">
            <Navbar />
            <div className="EnterContainer">
                <p className="surveyText"> Select what you want to see: </p>
                <div className="container"> 
                <div className="buttonContainer">
                    {/* <button className="button" onClick={() => {
                        console.log(quizData)
                    }}> Polls </button> */}
                </div>
                <div className="buttonContainer">
                    <button className="button"> Quizzes </button>
                </div>
            </div>
        </div>
        </div>
    )
  }