import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { logout } from "../../store/session";
import './ProfileDropDown.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function ProfileButton({ user }) {
    const dispatch = useDispatch();
    const [showMenu, setShowMenu] = useState(false);
    const sessionUser = useSelector(state => state.session.user)
  
  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };
  
  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener('click', closeMenu);
  
    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const signout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  let dropdown;
  if (showMenu) {
    dropdown = (
      <div className="profile-dropdown-container">
        {showMenu && (
          <ul className="profile-dropdown">
            <div className="view-button-container">
                <Link to={`/users/${sessionUser._id}`}>
                    <button className="view-profile-button">View Profile</button>
                </Link>
            </div>
            <li>
                <div className="sign-out-button-container">
                    <button className="sign-out-button" onClick={signout}>Sign Out</button>
                </div>
            </li>
          </ul>)}
      </div>
    );
  } else {
    <></>
  }

  return (
    <>
      <div className="profile-button-container">
        <button className="profilebutton" onClick={openMenu}>
          ▼
        </button>
      </div>
      {dropdown}
    </>
  );
}

export default ProfileButton;