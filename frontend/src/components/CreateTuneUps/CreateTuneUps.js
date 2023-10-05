import background from '../../components/SessionForms/background.png'
import './CreateTuneUps.css'
import { useSelector } from 'react-redux'
import { useState } from 'react';

function CreateTuneUps() {
    const currentUser = useSelector((state) => state.session.user);
    const [details, setDetails] = useState('')
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
    }

    return (
        <div className="tuneup-create-form-container">
            <h2 className='tuneup-create-header'>Create your own TuneUp!</h2>
            <form className="tuneup-create-form">

            </form>
            <img className='background-img' src={background}></img>
        </div>
    )
}

export default CreateTuneUps