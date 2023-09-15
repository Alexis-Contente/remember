// Component import
/* eslint-disable react-hooks/exhaustive-deps */
import './searchBar.css';

// Tools React import
import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { actionList } from '../../actions/user';

// Function that displays and manages the search bar
function SearchBar() {

  const dispatch = useDispatch();

  const [searchQuery, setSearchQuery] = useState("");
  const [isOpen, setIsOpen] = useState(false);


  const results = useSelector((state) => state.user.list)

  const API_KEY = "edac6d7937b5e067060e9bc6e405b4e1";
  const BASE_URL = "https://api.themoviedb.org/3";
  const SEARCH_URL = `${BASE_URL}/search/multi`;
  const navigate = useNavigate();

  const getTvShowAndMovie = async () => {
    axios.get(SEARCH_URL, {
      params: {
        api_key: API_KEY,
        query: searchQuery,
      },
    })
    .then((response) => {
      console.log(results);
      dispatch(actionList(response.data.results));
  })
  };
  // handle change on searchbar value
  const handleSearchChange = async (event) => {
    setSearchQuery(event.target.value);
  };
  // handle click on searchbar
  const handleOpenSearch = async () => {
    setIsOpen(!isOpen)
  };

  // handle Submit to clear the list of element
  const handleSubmit = async (e) => {
    e.preventDefault();
    navigate(`/search?q=${document.getElementById("desktop").value}&language=fr`)
    if(searchQuery.length > 0){
      dispatch(actionList([]));
    }
    
  };

  useEffect(() => {
    getTvShowAndMovie();
  },[searchQuery]);

  return (
      <>
        {/* searchbar pour mobile */}
        <button className="searchbutton button" onClick={handleOpenSearch}>
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-5 w-5" 
            viewBox="0 0 20 20" 
            fill="currentColor">
              <path 
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd" />
          </svg>
        </button>

        <div className={`absolute sm:hidden top-14 w-5/6 pl-2 ${isOpen ? "block" : "hidden"}`}>
          <div className="bg-gray-200 p-2 rounded-md">
            <form  className="search" onSubmit={(e) => {e.preventDefault(); navigate(`/search?q=${document.getElementById("mobile").value}&language=fr`)}}>
              <input id="mobile"
                className="search"
                type="text" 
                placeholder="Tapez votre recherche ici..." 
                value={searchQuery} 
                onChange={handleSearchChange} />
            </form>
          </div>
        </div>

        {/* searchbar pour ecran plus grand que mobile  */}
          <form className="hidden relative pl-24 hidden sm:pl-0 sm:block flex flex-auto sm:block" onSubmit={(e) =>  {handleSubmit(e)}}>
            <input id="desktop"
              className="input-search text-gradient  p-2 w-44" 
              type="text" 
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Rechercher..." />
              <ul className="list absolute left-1/2 transform -translate-x-1/2 hidden sm:block w-auto shadow-xl z-50">
                          {results.map((result) => (result.name === undefined ? 
                            
                            (<Link to={`/search?q=${result.title}&language=fr`}>
                              <li className="list result" key={result.id}>
                                {result.title}
                              </li>
                            </Link>)

                            :

                            (<Link to={`/search?q=${result.name}&language=fr`}>
                              <li className="list result" key={result.id}>
                                {result.name}
                              </li>
                            </Link>) 
                            ))}

                        </ul>
            
          </form>
      </>
    );
  }

export default SearchBar;