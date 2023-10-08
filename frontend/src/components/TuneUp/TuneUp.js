import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchUsers } from "../../store/users";
import { getTuneUps } from "../../store/tuneUps";
import { formatDate, formatTime, formatDateTime } from "../../util/dateUtils";
import { getUsers } from "../../store/users";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import './TuneUp.css'


const TuneUp = ({tuneUpData}) => {
    const tuneUp = tuneUpData;
    const users = useSelector(getUsers);
    const tuneUps = useSelector(getTuneUps);
    const sessionUser = useSelector(state => state.session.user);
    const [clicked, setClicked] = useState(false);

    const userIsPartOfTuneUp = sessionUser && (
        sessionUser.hostedTuneUps?.includes(tuneUp._id) || 
        sessionUser.joinedTuneUps?.includes(tuneUp._id)
    );

    return (
        <div className={`tuneUp-container ${clicked ? 'maximized' : 'minimized'}`} onClick={() => setClicked(!clicked)}>
            {!clicked && 
            <div className="minimized">
                <div className="left-minimized">
                    <h1>{users[tuneUp.host]?.firstName}'s {tuneUp?.genre} TuneUp</h1>
                </div>
                <div className="right-minimized">
                    <div className="right-top">
                        <div className="right-top-date">
                            {formatDateTime(tuneUp.date)}
                        </div>
                        <div className="right-top-location">
                            {/* add dans distance from component */}
                        </div>
                        <div className="right-top-group-size">
                            party size: {tuneUp.connections.length + 1}
                        </div>
                    </div>
                    <div className="right-bottom">
                        {tuneUp?.genres}
                    </div>
                </div>
            </div>
            }
            {clicked && 
            <div className="maximized">
                <div className="tuneUp-name">
                    <h1>{users[tuneUp.host]?.firstName}'s TuneUp</h1>
                </div>
                <div className="tuneUp-details">
                    <div className="tuneUp-date">
                        {formatDateTime(tuneUp.date)}
                    </div>
                    <div className="tuneUp-location">
                        {/* add dans distance from component */}
                    </div>
                </div>
                <div className="tuneUp-connections">
                    <ul> Musicians attending: 
                        {tuneUp.connections?.map((user) => {
                            return (<li key={user._id}>
                                <Link to={`/users/${user._id}`}>
                                    {user?.firstName ? user?.firstName : users[user].firstName}
                                </Link>
                            </li>)
                        })}
                    </ul>
                </div>
                <div className="tuneUp-footer">
                    { !userIsPartOfTuneUp && 
                        <button className="request-join-button">
                            Request to Join
                        </button>
                    }
                        Footer
                </div>
            </div>
            }
        </div>
    )

};

export default TuneUp;