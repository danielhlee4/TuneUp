import background from "../../components/SessionForms/background.png";
import "./CreateTuneUps.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import { createTuneUp } from "../../store/tuneUps";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

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
  const [vocalsChecked, setVocalsChecked] = useState(false);
  const [banjoChecked, setBanjoChecked] = useState(false);
  const [genre, setGenre] = useState("Pop");
  const [month, setMonth] = useState(new Date().getMonth() + 1);
  const [day, setDay] = useState(new Date().getDate());
  const [year, setYear] = useState(new Date().getFullYear());
  const currentYear = new Date().getFullYear();
  const history = useHistory();
  const [errors, setErrors] = useState({});

  function titleize(str) {
    return str
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  }

  function isValidStreetName(street) {
    const streetRegex = /^[a-zA-Z0-9\s,'-\/#&\(\).]+$/;
    return streetRegex.test(street);
  }

  function isValidCity(city) {
    return typeof city === "string" && city.length >= 2;
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
    // const zipRegex = /^\d{5}$/;
    // return zipRegex.test(zip);
    const nycZipCodes = [
      "07002",
      "07003",
      "07008",
      "07010",
      "07014",
      "07017",
      "07018",
      "07020",
      "07022",
      "07024",
      "07026",
      "07028",
      "07029",
      "07030",
      "07031",
      "07032",
      "07036",
      "07047",
      "07050",
      "07055",
      "07057",
      "07070",
      "07071",
      "07072",
      "07073",
      "07074",
      "07075",
      "07086",
      "07087",
      "07093",
      "07094",
      "07102",
      "07103",
      "07104",
      "07105",
      "07106",
      "07107",
      "07108",
      "07109",
      "07110",
      "07111",
      "07112",
      "07114",
      "07201",
      "07202",
      "07205",
      "07206",
      "07208",
      "07302",
      "07304",
      "07305",
      "07306",
      "07307",
      "07310",
      "07311",
      "07601",
      "07603",
      "07604",
      "07605",
      "07606",
      "07608",
      "07631",
      "07632",
      "07643",
      "07644",
      "07650",
      "07657",
      "07660",
      "07666",
      "10001",
      "10002",
      "10003",
      "10004",
      "10005",
      "10006",
      "10007",
      "10009",
      "10010",
      "10011",
      "10012",
      "10013",
      "10014",
      "10016",
      "10017",
      "10018",
      "10019",
      "10020",
      "10021",
      "10022",
      "10023",
      "10024",
      "10025",
      "10026",
      "10027",
      "10028",
      "10029",
      "10030",
      "10031",
      "10032",
      "10033",
      "10034",
      "10035",
      "10036",
      "10037",
      "10038",
      "10039",
      "10040",
      "10044",
      "10065",
      "10069",
      "10075",
      "10103",
      "10110",
      "10111",
      "10112",
      "10115",
      "10119",
      "10128",
      "10152",
      "10153",
      "10154",
      "10162",
      "10165",
      "10167",
      "10168",
      "10169",
      "10170",
      "10171",
      "10172",
      "10173",
      "10174",
      "10177",
      "10199",
      "10278",
      "10279",
      "10280",
      "10282",
      "10301",
      "10302",
      "10303",
      "10304",
      "10305",
      "10306",
      "10308",
      "10310",
      "10311",
      "10312",
      "10314",
      "10451",
      "10452",
      "10453",
      "10454",
      "10455",
      "10456",
      "10457",
      "10458",
      "10459",
      "10460",
      "10461",
      "10462",
      "10463",
      "10465",
      "10467",
      "10468",
      "10469",
      "10472",
      "10473",
      "10474",
      "11001",
      "11003",
      "11004",
      "11005",
      "11020",
      "11021",
      "11023",
      "11096",
      "11101",
      "11102",
      "11103",
      "11104",
      "11105",
      "11106",
      "11109",
      "11201",
      "11203",
      "11204",
      "11205",
      "11206",
      "11207",
      "11208",
      "11209",
      "11210",
      "11211",
      "11212",
      "11213",
      "11214",
      "11215",
      "11216",
      "11217",
      "11218",
      "11219",
      "11220",
      "11221",
      "11222",
      "11223",
      "11224",
      "11225",
      "11226",
      "11228",
      "11229",
      "11230",
      "11231",
      "11232",
      "11233",
      "11234",
      "11235",
      "11236",
      "11237",
      "11238",
      "11239",
      "11354",
      "11355",
      "11356",
      "11357",
      "11358",
      "11359",
      "11360",
      "11361",
      "11362",
      "11363",
      "11364",
      "11365",
      "11366",
      "11367",
      "11368",
      "11369",
      "11370",
      "11371",
      "11372",
      "11373",
      "11374",
      "11375",
      "11377",
      "11378",
      "11379",
      "11385",
      "11411",
      "11412",
      "11413",
      "11414",
      "11415",
      "11416",
      "11417",
      "11418",
      "11419",
      "11420",
      "11421",
      "11422",
      "11423",
      "11424",
      "11425",
      "11426",
      "11427",
      "11428",
      "11429",
      "11430",
      "11432",
      "11433",
      "11434",
      "11435",
      "11436",
      "11451",
      "11509",
      "11516",
      "11559",
      "11580",
      "11581",
      "11598",
      "11691",
      "11692",
      "11693",
      "11694",
      "11697",
    ];
    return nycZipCodes.includes(zip);
  }

  const validateInputs = () => {
    // debugger;

    const newErrors = {};
    if (
      !details ||
      !month ||
      !day ||
      !year ||
      !streetName ||
      !city ||
      !state ||
      !zip ||
      instruments.length < 1 ||
      !genre
    ) {
      newErrors["empty"] = "Input fields must be completely filled!";
    } else if (
      new Date(
        `${year}-${month < 10 ? "0" + month : month}-${
          day < 10 ? "0" + day : day
        }T00:00:00`
      ) -
        new Date() <
      0
    ) {
      newErrors["date"] = "TuneUp must be scheduled to occur at a future date";
    } else if (streetName && !isValidStreetName(streetName)) {
      newErrors["street"] = "Please enter a valid street";
    } else if (state && !isValidState(state)) {
      newErrors["state"] = "Please enter a valid state";
    } else if (city && !isValidCity(city)) {
      newErrors["city"] = "Please enter a valid city";
    } else if (zip && !isValidZip(zip)) {
      newErrors["zip"] =
        "Please enter a zip code within 15 miles of new york city";
    }
    // debugger;
    setErrors(newErrors);
    // debugger;
    return Object.keys(newErrors).length === 0;
  };

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
  const handleVocalsChange = (e) => {
    setVocalsChecked((prev) => !prev);
    e.currentTarget.classList.toggle("active");
  };
  const handleBanjoChange = (e) => {
    setBanjoChecked((prev) => !prev);
    e.currentTarget.classList.toggle("active");
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
    for (let i = currentYear; i <= currentYear + 10; i++) {
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
    // debugger;
    e.preventDefault();
    address = `${streetName}, ${city}, ${state} ${zip}`;
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
    if (vocalsChecked) {
      instruments.push("Vocals");
    }
    if (banjoChecked) {
      instruments.push("Banjo");
    }
    // debugger;
    if (!validateInputs()) return;

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
    history.push("/discover");
  };

  const selectedStyle = {
    backgroundColor: "rgb(252,172,232)",
  };

  return (
    <div className="tuneup-create-form-container">
      <h2 className="tuneup-create-header">Tune your jam</h2>
      <form className="tuneup-create-form" onSubmit={handleSubmit}>
        <div className="tuneup-details-container">
          <h3 className="details-header1">Tells us more about your TuneUp!</h3>
          <textarea
            className="details-input"
            onChange={updates("details")}
            placeholder="Looking for a casual group to jam out with for a few hours. I play keys, so I'm looking for a drummer and a guitarist or two. Can't wait to rock out with y'all!"
          ></textarea>
        </div>
        <div className="date-dropdowns">
          <h3 className="date-header">When?</h3>
          <select
            name="month"
            id="Month"
            value={month}
            onChange={(e) => {
              setMonth(e.target.value);
            }}
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
          <h3 className="tuneup-address-header">Where?</h3>
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
              <select 
                className="tuneup-state-input" 
                value={state}
                onChange={updates("states")}
              >
                <option value="" disabled selected>Select State</option>
                <option value="NY">NY</option>
                <option value="NJ">NJ</option>
              </select>
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
          <h3 className="tuneup-instrument-header">instruments</h3>
          <div className="tuneup-instrument-list-container">
            <div
              className="create-tuneup-instrument-box"
              onClick={handlePianoChange}
              style={pianoChecked ? selectedStyle : {}}
            >
              <span>
                <i className="fa-sharp fa-light fa-piano"></i>
              </span>
            </div>
            <div
              className="create-tuneup-instrument-box"
              onClick={handleGuitarChange}
              style={guitarChecked ? selectedStyle : {}}
            >
              <span>
                <i className="fa-sharp fa-light fa-guitar-electric"></i>
              </span>
            </div>
            <div
              className="create-tuneup-instrument-box"
              onClick={handleViolinChange}
              style={violinChecked ? selectedStyle : {}}
            >
              <span>
                <i className="fa-sharp fa-light fa-violin"></i>
              </span>
            </div>
            <div
              className="create-tuneup-instrument-box"
              onClick={handleTrumpetChange}
              style={trumpetChecked ? selectedStyle : {}}
            >
              <span>
                <i className="fa-sharp fa-light fa-trumpet"></i>
              </span>
            </div>
            <div
              className="create-tuneup-instrument-box"
              onClick={handleFluteChange}
              style={fluteChecked ? selectedStyle : {}}
            >
              <span>
                <i className="fa-sharp fa-light fa-flute"></i>
              </span>
            </div>
            <div
              className="create-tuneup-instrument-box"
              onClick={handleDrumsChange}
              style={drumsChecked ? selectedStyle : {}}
            >
              <span>
                <i className="fa-sharp fa-light fa-drum"></i>
              </span>
            </div>
            <div
              className="create-tuneup-instrument-box"
              onClick={handleSaxChange}
              style={saxChecked ? selectedStyle : {}}
            >
              <span>
                <i className="fa-sharp fa-light fa-saxophone"></i>
              </span>
            </div>
            <div
              className="create-tuneup-instrument-box"
              onClick={handleClarinetChange}
              style={clarinetChecked ? selectedStyle : {}}
            >
              <span>
                <i className="fa-sharp fa-light fa-clarinet"></i>
              </span>
            </div>
            <div
              className="create-tuneup-instrument-box"
              onClick={handleBanjoChange}
              style={banjoChecked ? selectedStyle : {}}
            >
              <span>
                <i className="fa-sharp fa-light fa-banjo"></i>
              </span>
            </div>
            <div
              className="create-tuneup-instrument-box"
              onClick={handleVocalsChange}
              style={vocalsChecked ? selectedStyle : {}}
            >
              <span>
                <i className="fa-sharp fa-light fa-microphone-stand"></i>
              </span>
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
        <div className="tuneup-error-container">
          {errors["empty"] ? (
            <p className="tuneup-errors">{errors["empty"]}</p>
          ) : (
            ""
          )}
          {errors["date"] ? <p className="tuneup-errors">{errors["date"]}</p> : ""}
          {errors["street"] ? (
            <p className="tuneup-errors">{errors["street"]}</p>
          ) : (
            ""
          )}
          {errors["city"] ? <p className="tuneup-errors">{errors["city"]}</p> : ""}
          {errors["state"] ? (
            <p className="tuneup-errors">{errors["state"]}</p>
          ) : (
            ""
          )}
          {errors["zip"] ? <p className="tuneup-errors">{errors["zip"]}</p> : ""}
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
