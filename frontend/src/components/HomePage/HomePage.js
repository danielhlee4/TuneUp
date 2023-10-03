import { useSelector } from "react-redux";
import homepagebackground from "./home-page-background.png"
import "./HomePage.css"

function HomePage() {
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div className="main-container">
      <div className="greeting-container">
        {currentUser && (
            <h1>
                Hey {currentUser.firstName} {currentUser.lastName}!
            </h1>
        )}
      </div>
      <div className="slogan-container">
        <div class="slogan">Find your band's missing beat</div>
        <div class="slogan">Discover the Rhythm of Friendship</div>
        <div class="slogan">Less Lonely, More Melody!</div>
      </div>
      <footer>
        <div className="scrolling-text-homepage">
          Copyright &copy; 2023 TuneUp | Developed by: Dan L. Klodian B.
          Mudassar M. Dennis L. Sean J.
        </div>
      </footer>
      <img
        className="home-page-background"
        src={homepagebackground}
        alt="Background"
      />
    </div>
  );
}


export default HomePage;
