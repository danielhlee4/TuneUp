import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import tuneuplogo from '../../components/NavBar/tuneuplogo.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ProfileButton from '../ProfileDropDown/ProfileDropDown';

function NavBar() {
    const loggedIn = useSelector(state => !!state.session.user);
    const sessionUser = useSelector(state => state.session.user)
    const history = useHistory();


    const getLinks = () => {
        if (loggedIn) {
            return (
                <div className="links-nav">
                    <Link to={'/home'}>
                        <img className='tuneup-logo1' src={tuneuplogo}></img>
                    </Link>
                        <div className="nav-user-name">Welcome, {sessionUser.firstName}</div>
                    <ProfileButton/>
                    <div className='about-dev-button-container1'>
                        <Link to={'/about'}>
                            <button className='about-dev-button1'>About Devs</button>
                        </Link>
                    </div>
                    <div className='right-nav-button-container'>
                        <Link to={'/discover'}>
                            <button className='discover-button'>Looking for TuneUps?</button>
                        </Link>
                        <Link to={'/create'}>
                            <button className='create-button'>+</button>
                        </Link>
                    </div>
                </div>
            );
        } else {
            return (
                <div className="links-auth">
                    <Link to={'/'}>
                        <img className='tuneup-logo2' src={tuneuplogo}></img>
                    </Link>
                    <div className='nav-bar-buttons-container'>
                        <div className='nav-signup-button-container' onClick={() => {history.push("/signup")}}>
                            <Link className='nav-signup-button' to={'/signup'}>Signup</Link>
                        </div>
                        <div className='nav-login-button-container' onClick={() => { history.push("/login") }}>
                            <Link className='nav-login-button' to={'/login'}>Login</Link>
                        </div>
                        <div className='about-dev-button-container2'>
                            <Link to={'/about'}>
                                <button className='about-dev-button2'>About Devs</button>
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
    }

    return (
        <>
            {getLinks()}
        </>
    );
}

export default NavBar;