import React from 'react'
import { QuizType } from '../../../models/QuizSchema'
import Link from 'next/link';


export type FetchData = { data: {
    quizzes: QuizType[] } 
};


export default function FetchQuiz(data: FetchData) {
    return (
        <div className="fetchQuiz">
            { data.data.quizzes.map((quiz: QuizType, index: number) => (
                <div className="quiz" key={index}>
                    <h2>{quiz.title}</h2>
                    <div className="buttonContainer"> 
                    <Link href={`/quiz/${quiz._id}`}>
                    <button className="accessButton secondary"> Start Quiz </button>
                    </Link>
                    </div>
                </div>
            ))}
        </div>                    
    )
}
