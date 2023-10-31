import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import tuneuplogo from '../../components/NavBar/tuneuplogo.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import ProfileButton from '../ProfileDropDown/ProfileDropDown';

function NavBar() {
    const loggedIn = useSelector(state => !!state.session.user);
    const sessionUser = useSelector(state => state.session.user)
    const isUpdateAfterSignup = useSelector(state => state.session.isUpdateAfterSignup);
    const history = useHistory();

    const getLinks = () => {
        if (loggedIn) {
            return (
                <div className="links-nav">
                    <div className='left-nav'>
                        <div className='welcome-container'>
                            <div className="nav-user-name">Welcome, {sessionUser.firstName}</div>
                            <ProfileButton className='profilebutton' />
                        </div>
                        <div className='about-dev-button-container1'>
                            <Link to={'/about'}>
                                <button className='about-dev-button1'>About Devs</button>
                            </Link>
                        </div>
                    </div>
                    <Link to={'/home'} className='tuneup-logo-1-container'>
                        <img className='tuneup-logo1' src={tuneuplogo}></img>
                    </Link>
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
                    <div className='about-dev-button-container2'>
                        <Link to={'/about'}>
                            <button className='about-dev-button2'>About Devs</button>
                        </Link>
                    </div>
                    <Link to={'/'} className='tuneup-logo-2-container'>
                        <img className='tuneup-logo2' src={tuneuplogo} />
                    </Link>
                    <div className='right-nav-button-container2'>
                        <div className='nav-signup-button-container' onClick={() => { history.push("/signup") }}>
                            <Link className='nav-signup-button' to={'/signup'}>Signup</Link>
                        </div>
                        <div className='nav-login-button-container' onClick={() => { history.push("/login") }}>
                            <Link className='nav-login-button' to={'/login'}>Login</Link>
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