import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchUsers } from "../../store/users";
import { getTuneUps } from "../../store/tuneUps";
import { formatDate, formatTime, formatDateTime } from "../../util/dateUtils";


const TuneUp = ({tuneUpData}) => {
    const tuneUp = tuneUpData;
    const users = useSelector(getUsers);
    const tuneUps = useSelector(getTuneUps);
    const sessionUser = useSelector(state => state.session.user);
    const [clicked, setClicked] = useState(false);

    return (
        <div className="tuneUp-container" onClick={(e) => setClicked(true)}>
            {!clicked && 
            <div className="minimized">
                <div className="left-minimized">
                    <h1>{tuneUp?.firstName}'s TuneUp</h1>
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
                        {tuneUp.genres.join(", ")}
                    </div>
                </div>
            </div>
            }
            {clicked && 
            <div className="maximized">
                <div className="tuneUp-name">
                    <h1>{tuneUp?.firstName}'s TuneUp</h1>
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
                    <ul>
                        {tuneUp.connections.map((userId) => {
                            return (<li>
                                {users[userId].firstName}
                            </li>)
                        })}
                    </ul>
                </div>
                <div className="tuneUp-footer">
                        Footer
                </div>
            </div>
            }
        </div>
    )




};

export default TuneUp;