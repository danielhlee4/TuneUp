import { useSelector } from "react-redux";
import { useParams } from "react-router-dom/cjs/react-router-dom.min";

function UserProfilePage() {
    const currentUser = useSelector((state) => state.session.user);
    const { id } = useParams()
    const user = useSelector((state) =>  state.users[id]) 
    console.log(user)
    return (
        <div>
            User's Profile
        </div>
    )
}

export default UserProfilePage