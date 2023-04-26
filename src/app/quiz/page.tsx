import Navbar from "../components/Navbar";
import '../../../scss/__navbar.scss'
import '../../../scss/__quiz.scss'
import QuizContainer from "../components/QuizContainer";

function QuizPage() {
    return (
        <div className="QuizPage">
            <Navbar />
            <QuizContainer />
        </div>
    )

}

export default QuizPage;