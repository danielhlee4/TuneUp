import "./UserUpdateForm.css";
import backgroundimg from "./background.png";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../store/users";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getCurrentUser } from "../../store/session";

function UserUpdateForm() {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const {
    firstName,
    lastName,
    email,
    instruments: userInstruments,
    genres: userGenres,
    address: userAddress,
  } = currentUser;

  const [firstNameField, setFirstName] = useState(firstName);
  const [lastNameField, setLastName] = useState(lastName);
  const [emailField, setEmail] = useState(email);

  function parseAddress(addressString) {
    if (!addressString) {
      return { streetName: "", city: "", state: "", zip: "" };
    }
    const parts = addressString.split(", ");
    const statePart = parts[2]?.slice(0, parts[2].length - 5);
    const zipPart = parts[2]?.slice(parts[2].length - 5);

    return {
      streetName: parts[0] || "",
      city: parts[1] || "",
      state: statePart ? statePart : "",
      zip: zipPart ? zipPart : "",
    };
  }
  const { streetName, city, state, zip } = parseAddress(currentUser.address);
  const [streetNameField, setStreetName] = useState(streetName);
  const [cityField, setCity] = useState(city);
  const [stateField, setState] = useState(state);
  const [zipField, setZip] = useState(zip);

  const [pianoChecked, setPianoChecked] = useState(
    userInstruments?.includes("Piano") || false
  );
  const [guitarChecked, setGuitarChecked] = useState(
    userInstruments?.includes("Guitar") || false
  );
  const [violinChecked, setViolinChecked] = useState(
    userInstruments?.includes("Violin") || false
  );
  const [trumpetChecked, setTrumpetChecked] = useState(
    userInstruments?.includes("Trumpet") || false
  );
  const [fluteChecked, setFluteChecked] = useState(
    userInstruments?.includes("Flute") || false
  );
  const [drumsChecked, setDrumsChecked] = useState(
    userInstruments?.includes("Drums") || false
  );
  const [saxChecked, setSaxChecked] = useState(
    userInstruments?.includes("Saxophone") || false
  );
  const [clarinetChecked, setClarinetChecked] = useState(
    userInstruments?.includes("Clarinet") || false
  );
  const [banjoChecked, setBanjoChecked] = useState(
    userInstruments?.includes("Banjo") || false
  );
  const [vocalsChecked, setVocalsChecked] = useState(
    userInstruments?.includes("Vocals") || false
  );
  const [selectedGenres, setSelectedGenres] = useState(
    currentUser.genres || []
  );

  const [errors, setErrors] = useState({});

  function titleize(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  }

  function isValidStreetName(street) {
    const streetRegex = /^[a-zA-Z0-9\s,'-\/#&\(\).]+$/;
    return streetRegex.test(street);
  }

  function isValidCity(city) {
    return typeof city === "string" && city.length > 2;
  }

  function isValidState(state) {
    const usStateAbbreviations = [
      "AL",
      "AK",
      "AZ",
      "AR",
      "CA",
      "CO",
      "CT",
      "DE",
      "FL",
      "GA",
      "HI",
      "ID",
      "IL",
      "IN",
      "IA",
      "KS",
      "KY",
      "LA",
      "ME",
      "MD",
      "MA",
      "MI",
      "MN",
      "MS",
      "MO",
      "MT",
      "NE",
      "NV",
      "NH",
      "NJ",
      "NM",
      "NY",
      "NC",
      "ND",
      "OH",
      "OK",
      "OR",
      "PA",
      "RI",
      "SC",
      "SD",
      "TN",
      "TX",
      "UT",
      "VT",
      "VA",
      "WA",
      "WV",
      "WI",
      "WY",
    ];
    const usStates = [
      "Alabama",
      "Alaska",
      "Arizona",
      "Arkansas",
      "California",
      "Colorado",
      "Connecticut",
      "Delaware",
      "Florida",
      "Georgia",
      "Hawaii",
      "Idaho",
      "Illinois",
      "Indiana",
      "Iowa",
      "Kansas",
      "Kentucky",
      "Louisiana",
      "Maine",
      "Maryland",
      "Massachusetts",
      "Michigan",
      "Minnesota",
      "Mississippi",
      "Missouri",
      "Montana",
      "Nebraska",
      "Nevada",
      "New Hampshire",
      "New Jersey",
      "New Mexico",
      "New York",
      "North Carolina",
      "North Dakota",
      "Ohio",
      "Oklahoma",
      "Oregon",
      "Pennsylvania",
      "Rhode Island",
      "South Carolina",
      "South Dakota",
      "Tennessee",
      "Texas",
      "Utah",
      "Vermont",
      "Virginia",
      "Washington",
      "West Virginia",
      "Wisconsin",
      "Wyoming",
    ];

    return (
      usStateAbbreviations.includes(state.toUpperCase()) ||
      usStates.includes(titleize(state))
    );
  }

  function isValidZip(zip) {
    const zipRegex = /^\d{5}$/;
    return zipRegex.test(zip);
  }

  const validateInputs = () => {
    const newErrors = [];
    if (
      !firstNameField ||
      !lastNameField ||
      !emailField ||
      !streetNameField ||
      !cityField ||
      !stateField ||
      !zipField ||
      instruments.length < 1 ||
      selectedGenres.length < 1
    ) {
      newErrors["empty"] = "Input fields must be completely filled!";
    } else if (emailField && !isValidEmail(emailField)) {
      newErrors["email"] = "Please enter a valid email";
    } else if (streetNameField && !isValidStreetName(streetNameField)) {
      newErrors["street"] = "Please enter a valid street";
    } else if (stateField && !isValidState(stateField)) {
      newErrors["state"] = "Please enter a valid state";
    } else if (cityField && !isValidCity(cityField)) {
      newErrors["city"] = "Please enter a valid city";
    } else if (zipField && !isValidZip(zipField)) {
      newErrors["zip"] = "Please enter a valid zip";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const updates = (field) => (e) => {
    switch (field) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "streetName":
        setStreetName(e.target.value);
        break;
      case "city":
        setCity(e.target.value);
        break;
      case "state":
        setState(e.target.value);
        break;
      case "zipCode":
        setZip(e.target.value);
        break;
      default:
    }
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
    const { checked, value } = e.target;
    if (checked) {
      setSelectedGenres([...selectedGenres, value]);
    } else {
      setSelectedGenres(selectedGenres.filter((genre) => genre !== value));
    }
  };

  useEffect(() => {
    if (currentUser) {
      setSelectedGenres(currentUser.genres || []);
    }
  }, [currentUser]);

  const selectedStyle = {
    backgroundColor: "rgb(252,172,232)",
  };

  let instruments = [];
  const handleUpdate = async (e) => {
    e.preventDefault();
    const fullAddress = `${streetNameField}, ${cityField}, ${stateField} ${zipField}`;

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
    if (!validateInputs()) return;

    const updatedUser = {
      firstName: firstNameField,
      lastName: lastNameField,
      email: emailField,
      instruments,
      genres: selectedGenres,
      address: fullAddress,
    };
    dispatch(updateUser(currentUser._id, updatedUser));
    dispatch(getCurrentUser(updatedUser));
    history.push(`/users/${currentUser._id}`);
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
                  value={firstNameField}
                ></input>
              </div>
              <div className="last-name-container">
                <span className="update-last-name-label">Lastname</span>
                <input
                  className="update-last-name-input"
                  type="text"
                  onChange={updates("lastName")}
                  value={lastNameField}
                ></input>
              </div>
              <div className="email-container">
                <span className="update-email-label">Email</span>
                <input
                  className="update-email-input"
                  type="text"
                  onChange={updates("email")}
                  value={emailField}
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
                  value={streetNameField}
                  onChange={updates("streetName")}
                  placeholder="123 Main St"
                ></input>
              </div>
              <div className="city-container">
                <span className="update-city-label">City</span>
                <input
                  className="update-city-input"
                  type="text"
                  value={cityField}
                  onChange={updates("city")}
                  placeholder="New York"
                ></input>
              </div>
              <div className="state-container">
                <span className="update-state-label">State</span>
                <input
                  className="update-state-input"
                  type="text"
                  value={stateField}
                  onChange={updates("state")}
                  placeholder="NY"
                ></input>
              </div>
              <div className="zip-code-container">
                <span className="update-zip-code-label">Zip Code</span>
                <input
                  className="update-zip-code-input"
                  type="text"
                  value={zipField}
                  onChange={updates("zipCode")}
                  placeholder="10019"
                ></input>
              </div>
            </div>
          </div>
          <div className="update-form-right">
            <span className="musical-info-header">Instruments</span>
            <div className="instruments-container">
              <div
                className={`instrument-box ${pianoChecked ? "active" : ""}`}
                onClick={handlePianoChange}
                style={pianoChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-piano"></i>
                </span>
                <span id="update-instrument-label">piano</span>
              </div>
              <div
                className={`instrument-box ${guitarChecked ? "active" : ""}`}
                onClick={handleGuitarChange}
                style={guitarChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-guitar-electric"></i>
                </span>
                <span id="update-instrument-label">guitar</span>
              </div>
              <div
                className={`instrument-box ${violinChecked ? "active" : ""}`}
                onClick={handleViolinChange}
                style={violinChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-violin"></i>
                </span>
                <span id="update-instrument-label">violin</span>
              </div>
              <div
                className={`instrument-box ${trumpetChecked ? "active" : ""}`}
                onClick={handleTrumpetChange}
                style={trumpetChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-trumpet"></i>
                </span>
                <span id="update-instrument-label">trumpet</span>
              </div>
              <div
                className={`instrument-box ${fluteChecked ? "active" : ""}`}
                onClick={handleFluteChange}
                style={fluteChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-flute"></i>
                </span>
                <span id="update-instrument-label">flute</span>
              </div>
              <div
                className={`instrument-box ${drumsChecked ? "active" : ""}`}
                onClick={handleDrumsChange}
                style={drumsChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-drum"></i>
                </span>
                <span id="update-instrument-label">drums</span>
              </div>
              <div
                className={`instrument-box ${saxChecked ? "active" : ""}`}
                onClick={handleSaxChange}
                style={saxChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-saxophone"></i>
                </span>
                <span id="update-instrument-label">saxophone</span>
              </div>
              <div
                className={`instrument-box ${clarinetChecked ? "active" : ""}`}
                onClick={handleClarinetChange}
                style={clarinetChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-clarinet"></i>
                </span>
                <span id="update-instrument-label">clarinet</span>
              </div>
              <div
                className={`instrument-box ${banjoChecked ? "active" : ""}`}
                onClick={handleBanjoChange}
                style={banjoChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-banjo"></i>
                </span>
                <span id="update-instrument-label">banjo</span>
              </div>
              <div
                className={`instrument-box ${vocalsChecked ? "active" : ""}`}
                onClick={handleVocalsChange}
                style={vocalsChecked ? selectedStyle : {}}
              >
                <span>
                  <i className="fa-sharp fa-light fa-microphone-stand"></i>
                </span>
                <span id="update-instrument-label">vocals</span>
              </div>
            </div>
            <div className="genre-checkbox-container">
              <span className="genre-label">Favorite Genres:</span>
              <div>
                {[
                  "Pop",
                  "Rock",
                  "Hip-Hop",
                  "R&B",
                  "Country",
                  "Electronic",
                  "Jazz",
                  "Classical",
                  "Reggae",
                  "Blues",
                ].map((genre) => (
                  <div key={genre}>
                    <input
                      type="checkbox"
                      value={genre}
                      checked={selectedGenres.includes(genre)}
                      onChange={handleGenreChange}
                    />
                    <label>{genre}</label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="update-submit-button-container">
            <button className="update-submit-button" type="submit">
              Save
            </button>
            <Link to={`/users/${currentUser._id}`}>
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
      {errors["empty"] ? <p className="user-errors">{errors["empty"]}</p> : ""}
      {errors["email"] ? <p className="user-errors">{errors["email"]}</p> : ""}
      {errors["street"] ? (
        <p className="user-errors">{errors["street"]}</p>
      ) : (
        ""
      )}
      {errors["city"] ? <p className="user-errors">{errors["city"]}</p> : ""}
      {errors["state"] ? <p className="user-errors">{errors["state"]}</p> : ""}
      {errors["zip"] ? <p className="user-errors">{errors["zip"]}</p> : ""}
    </div>
  );
}

export default UserUpdateForm;
