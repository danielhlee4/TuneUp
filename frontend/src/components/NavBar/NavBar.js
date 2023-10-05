import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import tuneuplogo from '../../components/NavBar/tuneuplogo.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function NavBar() {
    const loggedIn = useSelector(state => !!state.session.user);
    const sessionUser = useSelector(state => state.session.user)
    const dispatch = useDispatch();
    const history = useHistory();

    const logoutUser = e => {
        e.preventDefault();
        dispatch(logout());
    }

    const getLinks = () => {
        if (loggedIn) {
            return (
                <div className="links-nav">
                    <Link to={'/home'}>
                        <img className='tuneup-logo' src={tuneuplogo}></img>
                    </Link>
                    <Link to={`/users/${sessionUser._id}`}>
                        <p className="nav-user-name">Welcome, {sessionUser.firstName}</p>
                    </Link>
                        <button className="signout-button" onClick={logoutUser}>Logout</button>
                    <Link to={'/discover'}>
                        <button className='discover-button'>Looking for TuneUps?</button>
                    </Link>
                </div>
            );
        } else {
            return (
                <div className="links-auth">
                    <Link to={'/'}>
                        <img className='tuneup-logo' src={tuneuplogo}></img>
                    </Link>
                    <div className='nav-bar-buttons-container'>
                        <div className='nav-signup-button-container'>
                            <Link className='nav-signup-button' to={'/signup'}>Signup</Link>
                        </div>
                        <div className='nav-login-button-container'>
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