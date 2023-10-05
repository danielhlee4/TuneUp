import background from '../../components/SessionForms/background.png'
import './CreateTuneUps.css'

function CreateTuneUps() {

    return (
        <div className="tuneup-create-form-container">
            <form className="tuneup-create-form">
                TuneUp create form
            </form>
            <img className='background-img' src={background}></img>
        </div>
    )
}

export default CreateTuneUps