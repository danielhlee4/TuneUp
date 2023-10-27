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
  if (parts.length > 0) {
    return parts[parts.length - 1]; // This should be the state and zipcode part e.g. 'NY 10314'
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
  const zipcodesObject = useMemo(() => {
    return displayedTuneUps.reduce((acc, tuneUp) => {
      const zipcode = extractStateAndZipcode(tuneUp.address);
      if (zipcode) {
        acc[tuneUp._id] = zipcode;
      }
      return acc;
    }, {});
  }, [displayedTuneUps]);

  return (
    <div>
      <div className="discover-container">
        {tuneUps && users ? (
          <div className="tuneups-container">
            <div className="search-components">
              <SearchBar onSearch={handleTuneUpSearch} />
              <div className="sort" onChange={(e) => setSortBy(e.target.value)}>
                <select>
                  <option value="default">------- sort by -------</option>
                  <option value="dateNewOld">date (ascending)</option>
                  <option value="dateOldNew">date (descending)</option>
                </select>
              </div>
            </div>
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
          <MultipleZipcodeMapWrapper zipcodes={zipcodesObject} />
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
