import { useSelector } from "react-redux";
import homepagebackground from "./home-page-background.png"
import userIcon from "./user-icon.png"
import discoverIcon from "./discover-icon.png"
import searchIcon from "./search-icon.png"
import userProfileDemo from "./UserProfileDemo.gif"
import searchDemo from "./search.gif"
import discoverDemo from "./discover.gif"
import dropArrowIcon from "./drop-arrow-icon.png"
import "./HomePage.css"

function HomePage() {
  const currentUser = useSelector((state) => state.session.user);

  return (
    <div className="main-container">
      <div className="greeting-container">
        {currentUser && (
            <h1>
                Hey, {currentUser.firstName}!
            </h1>
        )}
      </div>
      <div className="slogan-container">
        <div className="slogan">Find your band's missing beat</div>
        <div className="slogan">Discover the Rhythm of Friendship</div>
        <div className="slogan">Less Lonely, More Melody!</div>
      </div>
      <div className="tutorial-dropdown-container">
          <img src={dropArrowIcon}></img>
      </div>
      <div className="user-profile-demo">
        
        <div className="demo-gif-container-1">
          <img className="user-profile-demo-gif" src={userProfileDemo}></img>
          <div className="user-profile-tutorial">
            <div className="header-container-1">
              <img className="profile-icon-png" src={userIcon}></img>
              <h2 className="your-profile-page-header">Your Profile Page</h2>
            </div>
            <p className="profile-tutorial-description">
              <br/>
              Click the dropdown menu on the top left corner of your screen
              to navigate to your profile page to view your joined/hosted TuneUps!
            </p>
          </div>
        </div>

        <div className="demo-gif-container-2">
          <img className="discover-demo-gif" src={discoverDemo}></img>
          <div className="discover-tutorial">
            <div className="header-container-2">
              <img className="discover-icon-png" src={discoverIcon}></img>
              <h2 className="discover-page-header">Discover</h2>
            </div>
            <p className="discover-tutorial-description">
              <br />
              Click the "looking for tuneups?" button<br/>
              on right side of the tuneup logo to
              <br/>
              navigate to the tuneup discover page.
              <br />
              You can look for a perfect jam session 
              <br />
              just for you!
            </p>
          </div>
        </div>

        <div className="demo-gif-container-3">
          <img className="search-demo-gif" src={searchDemo}></img>
          <div className="search-tutorial">
            <div className="header-container-3">
              <img className="search-icon-png3" src={searchIcon}></img>
              <h2 className="search-page-header">Search</h2>
            </div>
            <p className="search-tutorial-description">
              <br />
              By click the search bar at the top of the tuneup list to search for specific 
              <br/>
              tuneups by their genre or instruments!
            </p>
          </div>
        </div>

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
