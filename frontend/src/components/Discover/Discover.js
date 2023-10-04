import { useSelector, useDispatch } from "react-redux";
import { fetchAllTuneUps, getTuneUps } from "../../store/tuneUps";
import { useEffect } from "react";
import homepagebackground from "./home-page-background.png"
import "./Discover.css"
import TuneUp from "../TuneUp/TuneUp"
import { fetchUsers, getUsers} from "../../store/users";

function Discover() {
  const currentUser = useSelector((state) => state.session.user);
  const tuneUps = useSelector(getTuneUps)
  const users = useSelector(getUsers)
  const dispatch = useDispatch()

  useEffect(()=> {
    dispatch(fetchAllTuneUps())
    dispatch(fetchUsers())
  }, [dispatch])

  return (
    <div className="discover-container">
        {tuneUps && users ? 
        (<div className="tuneups-container">
            <ul>
                {tuneUps.map((tuneUp)=> {
                    <li key={tuneUp._id}> <TuneUp tuneUpData={tuneUp} /> </li>
                })}
            </ul>
        </div>) : ""}
      <footer>
        <div className="scrolling-text-homepage">
          Copyright &copy; 2023 TuneUp | Developed by: Dan L. Klodian B.
          Mudassar M. Dennis L. Sean J.
        </div>
      </footer>
      <img
        className="home-page-background"
        src={homepagebackground}
        alt="Background"
      />
    </div>
  );
}


export default Discover;
