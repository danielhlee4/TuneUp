import { useSelector, useDispatch } from "react-redux";
import { fetchAllTuneUps, getTuneUps } from "../../store/tuneUps";
import { useEffect, useState, useCallback, useMemo } from "react";
import "./Discover.css";
import TuneUp from "../TuneUp/TuneUp";
import { fetchUsers, getUsers } from "../../store/users";
import MultipleZipcodeMapWrapper from "../Map/MultipleZipcodeMap";
import SearchBar from "../SearchBar/SearchBar";

export function extractStateAndZipcode(address) {
  const parts = address.split(", ");
  if (parts[2]) {
    return parts[2]; // This should be the state and zipcode part e.g. 'NY 10314'
  }
  return null;
}

function Discover() {
  const currentUser = useSelector((state) => state.session.user);
  const tuneUps = useSelector(getTuneUps);
  const users = useSelector(getUsers);
  const dispatch = useDispatch();
  const [filteredTuneUps, setFilteredTuneUps] = useState([]);
  const [sortBy, setSortBy] = useState("default");

  function dateNewOld(a, b) {
    return new Date(a.date) - new Date(b.date);
  }

  function dateOldNew(a, b) {
    return new Date(b.date) - new Date(a.date);
  }

  const handleTuneUpSearch = useCallback(
    (query) => {
      if (query.trim()) {
        const lowercasedQuery = query.toLowerCase();
        const results = tuneUps.filter(
          (tuneUp) =>
            tuneUp.genre.toLowerCase().includes(lowercasedQuery) ||
            tuneUp.instruments.some((instrument) =>
              instrument.toLowerCase().includes(lowercasedQuery)
            )
        );
        setFilteredTuneUps(results);
      } else {
        setFilteredTuneUps(tuneUps);
      }
    },
    [tuneUps]
  );

  useEffect(() => {
    dispatch(fetchAllTuneUps());
    dispatch(fetchUsers());
  }, [dispatch]);

  const displayedTuneUps = filteredTuneUps.length ? filteredTuneUps : tuneUps;
  const zipcodesArray = useMemo(() => {
    return displayedTuneUps
      .map((tuneUp) => extractStateAndZipcode(tuneUp.address))
      .filter(Boolean);
  }, [displayedTuneUps]);

  return (
    <div>
      <div className="discover-container">
        <div className="sort" onChange={(e) => setSortBy(e.target.value)}>
          <select>
            <option value="default">------- sort by -------</option>
            {/* <option value="home">distance (from home)</option>
            <option value="currentLocation">
              distance (from current location)
            </option> */}
            <option value="dateNewOld">date (newest to oldest)</option>
            <option value="dateOldNew">date (oldest to newest)</option>
          </select>
        </div>
        {tuneUps && users ? (
          <div className="tuneups-container">
            <SearchBar onSearch={handleTuneUpSearch} />
            <ul>
              {displayedTuneUps
                ?.sort((a, b) => {
                  if (sortBy === "dateOldNew") {
                    return dateOldNew(a, b);
                  } else {
                    return dateNewOld(a, b);
                  }
                })
                .map((tuneUp) => {
                  return (
                    <li key={tuneUp._id} className="list-items">
                      <TuneUp tuneUpData={tuneUp} />
                    </li>
                  );
                })}
            </ul>
          </div>
        ) : (
          ""
        )}
        <div className="discover-map-container">
          <MultipleZipcodeMapWrapper
            key={zipcodesArray.join(",")}
            zipcodes={zipcodesArray}
          />
          {/* <MultipleZipcodeMapWrapper zipcodes={["NY 10012"]} /> */}
        </div>
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
