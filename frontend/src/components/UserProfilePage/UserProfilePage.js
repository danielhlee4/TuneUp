import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getUser } from "../../store/users";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers, fetchUser } from "../../store/users";
import { getTuneUps } from "../../store/tuneUps";
import backgroundimg from '../../components/SessionForms/background.png'
import './UserProfilePage.css'

function UserProfilePage() {
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector(state => state.users[id])
    const userTuneups = useSelector(getTuneUps)
    const joinedTuneups = []
    const hostedTuneups = []

    userTuneups.map(tuneup => {
        if (user._id === tuneup.host){
            hostedTuneups.push(tuneup)
        } else {
            joinedTuneups.push(tuneup)
        }
    })

    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(fetchUser(id))
    },[dispatch])

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
                        <div className="user-address-container">
                            <div className="user-address">{user?.address}</div>
                        </div>
                    </div>
                </div>
                <div className="tuneup-label">
                    Your TuneUps
                </div>
                <div className="tuneups-container">
                    <div className="joined-tuneups-list-container">
                        Joined TuneUps Placeholder
                    </div>
                    <div className="hosted-tuneups-list-container">
                        Hosted TuneUps Placeholder
                    </div>
                </div>
                <img className="user-profile-page-background" src={backgroundimg}></img>
            </div>
        )
    }
}

export default UserProfilePage