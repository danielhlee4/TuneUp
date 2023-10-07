import React, { useState } from "react";
import { search, clearSearchResults } from "../../store/search";
import { useDispatch } from "react-redux";
import "./SearchBar.css"
import searchbackground from "./search-background.png";


export default function SearchBar({onSearch}) {
  const [query, setQuery] = useState("");
  const dispatch = useDispatch();

  const handleSearch = (event) => {
    event.preventDefault();
    if (query.trim() !== "") {
      dispatch(clearSearchResults());
      dispatch(search({ q: query }))
      onSearch(query);
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
      <div className="search-container">
        <input
          type="text"
          id="search-input"
          placeholder=""
          value={query}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button id="search-button" onClick={handleSearch}>
          <i class="fa-solid fa-magnifying-glass"></i>
        </button>
      </div>
      <div></div>
      <img className="search-background" src={searchbackground}></img>
    </div>
  );
}
