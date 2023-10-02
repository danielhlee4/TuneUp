import React from 'react';
import './MainPage.css';
import mainpagebackground from './main-page-background.png';

function MainPage() {
  return (
    <div className="main-container">
      <div className="intro-text">Tune up with your local <br /> musicians!</div>
      <button className="get-started-button">GET STARTED</button>
      <footer>Copyright &copy; 2023 TuneUp</footer>
      <img className="main-page-background" src={mainpagebackground}></img>
    </div>
  );
}


export default MainPage;