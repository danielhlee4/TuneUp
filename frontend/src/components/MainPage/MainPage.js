import React from 'react';
import '../../components/MainPage/MainPage.css';
import mainpagebackground from './main-page-background.png';
import { Link } from 'react-router-dom';

function MainPage() {
  return (
    <div className="main-container">
      <div className="intro-text">Tune up with your local <br /> musicians!</div>
        <Link to={'/login'}>
          <a href="/ogin" className="bn5">Get Started</a>
        </Link>
      <footer>
            <div className='scrolling-text'>Copyright &copy; 2023 TuneUp | Developed by: Dan L. Klodian B. Mudassar M. Dennis L. Sean J.</div>
      </footer>
      <img className="main-page-background" src={mainpagebackground}></img>
    </div>
  );
}


export default MainPage;