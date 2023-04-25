import Navbar from "../components/Navbar"
import '../../../scss/__navbar.scss'
import '../../../scss/__poll.scss'
import PollContainer from "../components/PollContainer"

function PollPage() {

    return (
        <div className="pollPage">
            <Navbar />
            <PollContainer />
        </div>
        )
}

export default PollPage