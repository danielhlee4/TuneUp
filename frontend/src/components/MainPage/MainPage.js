import React from 'react';
import '../../components/MainPage/MainPage.css';
import mainpagebackground from './main-page-background.png';
import { Link } from 'react-router-dom';
import DistanceCalculator from '../Map/DistanceCalculator';

function MainPage() {
  return (
    <div className="main-container">
      <div className="intro-text">Tune up with your local <br /> musicians!</div>
        <Link to={'/login'}>
            <button className="get-started-button">GET STARTED</button>
        </Link>
      <footer>
            <div className='scrolling-text'>Copyright &copy; 2023 TuneUp | Developed by: Dan L. Klodian B. Mudassar M. Dennis L. Sean J.</div>
      </footer>
      <img className="main-page-background" src={mainpagebackground}></img>
    </div>
  );
}


export default MainPage;