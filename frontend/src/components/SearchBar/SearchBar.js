import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { search, clearSearchResults } from "../../store/search";
import { useDispatch, useSelector } from "react-redux";
import TuneUp from "../TuneUp/TuneUp";
import "./SearchBar.css"

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const searchResults = useSelector((state) => state.search.results);

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim() !== "") {
      dispatch(clearSearchResults());
      dispatch(search({ q: query }))
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setQuery(query);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && query) {
      handleSearch(e);
      setQuery("");
    }
  };

  return (
    <div className="searchbar-container">
      <input
        type="text"
        id="search-input"
        placeholder=""
        value={query}
        onChange={handleInputChange}
        onKeyPress={handleKeyPress}
      />
      <button id="search-button" onClick={handleSearch}>

      </button>
    <div>
      <ul>
        {searchResults?.map(result => {
          return (
            <li>
              <TuneUp tuneUpData={result} />
            </li>
          )
        })}
      </ul>
    </div>
    </div>
  );
}
