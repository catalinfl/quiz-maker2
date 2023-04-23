import "../../global.scss";
import '../../scss/__home.scss'  
import Buttons from "./components/Buttons";
import Navbar from './components/Navbar'
import Principal from "./components/Principal";


function Home() {
  return (
    <div className="home">
      <div className="homeContainer">
          <Navbar />
          <Principal />
          <Buttons />
      </div>
    </div>
    )
}

export default Home;