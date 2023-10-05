import { useSelector, useDispatch } from "react-redux";
import { fetchAllTuneUps, getTuneUps } from "../../store/tuneUps";
import { useEffect } from "react";
import homepagebackground from "../HomePage/home-page-background.png"
import "./Discover.css"
import TuneUp from "../TuneUp/TuneUp"
import { fetchUsers, getUsers} from "../../store/users";
import MultipleZipcodeMapWrapper from "../Map/MultipleZipcodeMap";

function extractStateAndZipcode(address) {
  const parts = address.split(', ');
  if (parts[2]) {
    return parts[2];  // This should be the state and zipcode part e.g. 'NY 10314'
  }
  return null;
}

function Discover() {
  const currentUser = useSelector((state) => state.session.user);
  const tuneUps = useSelector(getTuneUps);
  const users = useSelector(getUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllTuneUps());
    dispatch(fetchUsers());
  }, [dispatch]);

  const zipcodesArray = tuneUps.map(tuneUp => extractStateAndZipcode(tuneUp.address)).filter(Boolean);

  return (
    <div className="discover-container">
      {tuneUps && users ? 
        (<div className="tuneups-container">
          <ul>
            {tuneUps?.map((tuneUp) => {
              return (
                <li key={tuneUp._id}> <TuneUp tuneUpData={tuneUp} /> </li>
              );
            })}
          </ul>
        </div>) : ""}
        <div className="discover-map-container">

      <MultipleZipcodeMapWrapper zipcodes={zipcodesArray} />  
      {/* <MultipleZipcodeMapWrapper zipcodes={['NY 10012']} />   */}
        </div>
      <footer>
        <div className="scrolling-text-homepage">
          Copyright &copy; 2023 TuneUp | Developed by: Dan L. Klodian B.
          Mudassar M. Dennis L. Sean J.
        </div>
      </footer>
    </div>
  );
}

export default Discover;
