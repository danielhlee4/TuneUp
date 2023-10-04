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

    console.log(hostedTuneups)

    useEffect(() => {
        dispatch(fetchUsers())
        dispatch(fetchUser(id))
    },[dispatch])
    return (
        <div className="user-profile-page-container">
            <div className="user-info-container">
                <div className="user-pfp-container">
                    <img className="user-pfp-img" src={user?.profileImageUrl}></img>
                </div>
                <div className="user-details-container">
                        <div className="user-first-name">{user?.firstName}</div>
                </div>
            </div>
            <img className="user-profile-page-background" src={backgroundimg}></img>
        </div>
    )
}

export default UserProfilePage