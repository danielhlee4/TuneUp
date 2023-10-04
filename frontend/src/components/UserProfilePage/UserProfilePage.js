import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getUser } from "../../store/users";

function UserProfilePage() {
    const currentUser = useSelector((state) => state.session.user);
    const { id } = useParams()
    const user = useSelector(getUser(id)) 
    console.log(user)
    return (
        <div>
            User's Profile
        </div>
    )
}

export default UserProfilePage