import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getUser } from "../../store/users";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchUsers } from "../../store/users";
import backgroundimg from '../../components/SessionForms/background.png'
import './UserProfilePage.css'

function UserProfilePage() {
    const currentUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch()
    const { id } = useParams()
    const user = useSelector(state => state.users[id])

    useEffect(() => {
        dispatch(fetchUsers())
    },[dispatch])
    return (
        <div className="user-profile-page-container">
            <div className="user-info-container">
                <div className="user-pfp-container">
                    <img className="user-pfp-img" src={user.profileImageUrl}></img>
                </div>
                <div className="user-details-container">
                        <div className="user-first-name">{user.firstName}</div>
                </div>
            </div>
            <img className="user-profile-page-background" src={backgroundimg}></img>
        </div>
    )
}

export default UserProfilePage