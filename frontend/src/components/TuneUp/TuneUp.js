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
import AddressMapWrapper from "../Map/AddressMap";
import ZipcodeMapWrapper from "../Map/ZipcodeMap";
import UserDistanceToAddress from "../Map/UserDistanceToAddress";
import { extractStateAndZipcode } from "../Discover/Discover";

const TuneUp = ({ tuneUpData }) => {
  const tuneUp = tuneUpData;
  const users = useSelector(getUsers);
  const tuneUps = useSelector(getTuneUps);
  const sessionUser = useSelector((state) => state.session.user);
  const [clicked, setClicked] = useState(false);
  const [isFromHome, setIsFromHome] = useState(true);

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
        connections: [...tuneUp.connections]
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

  function handleMapClick(event) {
    event.stopPropagation();
  }

  const renderInstrumentIcon = (instrument) => {
    const instrumentIconMap = {
      piano: "fa-piano",
      guitar: "fa-guitar-electric",
      violin: "fa-violin",
      trumpet: "fa-trumpet",
      flute: "fa-flute",
      drums: "fa-drum",
      saxophone: "fa-saxophone",
      clarinet: "fa-clarinet",
      banjo: "fa-banjo",
      vocals: "fa-microphone-stand"
    };

    const normalizedInstrument = instrument.toLowerCase();

    return tuneUp.instruments.includes(instrument) ? (
      <span>
        <i className={`fa-sharp fa-light ${instrumentIconMap[normalizedInstrument]}`}></i>
      </span>
    ) : null;
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
              <div className="right-top-location" onClick={(e) => {
                e.stopPropagation();
                setIsFromHome(!isFromHome);
              }}>
                {isFromHome ? 
                  <div className="tuneUp-distance">
                    <DistanceCalculator address1={tuneUp.address} address2={sessionUser.address} />
                    <span className="clickable-text">from home address</span>
                  </div>
                  :
                  <div className="tuneUp-distance">
                    <UserDistanceToAddress targetAddress={tuneUp.address} />
                    <span className="clickable-text">from current location</span>
                  </div>
                }
              </div>
              <div className="right-top-group-size">
                party size: {tuneUp.connections.length + 1}
              </div>
            </div>
            <div className="right-bottom">
              {tuneUp.instruments.map((instrument) => renderInstrumentIcon(instrument))}
            </div>
          </div>
        </div>
      )}
      {clicked && (
        <div className="maximized">
          <div className="tuneUp-name">
            <h1>{users[tuneUp.host]?.firstName}'s TuneUp</h1>
          </div>
          <div className="tuneUp-columns">
            <div className="tuneUp-left-column">
              <div className="tuneUp-details">
                <div className="tuneUp-date">{formatDateTime(tuneUp.date)}</div>
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
              <div className="tuneup-instrument-icons">
                {tuneUp.instruments.map((instrument) => renderInstrumentIcon(instrument))}
              </div>
            </div>

            <div className="tuneUp-middle-column">
              <p id="tuneUp-description">{tuneUp.description}</p>
            </div>

            <div className="tuneUp-right-column">
                <div className="tuneUp-location">
                  {
                    (sessionUser._id === tuneUp.host || tuneUp.connections.includes(sessionUser._id)) ? (
                        <div className="tuneUp-location" onClick={handleMapClick}>
                            <AddressMapWrapper address={tuneUp.address} />
                            <p id="tuneUp-address">{tuneUp.address}</p>
                        </div>
                    ) : (
                        <div className="tuneUp-location" onClick={handleMapClick}>
                            <ZipcodeMapWrapper zipcode={extractStateAndZipcode(tuneUp.address)} />
                            <p id="tuneUp-non-member">Exact location available for members of this tuneup</p>
                        </div>
                    )
                  }
                </div>
            </div>
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
              <button className='leave-tuneup-button' onClick={handleLeaveTuneUp}>Leave TuneUp</button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TuneUp;
