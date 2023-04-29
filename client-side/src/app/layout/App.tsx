import React, { useEffect, useState } from "react";
import agent from "../api/agent";
import { Person } from "../models/person";
import './App.css';

function App() {
  // Initialize state variables
  const [searchQuery, setSearchQuery] = useState(""); // stores the search query input by the user
  const [searchResults, setSearchResults] = useState<Person[]>([]);// stores the search results returned by the API
  const [getPersonId, setGetPersonId] = useState(1);// stores the person ID input by the user for get request
  const [getResults, setGetResults] = useState<Person | null>(null);// stores the person object returned by the get request
  const [error, setError] = useState<string | null>(null);// stores the error message returned by the API

// Function to handle search by name
  const handleSearchbyName = async () => {
    setSearchResults([]);
    setGetResults(null);
    try {
      const data = await agent.searchPersons(searchQuery);// call searchPersons API method with search query
      console.log(data);
      setSearchResults(data);// update state with search results
      setError(null);// reset error state
    } catch (error: any) {
      console.error(error);
    }
  };

// Function to handle get person by ID
  const handleGetSubmit = async () => {
    setGetResults(null);
    setSearchResults([]);
    try {
      const response = await agent.getPerson(getPersonId);// call getPerson API method with person ID
      console.log(response);
      setGetResults(response);// update state with person object
      setError(null);// reset error state
    } catch (error: any) {
      setError(error.message);// update error state with error message
    }
  };

  return (
    <>
      <h1>Star Wars Characters</h1>
      <label>
        Search by Name:
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button onClick={handleSearchbyName}>Search</button>
      </label>
      <label>
        Get by ID:
        <input
          type="number"
          value={getPersonId}
          onChange={(e) => setGetPersonId(Number(e.target.value))}
        />
        <button onClick={handleGetSubmit}>Get</button>
      </label>
      <div>
        <h2>Results</h2>
        {searchResults.length > 0 ? (
          <div>
            <ul>
              {searchResults.map((person) => (
                <li key={person.id}>
                  <div>
                    <h3>Person</h3>
                    <p>Id: {person.id}</p>
                    <p>Name: {person.name}</p>
                    <p>Birth Year: {person.birth_year}</p>
                    <p>Gender: {person.gender}</p>
                    <p>Height: {person.height} cm</p>
                    <p>Weight: {person.weight} kg</p>
                    <h3>Movies</h3>
                    <ul>
                      {person.films.map((film, index) => (
                        <li key={index}>
                          <p>Title: {film.title} </p>
                          <p>Episode: {film.episode_id}</p>
                          <p>Director: {film.director}</p>
                          <p>Release Date: {film.release_date}</p>
                        </li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div>
            {error ? (
              <>
              <div>{error}</div>
              </>
            ) : (
              <>
              <ul>
                {getResults && (
                  <li key={getResults.id}>
                    <div>
                      <h3>Person</h3>
                      <p>Id: {getResults.id}</p>
                      <p>Name: {getResults.name}</p>
                      <p>Birth Year: {getResults.birth_year}</p>
                      <p>Gender: {getResults.gender}</p>
                      <p>Height: {getResults.height} cm</p>
                      <p>Weight: {getResults.weight} kg</p>
                      <h3>Movies</h3>
                      <ul>
                        {getResults.films.map((film, index) => (
                          <li key={index}>
                            <p>Title: {film.title} </p>
                            <p>Episode: {film.episode_id}</p>
                            <p>Director: {film.director}</p>
                            <p>Release Date: {film.release_date}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </li>
                )}
              </ul>
              </>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
