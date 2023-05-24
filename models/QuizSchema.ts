import mongoose, { models, model } from "mongoose"

export type QuizType = {
  _id?: number,
  title: string,
  quizzes: Array<QuestionType>
}

export type QuestionType = {
  question: string,
  responses: Array<ResponsesType>
}

export type ResponsesType = {
  response: string,
  _id: number,
  correct: boolean
}

const QuizSchema = new mongoose.Schema<QuizType>({
  title: {
    type: String,
    required: true
  },
  quizzes: [{
    question: {
      type: String,
      required: true
    },
    id: {
      type: Number,
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
})

const Quiz = models.Quiz || model('Quiz', QuizSchema);

export default Quiz;