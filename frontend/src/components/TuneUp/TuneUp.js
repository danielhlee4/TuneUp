import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { fetchUsers } from "../../store/users";
import { getTuneUps, updateTuneUp } from "../../store/tuneUps";
import { formatDate, formatTime, formatDateTime } from "../../util/dateUtils";
import { getUsers } from "../../store/users";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./TuneUp.css";
import jwtFetch from "../../store/jwt";
import DistanceCalculator from "../Map/DistanceCalculator";

const TuneUp = ({ tuneUpData }) => {
  const tuneUp = tuneUpData;
  const users = useSelector(getUsers);
  const tuneUps = useSelector(getTuneUps);
  const sessionUser = useSelector((state) => state.session.user);
  const [clicked, setClicked] = useState(false);

  const userIsPartOfTuneUp =
    sessionUser &&
    (sessionUser.hostedTuneUps?.includes(tuneUp._id) ||
      sessionUser.joinedTuneUps?.includes(tuneUp._id));

  const handleAcceptRequest = async (requestingUserId) => {
    const response = await jwtFetch(`/api/tuneups/${tuneUp._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pendingConnections: tuneUp.pendingConnections.filter(
          (id) => id !== requestingUserId
        ),
        connections: [...tuneUp.connections, requestingUserId],
      }),
    });
    const updatedTuneUp = await response.json();
    updateTuneUp(updatedTuneUp);
  };

  const handleDenyRequest = async (requestingUserId) => {
    const response = await jwtFetch(`/api/tuneups/${tuneUp._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pendingConnections: tuneUp.pendingConnections.filter(
          (id) => id !== requestingUserId
        ),
      }),
    });
    const updatedTuneUp = await response.json();
    updateTuneUp(updatedTuneUp);
  };

  const handleLeaveTuneUp = async () => {
    const response = await jwtFetch(`/api/tuneups/${tuneUp._id}/unjoin`, {
      method: "POST",
    });

    const updatedTuneUp = await response.json();
    updateTuneUp(updatedTuneUp);
  };

  const handleRequestToJoin = async () => {
    const response = await jwtFetch(`/api/tuneups/${tuneUp._id}/join`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const updatedTuneUp = await response.json();
    updateTuneUp(updatedTuneUp);
  };

  return (
    <div
      className={`tuneUp-container ${clicked ? "maximized" : "minimized"}`}
      onClick={() => setClicked(!clicked)}
    >
      {!clicked && (
        <div className="minimized">
          <div className="left-minimized">
            <h1>
              {users[tuneUp.host]?.firstName}'s {tuneUp?.genre} TuneUp
            </h1>
          </div>
          <div className="right-minimized">
            <div className="right-top">
              <div className="right-top-date">
                {formatDateTime(tuneUp.date)}
              </div>
              <div className="right-top-location">
                <DistanceCalculator
                  address1={tuneUp.address}
                  address2={sessionUser.address}
                />
                {/* <DistanceCalculator address1="90 5th Ave, New York, NY" address2="Columbus Cir, New York, NY" /> */}
              </div>
              <div className="right-top-group-size">
                party size: {tuneUp.connections.length + 1}
              </div>
            </div>
            <div className="right-bottom">{tuneUp?.genres}</div>
          </div>
        </div>
      )}
      {clicked && (
        <div className="maximized">
          <div className="tuneUp-name">
            <h1>{users[tuneUp.host]?.firstName}'s TuneUp</h1>
          </div>
          <div className="tuneUp-details">
            <div className="tuneUp-date">{formatDateTime(tuneUp.date)}</div>
            <div className="tuneUp-location">
              {/* add dans distance from component */}
            </div>
          </div>
          <div className="tuneUp-connections">
            <ul>
              {" "}
              Musicians attending:
              {tuneUp.connections?.map((user) => {
                return (
                  <li key={user?._id}>
                    {user?._id ? (
                      <Link to={`/users/${user?._id}`}>{user?.firstName}</Link>
                    ) : (
                      <Link to={`/users/${user}`}>{users[user].firstName}</Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="tuneUp-footer">
            {!userIsPartOfTuneUp &&
              !tuneUp.pendingConnections?.includes(sessionUser._id) && (
                <button
                  className="request-join-button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRequestToJoin();
                  }}
                >
                  Request to Join
                </button>
              )}
            {tuneUp.pendingConnections?.includes(sessionUser._id) && (
              <button className="requested-button" disabled>
                Requested
              </button>
            )}
            {sessionUser._id === tuneUp.host &&
              tuneUp.pendingConnections.map((requestingUserId) => (
                <div key={requestingUserId}>
                  <span>
                    {users[requestingUserId]?.firstName} wants to join
                  </span>
                  <button onClick={() => handleAcceptRequest(requestingUserId)}>
                    Accept
                  </button>
                  <button onClick={() => handleDenyRequest(requestingUserId)}>
                    Deny
                  </button>
                </div>
              ))}
            {sessionUser._id !== tuneUp?.host && userIsPartOfTuneUp && (
              <button onClick={handleLeaveTuneUp}>Leave TuneUp</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TuneUp;
