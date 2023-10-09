import "./UserUpdateForm.css";
import backgroundimg from "./background.png";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../store/users";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getCurrentUser } from "../../store/session";

function UserUpdateForm() {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const [firstName, setfirstName] = useState(currentUser.firstName);
  const [lastName, setlastName] = useState(currentUser.lastName);
  const [email, setEmail] = useState(currentUser.email);
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [states, setStates] = useState("");
  const [zip, setZip] = useState("");
  const [pianoChecked, setPianoChecked] = useState(false);
  const [guitarChecked, setGuitarChecked] = useState(false);
  const [violinChecked, setViolinChecked] = useState(false);
  const [trumpetChecked, setTrumpetChecked] = useState(false);
  const [fluteChecked, setFluteChecked] = useState(false);
  const [drumsChecked, setDrumsChecked] = useState(false);
  const [saxChecked, setSaxChecked] = useState(false);
  const [clarinetChecked, setClarinetChecked] = useState(false);
  const [banjoChecked, setBanjoChecked] = useState(false);
  const [vocalsChecked, setVocalsChecked] = useState(false);
  const [genre, setGenre] = useState("Pop");

  const updates = (field) => {
    let setState;
    switch (field) {
      case "firstName":
        setState = setfirstName;
        break;
      case "lastName":
        setState = setlastName;
        break;
      case "email":
        setState = setEmail;
        break;
      case "streetName":
        setState = setStreetName;
        break;
      case "city":
        setState = setCity;
        break;
      case "states":
        setState = setStates;
        break;
      case "zip":
        setState = setZip;
        break;
      default:
        setState = () => {};
    }
    return (e) => setState(e.target.value);
  };

  const handlePianoChange = (e) => {
    setPianoChecked((prev) => !prev);
    e.currentTarget.classList.toggle("active");
  };
  const handleGuitarChange = (e) => {
    setGuitarChecked((prev) => !prev);
    e.currentTarget.classList.toggle("active");
  };
  const handleViolinChange = (e) => {
    setViolinChecked((prev) => !prev);
    e.currentTarget.classList.toggle("active");
  };
  const handleTrumpetChange = (e) => {
    setTrumpetChecked((prev) => !prev);
    e.currentTarget.classList.toggle("active");
  };
  const handleFluteChange = (e) => {
    setFluteChecked((prev) => !prev);
    e.currentTarget.classList.toggle("active");
  };
  const handleDrumsChange = (e) => {
    setDrumsChecked((prev) => !prev);
    e.currentTarget.classList.toggle("active");
  };
  const handleSaxChange = (e) => {
    setSaxChecked((prev) => !prev);
    e.currentTarget.classList.toggle("active");
  };
  const handleClarinetChange = (e) => {
    setClarinetChecked((prev) => !prev);
    e.currentTarget.classList.toggle("active");
  };
  const handleBanjoChange = (e) => {
    setBanjoChecked((prev) => !prev);
    e.currentTarget.classList.toggle("active");
  };
  const handleVocalsChange = (e) => {
    setVocalsChecked((prev) => !prev);
    e.currentTarget.classList.toggle("active");
  };
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const selectedStyle = {
    backgroundColor: "rgb(252,172,232)",
  };

  let instruments = [];
  let address = "";
  let genreArr = [genre];
  const handleUpdate = async (e) => {
    e.preventDefault();
    address = `${streetName}, ${city}, ${states}, ${zip}`;
    if (pianoChecked) {
      instruments.push("Piano");
    }
    if (guitarChecked) {
      instruments.push("Guitar");
    }
    if (violinChecked) {
      instruments.push("Violin");
    }
    if (trumpetChecked) {
      instruments.push("Trumpet");
    }
    if (fluteChecked) {
      instruments.push("Flute");
    }
    if (drumsChecked) {
      instruments.push("Drums");
    }
    if (saxChecked) {
      instruments.push("Saxophone");
    }
    if (clarinetChecked) {
      instruments.push("Clarinet");
    }
    if (banjoChecked) {
      instruments.push("Banjo");
    }
    if (vocalsChecked) {
      instruments.push("Vocals");
    }
    const updatedUser = {
      firstName,
      lastName,
      email,
      instruments,
      genres: genreArr,
      address,
    };
    dispatch(updateUser(currentUser._id, updatedUser));
    dispatch(getCurrentUser(updatedUser));
    history.push("/home");
  };

  const handleInstrumentClick = (e) => {
    // Toggle the 'active' class
    e.currentTarget.classList.toggle("active");
  };

  return (
    <div className="update-form-root-container">
      <div className="update-form-container">
        <h1 className="update-form-header">Tune your profile</h1>
        <form onSubmit={handleUpdate} className="update-form">
          <div className="update-form-left">
            <div className="update-form-top-left">
              <div className="first-name-container">
                <span className="basic-info-header">Basic Info</span>
                <span className="update-first-name-label">Firstname</span>
                <input
                  className="update-first-name-input"
                  type="text"
                  onChange={updates("firstName")}
                  value={firstName}
                ></input>
              </div>
              <div className="last-name-container">
                <span className="update-last-name-label">Lastname</span>
                <input
                  className="update-last-name-input"
                  type="text"
                  onChange={updates("lastName")}
                  value={lastName}
                ></input>
              </div>
              <div className="email-container">
                <span className="update-email-label">Email</span>
                <input
                  className="update-email-input"
                  type="text"
                  onChange={updates("email")}
                  value={email}
                ></input>
              </div>
            </div>
            <div className="update-form-bottom-left">
              <div className="address-container">
                <span className="address-header">Address</span>
                <span className="update-street-name-label">Street name</span>
                <input
                  className="update-address-input"
                  type="text"
                  value={streetName}
                  onChange={updates("streetName")}
                  placeholder="123 Main St"
                ></input>
              </div>
              <div className="city-container">
                <span className="update-city-label">City</span>
                <input
                  className="update-city-input"
                  type="text"
                  value={city}
                  onChange={updates("city")}
                  placeholder="New York"
                ></input>
              </div>
              <div className="state-container">
                <span className="update-state-label">State</span>
                <input
                  className="update-state-input"
                  type="text"
                  value={states}
                  onChange={updates("states")}
                  placeholder="NY"
                ></input>
              </div>
              <div className="zip-code-container">
                <span className="update-zip-code-label">Zip Code</span>
                <input
                  className="update-zip-code-input"
                  type="text"
                  value={zip}
                  onChange={updates("zip")}
                  placeholder="10019"
                ></input>
              </div>
            </div>
          </div>
          <div className="update-form-right">
            <span className="musical-info-header">Instruments</span>
            <div className="instruments-container">
              <div
                className="instrument-box"
                onClick={handlePianoChange}
                style={pianoChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-piano"></i>
                </span>
                <span id="update-instrument-label">piano</span>
              </div>
              <div
                className="instrument-box"
                onClick={handleGuitarChange}
                style={guitarChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-guitar-electric"></i>
                </span>
                <span id="update-instrument-label">guitar</span>
              </div>
              <div
                className="instrument-box"
                onClick={handleViolinChange}
                style={violinChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-violin"></i>
                </span>
                <span id="update-instrument-label">violin</span>
              </div>
              <div
                className="instrument-box"
                onClick={handleTrumpetChange}
                style={trumpetChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-trumpet"></i>
                </span>
                <span id="update-instrument-label">trumpet</span>
              </div>
              <div
                className="instrument-box"
                onClick={handleFluteChange}
                style={fluteChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-flute"></i>
                </span>
                <span id="update-instrument-label">flute</span>
              </div>
              <div
                className="instrument-box"
                onClick={handleDrumsChange}
                style={drumsChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-drum"></i>
                </span>
                <span id="update-instrument-label">drums</span>
              </div>
              <div
                className="instrument-box"
                onClick={handleSaxChange}
                style={saxChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-saxophone"></i>
                </span>
                <span id="update-instrument-label">saxophone</span>
              </div>
              <div
                className="instrument-box"
                onClick={handleClarinetChange}
                style={clarinetChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-clarinet"></i>
                </span>
                <span id="update-instrument-label">clarinet</span>
              </div>
              <div
                className="instrument-box"
                onClick={handleBanjoChange}
                style={banjoChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-banjo"></i>
                </span>
                <span id="update-instrument-label">banjo</span>
              </div>
              <div
                className="instrument-box"
                onClick={handleVocalsChange}
                style={vocalsChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-microphone-stand"></i>
                </span>
                <span id="update-instrument-label">vocals</span>
              </div>
            </div>

            <div className="genre-dropdown-container">
              <span className="genre-label">Favorite Genre:</span>
              <select
                className="genre-dropdown"
                value={genre}
                onChange={handleGenreChange}
              >
                <option value="Pop">Pop</option>
                <option value="Rock">Rock</option>
                <option value="Hip-Hop">Hip-Hop</option>
                <option value="R&B">R&B</option>
                <option value="Country">Country</option>
                <option value="Electronic">Electronic</option>
                <option value="Jazz">Jazz</option>
                <option value="Classical">Classical</option>
                <option value="Reggae">Reggae</option>
                <option value="Blues">Blues</option>
              </select>
            </div>
          </div>
          <div className="update-submit-button-container">
            <button className="update-submit-button" type="submit">
              Save
            </button>
            <Link to={"/home"}>
              <button className="cancel-submit-button">Cancel</button>
            </Link>
          </div>
        </form>
        <img className="update-form-background" src={backgroundimg}></img>
        <p className="disclaimer">
          We require an address to determine closest tuneups near you. Your
          address will not be shared with anyone else! It is visible only to
          you.
        </p>
      </div>
    </div>
  );
}

export default UserUpdateForm;
