import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { search, clearSearchResults } from "../../store/search";
import { useDispatch, useSelector } from "react-redux";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.search.results);

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim() !== "") {
      dispatch(clearSearchResults());
      dispatch(search({ firstName: query })).then((data) => {
        if (data && data.length > 0) {
          history.push(`/users/${data[0].id}`); 
        } else {
          alert("No user found");
        }
      });
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
    </div>
  );
}
