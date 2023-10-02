import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';
import tuneuplogo from '../../components/NavBar/tuneuplogo.png'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function NavBar() {
    const loggedIn = useSelector(state => !!state.session.user);
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
                    <img className='tuneup-logo' src={tuneuplogo}></img>
                    <button onClick={logoutUser}>Logout</button>
                </div>
            );
        } else {
            return (
                <div className="links-auth">
                    <img className='tuneup-logo' src={tuneuplogo}></img>
                    <div className='nav-signout-button-container'>
                        <Link className='nav-signout-button' to={'/signup'}>Signup</Link>
                    </div>
                    <div className='nav-login-button-container'>
                        <Link className='nav-login-button' to={'/login'}>Login</Link>
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