import background from '../../components/SessionForms/background.png'
import './CreateTuneUps.css'
import { useSelector } from 'react-redux'
import { useState } from 'react';
import { createTuneUp } from '../../store/tuneUps';
import { useDispatch } from 'react-redux';

function CreateTuneUps() {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
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
    const [month, setMonth] = useState(months[new Date().getMonth()])
    const [day, setDay] = useState(new Date().getDate())
    const [year, setYear] = useState(new Date().getFullYear())
    const currentYear = new Date().getFullYear();
    const monthIndex = months.indexOf(month);

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
            if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) { // Leap year
                maxDay = 29;
            }
        } else if (["Apr", "Jun", "Sep", "Nov"].includes(month)) {
            maxDay = 30;
        }

        const days = [];
        for (let i = 1; i <= maxDay; i++) {
            days.push(<option key={i} value={i}>{i}</option>);
        }
        return days;
    };

    const renderMonthOptions = () => {
        return months.map((month, index) => (
            <option key={index} value={month}>{month}</option>
        ));
    };


    const renderYearOptions = () => {
        const years = [];
        for (let i = currentYear; i >= currentYear - 100; i--) {
            years.push(<option key={i} value={i}>{i}</option>);
        }
        return years;
    };

    let instruments = [];
    let address = ''
    const handleSubmit = async e => {
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
        const newTuneUp = {
            host: currentUser._id,
            description: details,
            status: true,
            instruments: instruments,
            genre: genre,
            address: address,
            connections: [],
            pendingConnections: []
        }
        dispatch(createTuneUp(newTuneUp))
    }

    return (
        <div className="tuneup-create-form-container">
            <h2 className='tuneup-create-header'>Create your own TuneUp!</h2>
            <form className="tuneup-create-form">
                <div className="date-dropdowns">
                    <select name="month" id="Month" value={month} onChange={(e) => setMonth(e.target.value)} required className="month-select">
                        {renderMonthOptions()}
                    </select>
                    <select name="day" id="Day" value={day} onChange={(e) => setDay(e.target.value)} required className="day-select">
                        {renderDayOptions()}
                    </select>
                    <select name="year" id="Year" value={year} onChange={(e) => setYear(e.target.value)} required className="year-select">
                        {renderYearOptions()}
                    </select>
                </div>
            </form>
            <img className='background-img' src={background}></img>
        </div>
    )
}

export default CreateTuneUps