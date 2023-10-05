import background from "../../components/SessionForms/background.png";
import "./CreateTuneUps.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { createTuneUp } from "../../store/tuneUps";
import { useDispatch } from "react-redux";

function CreateTuneUps() {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [details, setDetails] = useState("");
  const [streetName, setStreetName] = useState("");
  const [city, setCity] = useState("");
  const [state, setStates] = useState("");
  const [zip, setZip] = useState("");
  const [pianoChecked, setPianoChecked] = useState(false);
  const [guitarChecked, setGuitarChecked] = useState(false);
  const [violinChecked, setViolinChecked] = useState(false);
  const [trumpetChecked, setTrumpetChecked] = useState(false);
  const [fluteChecked, setFluteChecked] = useState(false);
  const [drumsChecked, setDrumsChecked] = useState(false);
  const [saxChecked, setSaxChecked] = useState(false);
  const [clarinetChecked, setClarinetChecked] = useState(false);
  const [celloChecked, setCelloChecked] = useState(false);
  const [tromboneChecked, setTromboneChecked] = useState(false);
  const [genre, setGenre] = useState("Pop");
  const [month, setMonth] = useState(months[new Date().getMonth()]);
  const [day, setDay] = useState(new Date().getDate());
  const [year, setYear] = useState(new Date().getFullYear());
  const currentYear = new Date().getFullYear();
  const monthIndex = months.indexOf(month);

  const updates = (field) => {
    let setState;
    switch (field) {
      case "details":
        setState = setDetails;
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
    setPianoChecked(e.target.checked);
  };
  const handleGuitarChange = (e) => {
    setGuitarChecked(e.target.checked);
  };
  const handleViolinChange = (e) => {
    setViolinChecked(e.target.checked);
  };
  const handleTrumpetChange = (e) => {
    setTrumpetChecked(e.target.checked);
  };
  const handleFluteChange = (e) => {
    setFluteChecked(e.target.checked);
  };
  const handleDrumsChange = (e) => {
    setDrumsChecked(e.target.checked);
  };
  const handleSaxChange = (e) => {
    setSaxChecked(e.target.checked);
  };
  const handleClarinetChange = (e) => {
    setClarinetChecked(e.target.checked);
  };
  const handleCelloChange = (e) => {
    setCelloChecked(e.target.checked);
  };
  const handleTromboneChange = (e) => {
    setTromboneChecked(e.target.checked);
  };
  const handleGenreChange = (e) => {
    setGenre(e.target.value);
  };

  const renderDayOptions = () => {
    let maxDay = 31;
    if (month === "Feb") {
      maxDay = 28;
      if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
        // Leap year
        maxDay = 29;
      }
    } else if (["Apr", "Jun", "Sep", "Nov"].includes(month)) {
      maxDay = 30;
    }

    const days = [];
    for (let i = 1; i <= maxDay; i++) {
      days.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return days;
  };

  const renderMonthOptions = () => {
    return months.map((month, index) => (
      <option key={index} value={index + 1}>
        {month}
      </option>
    ));
  };

  const renderYearOptions = () => {
    const years = [];
    for (let i = currentYear; i >= currentYear - 100; i--) {
      years.push(
        <option key={i} value={i}>
          {i}
        </option>
      );
    }
    return years;
  };

  let instruments = [];
  let address = "";
  const handleSubmit = async (e) => {
    e.preventDefault();
    address = `${streetName}, ${city}, ${state}, ${zip}`;
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
    if (celloChecked) {
      instruments.push("Cello");
    }
    if (tromboneChecked) {
      instruments.push("Trombone");
    }
    const newTuneUp = {
      host: currentUser._id,
      description: details,
      status: true,
      instruments: instruments,
      genre: genre,
      status: true,
      address: address,
      date: `${year}-${month}-${day}`,
      connections: [],
      pendingConnections: [],
    };
    dispatch(createTuneUp(newTuneUp));
  };

  return (
    <div className="tuneup-create-form-container">
      <h2 className="tuneup-create-header">Create your own TuneUp!</h2>
      <form className="tuneup-create-form" onSubmit={handleSubmit}>
        <div className="tuneup-details-container">
          <h3 className="details-header">Tells us more about your TuneUp!</h3>
          <textarea
            className="details-input"
            type="text"
            onChange={updates("details")}
          ></textarea>
        </div>
        <div className="date-dropdowns">
          <h3 className="details-header">When will your TuneUp take place?</h3>
          <select
            name="month"
            id="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            required
            className="month-select"
          >
            {renderMonthOptions()}
          </select>
          <select
            name="day"
            id="Day"
            value={day}
            onChange={(e) => setDay(e.target.value)}
            required
            className="day-select"
          >
            {renderDayOptions()}
          </select>
          <select
            name="year"
            id="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            className="year-select"
          >
            {renderYearOptions()}
          </select>
        </div>
        <div className="tuneup-address-container">
          <h3 className="tuneup-address-header">
            Where will your TuneUp take place?
          </h3>
          <div className="tuneup-address-input-container">
            <div className="tuneup-street-container">
              <span className="tuneup-street-name-label">Street name</span>
              <input
                className="tuneup-address-input"
                type="text"
                value={streetName}
                onChange={updates("streetName")}
                placeholder="123 Main St"
              ></input>
            </div>
            <div className="tuneup-city-container">
              <span className="tuneup-city-label">City</span>
              <input
                className="tuneup-city-input"
                type="text"
                value={city}
                onChange={updates("city")}
                placeholder="New York"
              ></input>
            </div>
            <div className="tuneup-state-container">
              <span className="tuneup-state-label">State</span>
              <input
                className="tuneup-state-input"
                type="text"
                value={state}
                onChange={updates("states")}
                placeholder="NY"
              ></input>
            </div>
            <div className="tuneup-zip-code-container">
              <span className="tuneup-zip-code-label">Zip code</span>
              <input
                className="tuneup-zip-code-input"
                type="text"
                value={zip}
                onChange={updates("zip")}
                placeholder="10019"
              ></input>
            </div>
          </div>
        </div>
        <div className="tuneup-instruments-container">
          <h3 className="tuneup-instrument-header">
            Please select instruments for your TuneUp
          </h3>
          <div className="tuneup-instrument-list-container">
            <div className="tuneup-piano-container">
              <input
                className="tuneup-piano-input"
                type="checkbox"
                value="piano"
                checked={pianoChecked}
                onChange={handlePianoChange}
              ></input>
              <span className="tuneup-piano-label">Piano</span>
            </div>
            <div className="tuneup-guitar-container">
              <input
                className="tuneup-guitar-input"
                type="checkbox"
                value="guitar"
                checked={guitarChecked}
                onChange={handleGuitarChange}
              ></input>
              <span className="tuneup-guitar-label">Guitar</span>
            </div>
            <div className="tuneup-violin-container">
              <input
                className="tuneup-violin-input"
                type="checkbox"
                value="violin"
                checked={violinChecked}
                onChange={handleViolinChange}
              ></input>
              <span className="tuneup-violin-label">Violin</span>
            </div>
            <div className="tuneup-trumpet-container">
              <input
                className="tuneup-trumpet-input"
                type="checkbox"
                value="trumpet"
                checked={trumpetChecked}
                onChange={handleTrumpetChange}
              ></input>
              <span className="tuneup-trumpet-label">Trumpet</span>
            </div>
            <div className="tuneup-flute-container">
              <input
                className="tuneup-flute-input"
                type="checkbox"
                value="flute"
                checked={fluteChecked}
                onChange={handleFluteChange}
              ></input>
              <span className="tuneup-flute-label">Flute</span>
            </div>
            <div className="tuneup-drums-container">
              <input
                className="tuneup-drums-input"
                type="checkbox"
                value="drums"
                checked={drumsChecked}
                onChange={handleDrumsChange}
              ></input>
              <span className="tuneup-drums-label">Drums</span>
            </div>
            <div className="tuneup-saxophone-container">
              <input
                className="tuneup-saxophone-input"
                type="checkbox"
                value="saxophone"
                checked={saxChecked}
                onChange={handleSaxChange}
              ></input>
              <span className="tuneup-saxophone-label">Saxophone</span>
            </div>
            <div className="tuneup-clarinet-container">
              <input
                className="tuneup-clarinet-input"
                type="checkbox"
                value="clarinet"
                checked={clarinetChecked}
                onChange={handleClarinetChange}
              ></input>
              <span className="tuneup-clarinet-label">Clarinet</span>
            </div>
            <div className="tuneup-cello-container">
              <input
                className="tuneup-cello-input"
                type="checkbox"
                value="cello"
                checked={celloChecked}
                onChange={handleCelloChange}
              ></input>
              <span className="tuneup-cello-label">Cello</span>
            </div>
            <div className="tuneup-trombone-container">
              <input
                className="tuneup-trombone-input"
                type="checkbox"
                value="trombone"
                checked={tromboneChecked}
                onChange={handleTromboneChange}
              ></input>
              <span className="tuneup-trombone-label">Trombone</span>
            </div>
          </div>
          <div className="tuneup-genre-dropdown-container">
            <span className="tuneup-genre-label">Genre:</span>
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
        <div className="create-tuneup-button-container">
          <button className="create-tuneup-button" type="submit">
            Create TuneUp!
          </button>
        </div>
      </form>
      <img className="background-img" src={background}></img>
    </div>
  );
}

export default CreateTuneUps;
