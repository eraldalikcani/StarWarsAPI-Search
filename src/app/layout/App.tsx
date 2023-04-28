import React, { useEffect, useState } from "react";
import agent from "../api/agent";
import { Person } from "../models/person";

function App() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<Person[]>([]);
  const [getPersonId, setGetPersonId] = useState(1);
  const [getResults, setGetResults] = useState<Person | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearchbyName = async () => {
    try {
      const data = await agent.searchPersons(searchQuery);
      console.log(data);
      setSearchResults(data);
      setGetResults(null);
      setError(null);
    } catch (error: any) {
      console.error(error);
      setSearchResults([]);
    }
  };

  const handleGetSubmit = async () => {
    try {
      const response = await agent.getPerson(getPersonId);
      console.log(response);
      setGetResults(response);
      setSearchResults([]);
      setError(null);
    } catch (error: any) {
      setError(error.message);
      setGetResults(null);
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
        {searchResults.length > 0 ? (
          <div>
            <h2>Search Results</h2>
            <ul>
              {searchResults.map((person) => (
                <li key={person.id}>
                  <div>
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
            <h2>Get Results</h2>
            {error ? (
              <div>{error}</div>
            ) : (
              <ul>
                {getResults && (
                  <li key={getResults.id}>
                    <div>
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
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
