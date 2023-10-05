import "./UserUpdateForm.css"
import backgroundimg from './background.png'
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "../../store/users";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { getCurrentUser } from "../../store/session";


function UserUpdateForm() {
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const history = useHistory()
    const [firstName, setfirstName] = useState(currentUser.firstName);
    const [lastName, setlastName] = useState(currentUser.lastName);
    const [email, setEmail] = useState(currentUser.email);
    const [streetName, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [state, setStates] = useState('');
    const [zip, setZip] = useState('');
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
    const [genre, setGenre] = useState('Pop');

    const updates = field => {
        let setState;
        switch (field) {
            case 'firstName':
                setState = setfirstName;
                break;
            case 'lastName':
                setState = setlastName;
                break;
            case 'email':
                setState = setEmail;
                break;
            case 'streetName':
                setState = setStreetName;
                break;
            case 'city':
                setState = setCity;
                break;
            case 'states':
                setState = setStates;
                break;
            case 'zip':
                setState = setZip;
                break;
            default:
                setState = () => {}
        }
        return e => setState(e.target.value);
    }

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

    let instruments = [];
    let address = ''
    let genreArr = [genre]
    const handleUpdate = async e => {
        e.preventDefault()
        address = `${streetName}, ${city}, ${state}, ${zip}`
        if (pianoChecked) {
            instruments.push('Piano')
        }
        if (guitarChecked) {
            instruments.push('Guitar')
        }
        if (violinChecked) {
            instruments.push('Violin')
        }
        if (trumpetChecked) {
            instruments.push('Trumpet')
        }
        if (fluteChecked) {
            instruments.push('Flute')
        }
        if (drumsChecked) {
            instruments.push('Drums')
        }
        if (saxChecked) {
            instruments.push('Saxophone')
        }
        if (clarinetChecked) {
            instruments.push('Clarinet')
        }
        if (celloChecked) {
            instruments.push('Cello')
        }
        if (tromboneChecked) {
            instruments.push('Trombone')
        }
        const updatedUser = {
            firstName,
            lastName,
            email,
            instruments,
            genres: genreArr,
            address
        }
        dispatch(updateUser(currentUser._id, updatedUser))
        dispatch(getCurrentUser(updatedUser))
        history.push('/home')
    }

    return (
        <div className="update-form-root-container">
            <div className="update-form-container">
                <h1 className="update-form-header">Tell us more about you!</h1>
                <form onSubmit={handleUpdate} className="update-form">
                    <div className="update-form-left">
                        <div className="first-name-container">
                            <span className="basic-info-header">Basic Info</span>
                            <span className="update-first-name-label">Firstname</span>
                            <input className="update-first-name-input" type="text" onChange={updates('firstName')} value={firstName}></input>
                        </div>
                        <div className="last-name-container">
                            <span className="update-last-name-label">Lastname</span>
                            <input className="update-last-name-input" type="text" onChange={updates('lastName')} value={lastName}></input>
                        </div>
                        <div className="email-container">
                            <span className="update-email-label">Email</span>
                            <input className="update-email-input" type="text" onChange={updates('email')} value={email}></input>
                        </div>
                        <div className="address-container">
                            <span className="address-header">Address</span>
                            <span className="update-street-name-label">Street name</span>
                            <input className="update-address-input" type="text" value={streetName} onChange={updates('streetName')} placeholder="123 Main St"></input>
                        </div>
                        <div className="city-container">
                            <span className="update-city-label">City</span>
                            <input className="update-city-input" type="text" value={city} onChange={updates('city')} placeholder="New York"></input>
                        </div>
                        <div className="state-container">
                            <span className="update-state-label">State</span>
                            <input className="update-state-input" type="text" value={state} onChange={updates('states')} placeholder="NY"></input>
                        </div>
                        <div className="zip-code-container">
                            <span className="update-zip-code-label">Zip code</span>
                            <input className="update-zip-code-input" type="text" value={zip} onChange={updates('zip')} placeholder="10019"></input>
                        </div>
                    </div>
                    <div className="update-form-right">
                        <span className="musical-info-header">Musical Info</span>
                        <div className="piano-container">
                            <input className="update-piano-input" type="checkbox" value="piano" checked={pianoChecked} onChange={handlePianoChange}></input>
                            <span className="update-piano-label">Piano</span>
                        </div>
                        <div className="guitar-container">
                            <input className="update-guitar-input" type="checkbox" value="guitar" checked={guitarChecked} onChange={handleGuitarChange}></input>
                            <span className="update-guitar-label">Guitar</span>
                        </div>
                        <div className="violin-container">
                            <input className="update-violin-input" type="checkbox" value="violin" checked={violinChecked} onChange={handleViolinChange}></input>
                            <span className="update-violin-label">Violin</span>
                        </div>
                        <div className="trumpet-container">
                            <input className="update-trumpet-input" type="checkbox" value="trumpet" checked={trumpetChecked} onChange={handleTrumpetChange}></input>
                            <span className="update-trumpet-label">Trumpet</span>
                        </div>
                        <div className="flute-container">
                            <input className="update-flute-input" type="checkbox" value="flute" checked={fluteChecked} onChange={handleFluteChange}></input>
                            <span className="update-flute-label">Flute</span>
                        </div>
                        <div className="drums-container">
                            <input className="update-drums-input" type="checkbox" value="drums" checked={drumsChecked} onChange={handleDrumsChange}></input>
                            <span className="update-drums-label">Drums</span>
                        </div>
                        <div className="saxophone-container">
                            <input className="update-saxophone-input" type="checkbox" value="saxophone" checked={saxChecked} onChange={handleSaxChange}></input>
                            <span className="update-saxophone-label">Saxophone</span>
                        </div>
                        <div className="clarinet-container">
                            <input className="update-clarinet-input" type="checkbox" value="clarinet" checked={clarinetChecked} onChange={handleClarinetChange}></input>
                            <span className="update-clarinet-label">Clarinet</span>
                        </div>
                        <div className="cello-container">
                            <input className="update-cello-input" type="checkbox" value="cello" checked={celloChecked} onChange={handleCelloChange}></input>
                            <span className="update-cello-label">Cello</span>
                        </div>
                        <div className="trombone-container">
                            <input className="update-trombone-input" type="checkbox" value="trombone" checked={tromboneChecked} onChange={handleTromboneChange}></input>
                            <span className="update-trombone-label">Trombone</span>
                        </div>
                        <div className="genre-dropdown-container">
                            <span className="genre-label">Genre:</span>
                            <select className="genre-dropdown" value={genre} onChange={handleGenreChange}>
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
                        <button className="update-submit-button" type="submit">Save</button>
                        <Link to={'/home'}>
                            <button className="cancel-submit-button" >Cancel</button>
                        </Link>
                    </div>
                </form>
                <img className="update-form-background" src={backgroundimg}></img>
                <p className="disclaimer">We require an address to determine closest jam sessions near you.
                    Your address will not be shared with anyone else! It is visible
                    for you and for you only.</p>
            </div>
        </div >
    )

}

export default UserUpdateForm