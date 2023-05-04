import mongoose, { models, model } from "mongoose"

export type PollType = {
    title: string,
    question: string,
    response: Array<String>
}

const PollSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    question: {
        type: String,
        required: true,
    },
    response: {
        type: Array<String>,
        required: true
    }
});

const Poll = models.Poll || model('Poll', PollSchema);

export default Poll
