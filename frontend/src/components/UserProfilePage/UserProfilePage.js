import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers, fetchUser } from "../../store/users";
import { getTuneUps } from "../../store/tuneUps";
import backgroundimg from '../../components/SessionForms/background.png'
import './UserProfilePage.css'
import TuneUp from "../TuneUp/TuneUp";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

function UserProfilePage() {
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector(state => state.users[id])
    const userTuneups = useSelector(getTuneUps)
    let joinedTuneup = []
    let hostedTuneup = []


    userTuneups.map(tuneup => {
        if (user._id === tuneup.host){
            hostedTuneup.push(tuneup)
        } else if (tuneup.connections.includes(user._id)) {
            joinedTuneup.push(tuneup)
        }
    })

    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(fetchUser(id))
    },[dispatch, id])

    if (currentUser?._id === user?._id) {
        return (
            <div className="user-profile-page-container">
                <div className="user-info-container">
                    <div className="user-pfp-container">
                        <img className="user-pfp-img" src={user?.profileImageUrl}></img>
                    </div>
                    <div className="user-details-container">
                        <div className="user-first-name-container">
                            <div className="user-first-name">{user?.firstName} {user?.lastName}</div>
                        </div>
                        <div className="user-email-container">
                            <div className="user-email">{user?.email}</div>
                        </div>
                        <div className= "user-instruments-container"> 
                              <h3 className="instruments-title">Instruments:</h3>
                              <div className="user-instruments">{user?.instruments?.join(', ')}</div>
                        </div>
                        <div className="user-genres-container">
                              <h3 className="genres-title">Favorite Genres:</h3>
                              <div className="user-genres">{user?.genres?.join(', ')}</div>
                        </div>
                        <div className="user-address-container">
                            <div className="user-address">{user?.address}</div>
                        </div>
                        <div className="user-edit-option">
                            <Link to={'/update'}>
                                <button className="edit-button">Edit</button>
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="tuneup-hosted-label">
                    Your Joined TuneUps
                </div>
                <div className="tuneup-joined-label">
                    Your Hosted TuneUps
                </div>
                <div className="user-tuneups-container" id="user-tuneups-container">
                    <div className="joined-tuneups-list-container">
                        <ul className="joined-tuneup-list">
                        {joinedTuneup.map(tuneup => {
                            return (<li key={tuneup._id} className="list-item"><TuneUp tuneUpData={tuneup}/></li>)
                        })}
                        </ul>
                    </div>
                    <div className="hosted-tuneups-list-container">
                        <ul className="hosted-tuneup-list">
                        {hostedTuneup.map(tuneup => {
                            return(<li key={tuneup._id} className="list-item"><TuneUp tuneUpData={tuneup}/></li>)
                        })}
                        </ul>
                    </div>
                </div>
                <img className="user-profile-page-background" src={backgroundimg}></img>
            </div>
        )
    } else {
        return (
            <div className="user-profile-page-container">
                <div className="user-info-container">
                    <div className="user-pfp-container">
                        <img className="user-pfp-img" src={user?.profileImageUrl}></img>
                    </div>
                    <div className="user-details-container">
                        <div className="user-first-name-container">
                            <div className="user-first-name">{user?.firstName} {user?.lastName}</div>
                        </div>
                    </div>
                </div>
                <div className="other-tuneup-hosted-label">
                    {user?.firstName}'s Joined TuneUps
                </div>
                <div className="other-tuneup-joined-label">
                    {user?.firstName}'s Hosted TuneUps
                </div>
                <div className="user-tuneups-container" id="user-tuneups-container">
                    <div className="joined-tuneups-list-container">
                        <ul className="joined-tuneup-list">
                            {joinedTuneup.map(tuneup => {
                                return (<li key={tuneup._id} className="list-item"><TuneUp tuneUpData={tuneup} /></li>)
                            })}
                        </ul>
                    </div>
                    <div className="hosted-tuneups-list-container">
                        <ul className="hosted-tuneup-list">
                            {hostedTuneup.map(tuneup => {
                                return (<li key={tuneup._id} className="list-item"><TuneUp tuneUpData={tuneup} /></li>)
                            })}
                        </ul>
                    </div>
                </div>
                <img className="user-profile-page-background" src={backgroundimg}></img>
            </div>
        )
    }
}

export default UserProfilePage