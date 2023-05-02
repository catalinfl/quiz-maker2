import mongoose, { models, model } from "mongoose"

export type ResponsesType = {
    response: string,
    id: number,
    correct: boolean
}

export type QuizType = {
    id: number,
    question: string,
    responses: Array<ResponsesType>
}

export type AllQuiz = {
    quizzes: Array<QuizType>
    title: string
}

const QuizSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true
    },
    quizzes: [{
      id: {
        type: Number,
        required: true
      },
      question: {
        type: String,
        required: true
      },
      responses: [{
        response: {
          type: String,
          required: true
        },
        id: {
          type: Number,
          required: true
        },
        correct: {
          type: Boolean,
          required: true
        }
      }]
    }]
  });

const Quiz = models.Quiz || model('Quiz', QuizSchema);

export default Quiz;